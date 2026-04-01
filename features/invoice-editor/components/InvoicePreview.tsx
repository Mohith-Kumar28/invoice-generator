"use client";

import { useState, useEffect } from "react";
import { useInvoiceStore } from "@/store/invoice.store";
import { templates, TemplateKey } from "@/features/templates/renderers";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import QRCode from "qrcode";

// Use usePDF hook instead of PDFViewer to avoid flickering and guarantee updates
const PdfRenderer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => {
    const { usePDF } = mod;
    return function PdfWrapper({ document: doc }: { document: any }) {
      const [instance, update] = usePDF({ document: doc });
      
      useEffect(() => {
        update(doc);
      }, [doc, update]);

      if (instance.loading) {
        return (
          <div className="flex h-full w-full items-center justify-center bg-muted/5">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        );
      }

      if (instance.error) {
        return <div className="p-4 text-destructive">Error rendering PDF</div>;
      }

      return (
        <iframe
          key={instance.url || "pdf"}
          src={`${instance.url}#toolbar=0&navpanes=0`}
          className="border-none w-full h-full" 
          style={{ minHeight: '500px' }}
        />
      );
    };
  }),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted/5">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    ),
  }
);

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export function InvoicePreview() {
  const { invoice } = useInvoiceStore();
  const debouncedInvoice = useDebounce(invoice, 2000);
  const [upiQr, setUpiQr] = useState<string | undefined>(undefined);

  useEffect(() => {
    const upi = debouncedInvoice.bankDetails?.upi;
    const currency = debouncedInvoice.currency;
    const mode = debouncedInvoice.paymentMode;
    const amountCandidate =
      typeof debouncedInvoice.amountDue === "number" && debouncedInvoice.amountDue > 0
        ? debouncedInvoice.amountDue
        : typeof debouncedInvoice.total === "number" && debouncedInvoice.total > 0
          ? debouncedInvoice.total
          : 0;
    const amount = Number.isFinite(amountCandidate) ? amountCandidate : 0;

    if (mode !== "upi" || !upi || currency !== "INR" || !amount) {
      setUpiQr(undefined);
      return;
    }

    const pa = encodeURIComponent(upi.trim());
    const pn = encodeURIComponent((debouncedInvoice.from?.businessName || "Invoice").trim());
    const am = encodeURIComponent(amount.toFixed(2));
    const tn = encodeURIComponent((debouncedInvoice.invoiceNumber || "Invoice").trim());
    const uri = `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
    QRCode.toDataURL(uri, { margin: 0, width: 220 })
      .then((dataUrl: string) => setUpiQr(dataUrl))
      .catch(() => setUpiQr(undefined));
  }, [
    debouncedInvoice.paymentMode,
    debouncedInvoice.bankDetails?.upi,
    debouncedInvoice.currency,
    debouncedInvoice.amountDue,
    debouncedInvoice.total,
    debouncedInvoice.invoiceNumber,
    debouncedInvoice.from?.businessName,
  ]);

  const SelectedTemplate = templates[(debouncedInvoice.template as TemplateKey) || "modern"] || templates.modern;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 md:p-4">
      <div className="w-full h-full max-w-[800px] shadow-2xl rounded-xl overflow-hidden bg-white border border-border">
        <PdfRenderer document={<SelectedTemplate invoice={{ ...debouncedInvoice, upiQr }} />} />
      </div>
    </div>
  );
}
