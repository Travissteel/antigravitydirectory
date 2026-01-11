import { notFound } from 'next/navigation';
import { getPromptBySlug, getAllPrompts } from '@/lib/data';
import { SafetyBadge, DifficultyBadge } from '@/components/directory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download, Eye, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd, generatePromptJsonLd } from '@/components/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return { title: 'Not Found' };

  return {
    title: `${prompt.title} | Antigravity Directory`,
    description: prompt.description,
  };
}

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((prompt) => ({ slug: prompt.slug }));
}

export default async function PromptPage({ params }: Props) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="container py-12">
      <JsonLd data={generatePromptJsonLd(prompt)} />
      {/* Back link */}
      <Link href="/prompts" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Prompts
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">{prompt.title}</h1>
              <SafetyBadge level={prompt.safetyLevel} score={prompt.safetyScore} />
            </div>
            <p className="text-lg text-muted-foreground">{prompt.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <DifficultyBadge level={prompt.difficulty} />
            {prompt.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Content */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Prompt Content</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                {prompt.content}
              </pre>
            </CardContent>
          </Card>

          {/* Usage instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Click "Copy" to copy the prompt content</p>
              <p>2. Create a <code className="bg-muted px-1 rounded">.antigravity</code> file in your project root</p>
              <p>3. Paste the content and save</p>
              <p>4. Antigravity will automatically use this prompt</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Safety Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Safety Analysis
                <SafetyBadge level={prompt.safetyLevel} score={prompt.safetyScore} showScore={false} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Safety Score</span>
                <span className="font-mono">{prompt.safetyScore}/100</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {prompt.safetyFlags.hasFileSystemAccess ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span>File System Access</span>
                </div>
                <div className="flex items-center gap-2">
                  {prompt.safetyFlags.hasShellCommands ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span>Shell Commands</span>
                </div>
                <div className="flex items-center gap-2">
                  {prompt.safetyFlags.hasTurboMode ? (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span>Turbo Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  {prompt.safetyFlags.hasDeleteCommands ? (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span>Delete Commands</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span>{prompt.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="capitalize">{prompt.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {prompt.viewCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Copies</span>
                <span className="flex items-center gap-1">
                  <Copy className="h-3 w-3" />
                  {prompt.copyCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Author</span>
                <span>{prompt.author.name}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
