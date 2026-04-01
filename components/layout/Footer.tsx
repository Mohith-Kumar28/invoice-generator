import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-screen-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">InvoiceForge</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create stunning invoices in seconds. Free forever.
            </p>
            <ThemeToggle />
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Create Invoice</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Made with ❤️ for freelancers, agencies, and small businesses worldwide.</p>
          <p className="mt-2">© {new Date().getFullYear()} InvoiceForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
