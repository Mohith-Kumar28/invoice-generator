import type { Metadata } from "next";
import { Suspense } from "react";
import { APP_NAME } from "@/lib/site";
import { InvoiceGeneratorClient } from "../InvoiceGeneratorClient";

export const metadata: Metadata = {
  title: `Invoice Generator Tool | ${APP_NAME}`,
  description:
    "Create a professional invoice in minutes, export to PDF, and keep your data local-first in your browser.",
  robots: { index: false, follow: false },
};

export default function InvoiceGeneratorToolPage() {
  return (
    <>
      <h1 className="sr-only">Invoice Generator</h1>
      <Suspense
        fallback={<div className="fixed inset-0 top-14 bg-background" />}
      >
        <InvoiceGeneratorClient />
      </Suspense>
    </>
  );
}
