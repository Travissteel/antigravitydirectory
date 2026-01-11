import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import { AntigravityLogo } from './AntigravityLogo';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <AntigravityLogo className="h-6 w-6" />
              <span className="font-bold text-lg">Antigravity Directory</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The directory developers trust. Every prompt audited for safety.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h3 className="font-semibold mb-4">Directory</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/prompts" className="hover:text-foreground transition-colors">Prompts</Link></li>
              <li><Link href="/workflows" className="hover:text-foreground transition-colors">Workflows</Link></li>
              <li><Link href="/rules" className="hover:text-foreground transition-colors">Rules</Link></li>
              <li><Link href="/mcp" className="hover:text-foreground transition-colors">MCP Servers</Link></li>
              <li><Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><Link href="/llms.txt" className="hover:text-foreground transition-colors">llms.txt</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Antigravity Directory. Not affiliated with Google LLC.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
