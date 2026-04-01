"use client";

import { useSavedInvoicesStore } from "@/store/saved-invoices.store";
import { useInvoiceStore } from "@/store/invoice.store";
import { format } from "date-fns";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InvoiceList() {
  const { invoices, deleteInvoice } = useSavedInvoicesStore();
  const { setInvoice } = useInvoiceStore();

  if (invoices.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>No saved invoices yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h3 className="font-semibold text-lg">Saved Invoices</h3>
      <div className="flex flex-col gap-2">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex flex-col gap-2 p-3 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm">{inv.invoiceNumber}</p>
                <p className="text-xs text-muted-foreground">{inv.to?.businessName || "No Client Name"}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{inv.currency} {inv.total?.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{inv.issueDate ? format(new Date(inv.issueDate), 'MMM d, yyyy') : ''}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => setInvoice(inv)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteInvoice(inv.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
