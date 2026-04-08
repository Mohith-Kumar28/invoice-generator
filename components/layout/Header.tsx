import { FileText } from "lucide-react";
import Link from "next/link";
import { GitHubIssueButton } from "@/components/shared/GitHubIssueButton";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { APP_NAME } from "@/lib/site";
import { TOOL_NAV_LINKS } from "@/lib/tools";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8 mx-auto justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            
            <span className="font-bold inline-block capitalize">{APP_NAME}</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
            <span className="text-muted-foreground/50">•</span>
            <span>Made with ❤️ and AI 🤖</span>
            <GitHubIssueButton />
          </div>
        </div>

        <nav className="flex items-center space-x-4 sm:space-x-6 text-sm font-medium">
          {TOOL_NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
