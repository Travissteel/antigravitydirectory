import { notFound } from 'next/navigation';
import { getMCPBySlug, getAllMCPServers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink, ArrowLeft, Github } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd, generateMCPJsonLd } from '@/components/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const server = getMCPBySlug(slug);
  if (!server) return { title: 'Not Found' };

  return {
    title: `${server.name} MCP Server | Antigravity Directory`,
    description: server.description,
  };
}

export async function generateStaticParams() {
  const servers = getAllMCPServers();
  return servers.map((server) => ({ slug: server.slug }));
}

export default async function MCPServerPage({ params }: Props) {
  const { slug } = await params;
  const server = getMCPBySlug(slug);

  if (!server) {
    notFound();
  }

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
      <JsonLd data={generateMCPJsonLd(server)} />
      {/* Back link */}
      <Link href="/mcp" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to MCP Servers
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{server.icon}</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{server.name}</h1>
                  <Badge variant="outline" className={getPricingColor(server.pricing)}>
                    {server.pricing}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">{server.description}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {server.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Long description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{server.longDescription}</p>
            </CardContent>
          </Card>

          {/* Installation */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Installation</CardTitle>
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{server.installCommand}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Configuration</CardTitle>
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{server.configJson}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href={server.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
              >
                <ExternalLink className="h-4 w-4" />
                Documentation
              </a>
              {server.githubUrl && (
                <a
                  href={server.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </a>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="capitalize">{server.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pricing</span>
                <span className="capitalize">{server.pricing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span>{server.viewCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
