"use client";

import { Button } from "@/components/ui/button";
import { useInvoiceStore } from "@/store/invoice.store";
import { useSavedInvoicesStore } from "@/store/saved-invoices.store";
import { FileDown, FilePlus, Save, Archive } from "lucide-react";
import { Invoice } from "@/types/invoice.types";
import { pdf } from '@react-pdf/renderer';
import { templates, TemplateKey } from "@/features/templates/renderers";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InvoiceList } from "@/features/saved-invoices/components/InvoiceList";

export function GlobalActions() {
  const { invoice, resetInvoice } = useInvoiceStore();
  const { saveInvoice } = useSavedInvoicesStore();

  const handleSave = () => {
    saveInvoice({
      ...invoice,
      id: invoice.id || crypto.randomUUID(),
      createdAt: invoice.createdAt || new Date(),
      updatedAt: new Date(),
    } as Invoice);
    alert("Invoice saved locally!");
  };

  const handleDownload = async () => {
    const SelectedTemplate = templates[(invoice.template as TemplateKey) || "modern"] || templates.modern;
    const blob = await pdf(<SelectedTemplate invoice={invoice} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.invoiceNumber || 'invoice'}_${invoice.to?.businessName || 'client'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b border-border/40 p-4 flex items-center shadow-sm overflow-x-auto gap-2 no-scrollbar">
      <div className="flex items-center space-x-2 shrink-0">
        <Sheet>
          <SheetTrigger render={
            <Button variant="outline">
              <Archive className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Saved Invoices</span>
            </Button>
          } />
          <SheetContent side="left" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>My Invoices</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <InvoiceList />
            </div>
          </SheetContent>
        </Sheet>
        <Button variant="outline" onClick={resetInvoice}>
          <FilePlus className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">New</span>
        </Button>
        <Button variant="default" onClick={handleSave}>
          <Save className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Save</span>
        </Button>
      </div>

      <div className="flex items-center space-x-2 shrink-0 ml-auto pl-2">
        <Button variant="default" onClick={handleDownload}>
          <FileDown className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Download PDF</span>
        </Button>
      </div>
    </div>
  );
}
