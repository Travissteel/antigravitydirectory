import { notFound } from 'next/navigation';
import { getRuleBySlug, getAllRules } from '@/lib/data';
import { SafetyBadge } from '@/components/directory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Rule } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rule = getRuleBySlug(slug);
  if (!rule) return { title: 'Not Found' };

  return {
    title: `${rule.name} | Antigravity Directory`,
    description: rule.description,
  };
}

export async function generateStaticParams() {
  const rules = getAllRules();
  return rules.map((rule) => ({ slug: rule.slug }));
}

const getCategoryColor = (category: Rule['category']) => {
  switch (category) {
    case 'coding-style': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'architectural-patterns': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'security-standards': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'performance': return 'bg-green-500/20 text-green-400 border-green-500/30';
    default: return '';
  }
};

export default async function RulePage({ params }: Props) {
  const { slug } = await params;
  const rule = getRuleBySlug(slug);

  if (!rule) {
    notFound();
  }

  return (
    <div className="container py-12">
      {/* Back link */}
      <Link href="/rules" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Rules
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">{rule.name}</h1>
              {rule.safetyLevel && rule.safetyScore && (
                <SafetyBadge level={rule.safetyLevel} score={rule.safetyScore} />
              )}
            </div>
            <p className="text-lg text-muted-foreground">{rule.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getCategoryColor(rule.category)}>
              {rule.category.replace('-', ' ')}
            </Badge>
            <Badge variant="secondary">{rule.language}</Badge>
            {rule.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Rule Content */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Rule Content</CardTitle>
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap font-mono">
                {rule.content}
              </pre>
            </CardContent>
          </Card>

          {/* Usage instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Click "Copy" to copy the rule content</p>
              <p>2. Add to your project's linting configuration or style guide</p>
              <p>3. Ensure all team members follow the rule</p>
              <p>4. Use in code reviews and automated checks</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Safety Analysis - only show if safety data exists */}
          {rule.safetyLevel && rule.safetyScore && rule.safetyFlags && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Safety Analysis
                  <SafetyBadge level={rule.safetyLevel} score={rule.safetyScore} showScore={false} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Safety Score</span>
                  <span className="font-mono">{rule.safetyScore}/100</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {rule.safetyFlags.hasFileSystemAccess ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                    <span>File System Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {rule.safetyFlags.hasShellCommands ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                    <span>Shell Commands</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {rule.safetyFlags.hasTurboMode ? (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                    <span>Turbo Mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {rule.safetyFlags.hasDeleteCommands ? (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                    <span>Delete Commands</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span>{rule.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="capitalize">{rule.category.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language</span>
                <span className="capitalize">{rule.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {rule.viewCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Author</span>
                <span>{rule.author.name}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
