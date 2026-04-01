import type { LineItem, TaxLine, PartialPayment } from '@/types/invoice.types';

export function calculateLineItemAmount(item: Partial<LineItem>): number {
  const qty = item.quantity || 0;
  const price = item.unitPrice || 0;
  const base = qty * price;
  
  const discountPercent = item.discountPercent || 0;
  const afterDiscount = base - (base * (discountPercent / 100));
  
  const taxRate = item.taxRate || 0;
  const afterTax = afterDiscount + (afterDiscount * (taxRate / 100));
  
  return afterTax;
}

export function calculateInvoiceTotals(params: {
  lineItems: Partial<LineItem>[];
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  taxLines: Partial<TaxLine>[];
  shippingFee: number;
  partialPayments?: Partial<PartialPayment>[];
}) {
  const subtotal = params.lineItems.reduce((sum, item) => sum + calculateLineItemAmount(item), 0);

  let discountAmount = 0;
  if (params.discountType === 'percentage') {
    discountAmount = subtotal * ((params.discountValue || 0) / 100);
  } else {
    discountAmount = params.discountValue || 0;
  }
  
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  // Separate compound and non-compound taxes
  const standardTaxes = params.taxLines.filter(t => !t.compound);
  const compoundTaxes = params.taxLines.filter(t => t.compound);

  let totalTaxAmount = 0;

  // Calculate standard taxes based on subtotalAfterDiscount
  standardTaxes.forEach(tax => {
    const amount = subtotalAfterDiscount * ((tax.rate || 0) / 100);
    totalTaxAmount += amount;
    tax.amount = amount; // In a pure function, mutating is bad, but we assume caller updates state
  });

  // Calculate compound taxes based on (subtotalAfterDiscount + standardTaxes)
  const baseForCompound = subtotalAfterDiscount + totalTaxAmount;
  compoundTaxes.forEach(tax => {
    const amount = baseForCompound * ((tax.rate || 0) / 100);
    totalTaxAmount += amount;
    tax.amount = amount;
  });

  const total = subtotalAfterDiscount + totalTaxAmount + (params.shippingFee || 0);

  const amountPaid = (params.partialPayments || []).reduce((sum, p) => sum + (p.amount || 0), 0);
  const amountDue = Math.max(0, total - amountPaid);

  return {
    subtotal,
    discountAmount,
    totalTaxAmount,
    total,
    amountPaid,
    amountDue,
  };
}
