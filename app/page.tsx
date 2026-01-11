import { DirectoryGrid } from '@/components/directory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllPrompts, getAllCategories, getFeaturedPrompts } from '@/lib/data';

export default function Home() {
  const prompts = getAllPrompts();
  const categories = getAllCategories();
  const featuredPrompts = getFeaturedPrompts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-background" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Shield className="h-3 w-3 mr-1" />
              Every prompt audited for safety
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              The Directory Developers Trust
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover trusted workflows, prompts, and MCP servers for Google Antigravity.
              No more drive deletions. No more risky prompts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Browse Prompts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View MCP Servers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400">{prompts.length}+</div>
              <div className="text-sm text-muted-foreground">Curated Prompts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">15+</div>
              <div className="text-sm text-muted-foreground">MCP Servers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">100%</div>
              <div className="text-sm text-muted-foreground">Safety Audited</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-border/40 bg-card">
            <Shield className="h-10 w-10 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Safety First</h3>
            <p className="text-muted-foreground text-sm">
              Every prompt analyzed for destructive commands, turbo-mode risks, and file system access.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border/40 bg-card">
            <Zap className="h-10 w-10 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Production Ready</h3>
            <p className="text-muted-foreground text-sm">
              Tested prompts and workflows that work. Copy and use immediately in your projects.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border/40 bg-card">
            <Users className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
            <p className="text-muted-foreground text-sm">
              Curated by developers, for developers. Submit your own prompts and help others.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <Link href="/prompts" className="text-purple-400 hover:text-purple-300 text-sm">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/prompts?category=${cat.slug}`}
              className="p-4 rounded-lg border border-border/40 bg-card hover:border-purple-500/50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-medium">{cat.name}</div>
              <div className="text-xs text-muted-foreground">{cat.count} prompts</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-16 container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Prompts</h2>
          <Link href="/prompts" className="text-purple-400 hover:text-purple-300 text-sm">
            View all →
          </Link>
        </div>
        <DirectoryGrid items={featuredPrompts} showFilters={false} />
      </section>

      {/* CTA Section */}
      <section className="py-20 container">
        <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-12 text-center border border-purple-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to contribute?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Share your prompts with the community. Every submission goes through our safety analysis.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Submit a Prompt
          </Button>
        </div>
      </section>
    </div>
  );
}
