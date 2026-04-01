"use client";

import { useState, useEffect } from "react";
import { useInvoiceStore } from "@/store/invoice.store";
import { templates, TemplateKey } from "@/features/templates/renderers";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Lazy load PDFViewer to avoid SSR issues with @react-pdf/renderer
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted/20 rounded-lg border border-dashed">
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
  const debouncedInvoice = useDebounce(invoice, 800);
  const SelectedTemplate = templates[(debouncedInvoice.template as TemplateKey) || "modern"] || templates.modern;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 md:p-4">
      <div className="w-full h-full max-w-[800px] shadow-2xl rounded-xl overflow-hidden bg-white border border-border">
        <PDFViewer width="100%" height="100%" className="border-none w-full h-full" style={{ minHeight: '500px' }}>
          <SelectedTemplate invoice={debouncedInvoice} />
        </PDFViewer>
      </div>
    </div>
  );
}
