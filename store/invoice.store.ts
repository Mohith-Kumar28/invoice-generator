import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Invoice } from '@/types/invoice.types';
import { calculateInvoiceTotals } from '@/lib/invoice-calculator';

interface InvoiceState {
  invoice: Partial<Invoice>;
  setInvoice: (invoice: Partial<Invoice>) => void;
  updateInvoice: (updates: Partial<Invoice>) => void;
  resetInvoice: () => void;
}

const defaultInvoice: Partial<Invoice> = {
  invoiceNumber: 'INV-0001',
  title: 'INVOICE',
  status: 'draft',
  template: 'modern',
  colorTheme: 'blue',
  currency: 'USD',
  locale: 'en-US',
  issueDate: new Date(),
  dueDate: new Date(new Date().setDate(new Date().getDate() + 14)), // +14 days
  from: {
    businessName: '',
    email: '',
    address: { line1: '', city: '', country: '' },
  },
  to: {
    businessName: '',
    address: { line1: '', city: '', country: '' },
  },
  lineItems: [],
  subtotal: 0,
  discountType: 'percentage',
  discountValue: 0,
  discountAmount: 0,
  taxLines: [],
  shippingFee: 0,
  total: 0,
  paymentTerms: 'net_15',
  paymentMethods: [],
  amountPaid: 0,
  amountDue: 0,
};

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set) => ({
      invoice: defaultInvoice,
      setInvoice: (invoice) => set({ invoice }),
      updateInvoice: (updates) => set((state) => {
        const nextInvoice = { ...state.invoice, ...updates };
        
        // Recalculate totals if any relevant field changed
        const relevantKeys = ['lineItems', 'discountType', 'discountValue', 'taxLines', 'shippingFee', 'partialPayments'];
        const needsRecalculation = relevantKeys.some(key => Object.prototype.hasOwnProperty.call(updates, key));

        if (needsRecalculation) {
          const totals = calculateInvoiceTotals({
            lineItems: nextInvoice.lineItems || [],
            discountType: nextInvoice.discountType || 'percentage',
            discountValue: nextInvoice.discountValue || 0,
            taxLines: nextInvoice.taxLines || [],
            shippingFee: nextInvoice.shippingFee || 0,
            partialPayments: nextInvoice.partialPayments || [],
          });
          return { invoice: { ...nextInvoice, ...totals } };
        }

        return { invoice: nextInvoice };
      }),
      resetInvoice: () => set({ invoice: defaultInvoice }),
    }),
    {
      name: 'invoice-forge-active-invoice',
    }
  )
);
