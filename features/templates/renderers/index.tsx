import { InvoiceTemplate } from "./InvoiceTemplate";

export const templates = {
  modern: ({ invoice }: { invoice: any }) => <InvoiceTemplate invoice={invoice} variant="modern" />,
  classic: ({ invoice }: { invoice: any }) => <InvoiceTemplate invoice={invoice} variant="classic" />,
  minimal: ({ invoice }: { invoice: any }) => <InvoiceTemplate invoice={invoice} variant="minimal" />,
  bold: ({ invoice }: { invoice: any }) => <InvoiceTemplate invoice={invoice} variant="bold" />,
  creative: ({ invoice }: { invoice: any }) => <InvoiceTemplate invoice={invoice} variant="creative" />,
  corporate: ({ invoice }: { invoice: any }) => <InvoiceTemplate invoice={invoice} variant="corporate" />,
  freelancer: ({ invoice }: { invoice: any }) => <InvoiceTemplate invoice={invoice} variant="freelancer" />,
};

export type TemplateKey = keyof typeof templates;
