import {
  ArrowRight,
  BadgeCheck,
  FileSignature,
  Globe,
  Lock,
  Printer,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME, SITE_URL } from "@/lib/site";

const CANONICAL_URL = `${SITE_URL}/payslip-generator`;

const TEMPLATES = ["modern", "classic", "minimal", "bold"] as const;

const FAQ = [
  {
    q: "Is this salary slip / payslip generator free?",
    a: "Yes. It’s free to use and runs in your browser.",
  },
  {
    q: "Is my data private?",
    a: "Yes. The tool is local-first, so your payslip data stays on your device in your browser storage.",
  },
  {
    q: "Can I export a PDF payslip?",
    a: "Yes. You can generate and download a PDF payslip from the tool.",
  },
  {
    q: "Can I customize the layout and details?",
    a: "Yes. You can enter employer/employee details and customize the payslip content before exporting.",
  },
  {
    q: "Is this payslip generator fully client-side?",
    a: "Yes. It runs in your browser, and your payslip data stays local to your device.",
  },
  {
    q: "Can I share a payslip draft?",
    a: "Yes. You can share a link that opens the same payslip draft on another device (without uploading your payslip data to a backend).",
  },
] as const;

export const metadata: Metadata = {
  title: `Payslip Generator (Salary Slip PDF) | ${APP_NAME}`,
  description:
    "Generate a clean salary slip in minutes. Add employer/employee details, earnings and deductions, then export a PDF payslip — local-first in your browser.",
  keywords: [
    "payslip generator",
    "salary slip generator",
    "salary slip pdf",
    "payslip template",
    "generate payslip",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: `Payslip Generator (Salary Slip PDF) | ${APP_NAME}`,
    description:
      "Generate a clean salary slip in minutes. Add employer/employee details, earnings and deductions, then export a PDF payslip — local-first in your browser.",
  },
  twitter: {
    card: "summary",
    title: `Payslip Generator (Salary Slip PDF) | ${APP_NAME}`,
    description:
      "Generate a clean salary slip in minutes. Add employer/employee details, earnings and deductions, then export a PDF payslip — local-first in your browser.",
  },
};

export const dynamic = "force-dynamic";

export default function PayslipGeneratorLandingPage() {
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
    name: "Payslip Generator",
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
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_-10%,hsl(var(--primary))/0.16,transparent_55%),radial-gradient(900px_circle_at_80%_0%,hsl(var(--primary))/0.10,transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Payslip generator • Salary slip PDF • Local-first
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Payslip Generator
                <span className="text-muted-foreground">
                  {" "}
                  — Salary Slip PDF
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Generate a clean salary slip in minutes. Add employer/employee
                details, earnings and deductions, then export a PDF payslip for
                records.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/payslip-generator/tool" />}
                  size="lg"
                  className="h-11 px-6"
                >
                  Generate payslip
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="#payslip-features" />}
                  variant="secondary"
                  size="lg"
                  className="h-11 px-6"
                >
                  Payslip features
                </Button>
              </div>

              <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <FileSignature className="h-4 w-4 text-primary" />
                  Payslip templates: {TEMPLATES.join(" · ")}
                </li>
                <li className="flex items-center gap-2">
                  <Printer className="h-4 w-4 text-primary" />
                  PDF export + print-ready output
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Local-first autosave drafts
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
                    Payslip generator specs
                  </h2>
                  <dl className="mt-4 grid gap-4 text-sm">
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Input
                      </dt>
                      <dd className="col-span-3">
                        Employer + employee details, pay period, earnings,
                        deductions, totals, signature
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Output
                      </dt>
                      <dd className="col-span-3">
                        Salary slip PDF (payslip PDF) download + preview
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
                        Privacy
                      </dt>
                      <dd className="col-span-3">
                        Local-first storage in your browser
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Autosave
                      </dt>
                      <dd className="col-span-3">
                        Changes auto-save and drafts are restored on refresh
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Saved
                      </dt>
                      <dd className="col-span-3">
                        Last 50 payslips saved locally for quick reuse
                      </dd>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      <dt className="col-span-2 text-muted-foreground">
                        Share
                      </dt>
                      <dd className="col-span-3">
                        Share a link to open the same payslip draft
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section id="payslip-features" className="w-full">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-tight">
                Payslip generator features for payroll records
              </h2>
              <p className="mt-3 text-muted-foreground">
                Use this salary slip generator to create payslips with a clear
                earnings and deductions breakdown, then export a salary slip
                PDF.
              </p>
              <div className="mt-6 border-t pt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Fully client-side. Runs in your browser, and the project is
                  designed to be open-source.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-8 md:grid-cols-2">
                <article className="space-y-3">
                  <h3 className="text-lg font-semibold">Details included</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Employer + employee details</li>
                    <li>Pay period and payment date</li>
                    <li>Earnings, deductions, totals</li>
                    <li>Net pay summary</li>
                    <li>Optional signature on PDF</li>
                  </ul>
                </article>

                <article className="space-y-3">
                  <h3 className="text-lg font-semibold">Output + storage</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>PDF payslip preview + PDF download</li>
                    <li>Local-first autosave in browser storage</li>
                    <li>Saved payslips list (last 50) for quick reuse</li>
                    <li>No signup, no backend storage</li>
                    <li>Share a link to open the same payslip draft</li>
                  </ul>
                </article>
              </div>

              <div className="mt-10 rounded-xl border bg-muted/10 p-6">
                <h3 className="text-lg font-semibold">Payslip templates</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a payslip template style and export a consistent salary
                  slip PDF every time.
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
                  render={<Link href="/payslip-generator/tool" />}
                  className="h-11 px-6"
                >
                  Generate salary slip PDF
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="#faq" />}
                  variant="outline"
                  className="h-11 px-6"
                >
                  Payslip generator FAQ
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
                Quick answers about salary slips, privacy, and PDF export.
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
                render={<Link href="/payslip-generator/tool" />}
                size="lg"
                className="h-11 px-6 w-full sm:w-auto"
              >
                Generate payslip
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
