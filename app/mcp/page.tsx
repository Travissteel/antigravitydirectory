import { getAllMCPServers } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MCP Servers | Antigravity Directory',
  description: 'Browse MCP servers for Google Antigravity. Database, payments, AI, and more integrations.',
};

export default function MCPPage() {
  const servers = getAllMCPServers();

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'freemium': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'paid': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return '';
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">MCP Servers</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {servers.length} integrations for databases, payments, AI, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <Link key={server.id} href={`/mcp/${server.slug}`}>
            <Card className="h-full hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{server.icon}</span>
                    <CardTitle className="text-lg">{server.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className={getPricingColor(server.pricing)}>
                    {server.pricing}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{server.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {server.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="h-3 w-3 mr-1" />
                  {server.viewCount} views
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
