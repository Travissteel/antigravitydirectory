'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchCommand } from './SearchCommand';
import { AntigravityLogo } from './AntigravityLogo';

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <AntigravityLogo className="h-8 w-8" />
          <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-[#3186FF] via-[#FC413D] to-[#FBBC04] bg-clip-text text-transparent">
            Antigravity
          </span>
          <span className="font-semibold text-xl text-muted-foreground/80">
            Directory
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/prompts" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Prompts
          </Link>
          <Link href="/workflows" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Workflows
          </Link>
          <Link href="/rules" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Rules
          </Link>
          <Link href="/mcp" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            MCP Servers
          </Link>
          <Link href="/templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Templates
          </Link>
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <SearchCommand />
          <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>
    </header>
  );
}
