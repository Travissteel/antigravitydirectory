'use client';

import Link from 'next/link';
import { Search, Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🚀</span>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Antigravity Directory
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
          <div className="hidden sm:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              className="pl-10 w-64 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>
    </header>
  );
}
