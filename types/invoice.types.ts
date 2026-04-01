export interface Invoice {
  // Meta
  id: string; // UUID
  invoiceNumber: string; // e.g. INV-0042
  title: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  template: string;
  colorTheme: string;
  currency: string;
  locale: string; // for number formatting

  // Dates
  issueDate: Date;
  dueDate: Date;
  deliveryDate?: Date;

  // From (Business/Sender)
  from: {
    logo?: string; // base64 or URL
    businessName: string;
    contactName?: string;
    email: string;
    phone?: string;
    address: Address;
    taxId?: string; // VAT/GST/EIN
    website?: string;
    bankDetails?: BankDetails;
  };

  // To (Client/Recipient)
  to: {
    businessName: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address: Address;
    taxId?: string;
    poNumber?: string; // Purchase Order number
  };

  // Line Items
  lineItems: LineItem[];

  // Calculations
  subtotal: number; // computed
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountAmount: number; // computed
  taxLines: TaxLine[]; // support multiple tax lines (GST, VAT, etc.)
  shippingFee: number;
  total: number; // computed

  // Payment
  paymentTerms: PaymentTerm; // Net 30, Due on receipt, etc.
  paymentMethods: string[]; // Bank transfer, PayPal, Crypto, etc.
  paymentInstructions?: string;
  partialPayments?: PartialPayment[];
  amountPaid: number;
  amountDue: number; // computed

  // Additional
  notes?: string; // visible on invoice
  terms?: string; // terms & conditions
  signature?: string; // base64 SVG/PNG
  attachments?: Attachment[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  paidAt?: Date;
}

export interface LineItem {
  id: string;
  description: string;
  details?: string; // sub-description
  quantity: number;
  unit?: string; // hours, pcs, kg, days, etc.
  unitPrice: number;
  taxRate?: number; // per-line tax override
  discountPercent?: number; // per-line discount
  amount: number; // computed
}

export interface TaxLine {
  id: string;
  name: string; // e.g. "GST", "VAT", "Service Tax"
  rate: number;
  amount: number; // computed
  compound: boolean; // applied on top of other taxes
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

export interface BankDetails {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swift?: string;
  iban?: string;
  upi?: string; // Indian UPI
}

export interface PartialPayment {
  id: string;
  amount: number;
  date: Date;
  note?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
}

export type PaymentTerm =
  | "due_on_receipt"
  | "net_7"
  | "net_15"
  | "net_30"
  | "net_45"
  | "net_60"
  | "net_90"
  | "custom";
