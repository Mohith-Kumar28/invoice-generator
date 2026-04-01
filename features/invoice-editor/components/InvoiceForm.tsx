"use client";

import { useInvoiceStore } from "@/store/invoice.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LineItemsTable } from "./LineItemsTable";
import {
  Section1Details,
  Section2From,
  Section3To,
  Section5Pricing,
  Section6Payment,
  Section7Notes,
  Section8Signature,
  Section9Design,
} from "./FormSections";

export function InvoiceForm() {
  const { invoice } = useInvoiceStore();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Invoice Details</h1>
      </div>

      <Accordion multiple defaultValue={["section-1", "section-2", "section-3", "section-4", "section-5", "section-6", "section-7", "section-8", "section-9"]} className="w-full">
        {/* SECTION 1: Invoice Details */}
        <AccordionItem value="section-1" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            1. Invoice Details
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section1Details />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 2: From */}
        <AccordionItem value="section-2" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            2. From (Your Business)
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section2From />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 3: Bill To */}
        <AccordionItem value="section-3" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            3. Bill To (Client)
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section3To />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 4: Line Items */}
        <AccordionItem value="section-4" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            4. Line Items
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <LineItemsTable />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 5: Pricing & Taxes */}
        <AccordionItem value="section-5" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            5. Pricing & Taxes
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section5Pricing />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 6: Payment Details */}
        <AccordionItem value="section-6" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            6. Payment Details
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section6Payment />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 7: Notes & Terms */}
        <AccordionItem value="section-7" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            7. Notes & Terms
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section7Notes />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 8: Signature */}
        <AccordionItem value="section-8" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            8. Signature
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section8Signature />
          </AccordionContent>
        </AccordionItem>

        {/* SECTION 9: Design & Theme */}
        <AccordionItem value="section-9" className="bg-card rounded-xl border px-4 mb-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">
            9. Design & Branding
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <Section9Design />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}