import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Globe,
  Lock,
  Palette,
  QrCode,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME, SITE_URL } from "@/lib/site";

const CANONICAL_URL = `${SITE_URL}/invoice-generator`;

const TEMPLATES = [
  "modern",
  "classic",
  "minimal",
  "bold",
  "creative",
  "corporate",
  "freelancer",
] as const;

const FAQ = [
  {
    q: "Is this invoice generator free?",
    a: "Yes. It’s free to use and runs in your browser.",
  },
  {
    q: "Do you store my invoices or client data?",
    a: "No. The tool is local-first, so your data stays on your device in your browser storage.",
  },
  {
    q: "Can I export a PDF invoice?",
    a: "Yes. You can generate and download a polished PDF invoice from the tool.",
  },
  {
    q: "Can I add taxes, discounts, and payment details?",
    a: "Yes. You can add line items, discounts, taxes, and payment details like UPI QR, bank details, or a payment URL.",
  },
  {
    q: "Can I share an invoice draft?",
    a: "Yes. You can share a link that opens the same invoice draft on another device (without uploading your invoice data to a backend).",
  },
] as const;

export const metadata: Metadata = {
  title: `Free Invoice Generator (PDF) | ${APP_NAME}`,
  description:
    "Create professional invoices in minutes. Add line items, discounts, taxes, and payment details, then export a clean PDF — local-first in your browser.",
  keywords: [
    "invoice generator",
    "free invoice generator",
    "pdf invoice generator",
    "invoice template",
    "create invoice",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: `Free Invoice Generator (PDF) | ${APP_NAME}`,
    description:
      "Create professional invoices in minutes. Add line items, discounts, taxes, and payment details, then export a clean PDF — local-first in your browser.",
  },
  twitter: {
    card: "summary",
    title: `Free Invoice Generator (PDF) | ${APP_NAME}`,
    description:
      "Create professional invoices in minutes. Add line items, discounts, taxes, and payment details, then export a clean PDF — local-first in your browser.",
  },
};

export const dynamic = "force-dynamic";

export default function InvoiceGeneratorLandingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Invoice Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
    url: CANONICAL_URL,
  };

  return (
    <main className="w-full">
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <script type="application/ld+json">
        {JSON.stringify(softwareJsonLd)}
      </script>

      <header className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_-10%,hsl(var(--primary))/0.18,transparent_55%),radial-gradient(900px_circle_at_80%_0%,hsl(var(--primary))/0.10,transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Free invoice generator • Local-first • No signup
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Invoice Generator
                <span className="text-muted-foreground"> — PDF Invoice</span>
              </h1>

              <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Create a professional invoice in minutes. Add line items,
                discounts, taxes, and payment details, then export a clean PDF
                invoice your client can pay from.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/invoice-generator/tool" />}
                  size="lg"
                  className="h-11 px-6"
                >
                  Generate invoice
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="#invoice-features" />}
                  variant="secondary"
                  size="lg"
                  className="h-11 px-6"
                >
                  Invoice features
                </Button>
              </div>

              <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Multiple invoice templates
                </li>
                <li className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  Branding + layout controls
                </li>
                <li className="flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-primary" />
                  Payments (UPI QR, bank, link)
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Runs in your browser (client-side)
                </li>
              </ul>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-xl border bg-background/70 backdrop-blur">
                <div className="p-6">
                  <h2 className="text-sm font-medium">
                    Invoice generator specs
                  </h2>
                  <dl className="mt-4 grid gap-4 text-sm">
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Input
                      </dt>
                      <dd className="col-span-3">
                        Business + client details, line items, taxes, discounts,
                        notes/terms, signature
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Output
                      </dt>
                      <dd className="col-span-3">
                        PDF invoice download + preview
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Templates
                      </dt>
                      <dd className="col-span-3">{TEMPLATES.join(" · ")}</dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Payments
                      </dt>
                      <dd className="col-span-3">
                        UPI QR (INR), bank details, payment URL
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Share
                      </dt>
                      <dd className="col-span-3">
                        Shareable link to open the same invoice draft
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Privacy
                      </dt>
                      <dd className="col-span-3">
                        Local-first autosave in browser storage
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section id="invoice-features" className="w-full">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-tight">
                Invoice features that cover the full workflow
              </h2>
              <p className="mt-3 text-muted-foreground">
                This invoice generator is built to create invoices fast, keep
                them consistent, and export a PDF invoice that looks
                professional.
              </p>
              <div className="mt-6 border-t pt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Fully client-side invoice generator. Everything runs in your
                  browser, and the project is designed to be open-source.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-8 md:grid-cols-2">
                <article className="space-y-3">
                  <h3 className="text-lg font-semibold">Invoice essentials</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Client + business details</li>
                    <li>Line items, quantity, rate</li>
                    <li>Discounts, taxes, shipping</li>
                    <li>Notes, terms, and footer</li>
                    <li>Signature: draw, type, or upload</li>
                  </ul>
                </article>

                <article className="space-y-3">
                  <h3 className="text-lg font-semibold">Payments + export</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>UPI QR (INR), bank details, or payment URL</li>
                    <li>Instant PDF invoice export</li>
                    <li>
                      Local-first autosave + saved invoices list (last 50)
                    </li>
                    <li>Share a link to open the same invoice draft</li>
                  </ul>
                </article>
              </div>

              <div className="mt-10 rounded-xl border bg-muted/10 p-6">
                <h3 className="text-lg font-semibold">
                  Supported invoice templates
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pick a layout that matches your brand. This invoice generator
                  supports these invoice template styles:
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {TEMPLATES.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/invoice-generator/tool" />}
                  className="h-11 px-6"
                >
                  Create a PDF invoice
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="#faq" />}
                  variant="outline"
                  className="h-11 px-6"
                >
                  Invoice generator FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t bg-muted/10">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
              <p className="text-muted-foreground">
                Quick answers about invoices, privacy, and PDF export.
              </p>
            </div>

            <div className="divide-y rounded-lg border bg-background">
              {FAQ.map((f) => (
                <details key={f.q} className="p-5">
                  <summary className="cursor-pointer font-medium">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="pt-2">
              <Button
                nativeButton={false}
                render={<Link href="/invoice-generator/tool" />}
                size="lg"
                className="h-11 px-6 w-full sm:w-auto"
              >
                Generate invoice
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
