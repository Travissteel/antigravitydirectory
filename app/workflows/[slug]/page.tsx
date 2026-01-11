import { notFound } from 'next/navigation';
import { getWorkflowBySlug, getAllWorkflows } from '@/lib/data';
import { SafetyBadge } from '@/components/directory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye, ArrowLeft, CheckCircle, AlertTriangle, Clock, List } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Workflow } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) return { title: 'Not Found' };

  return {
    title: `${workflow.name} | Antigravity Directory`,
    description: workflow.description,
  };
}

export async function generateStaticParams() {
  const workflows = getAllWorkflows();
  return workflows.map((workflow) => ({ slug: workflow.slug }));
}

const getCategoryColor = (category: Workflow['category']) => {
  switch (category) {
    case 'automated-qa': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'ci-cd': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'database-migration': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'deployment': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'refactoring': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
    default: return '';
  }
};

export default async function WorkflowPage({ params }: Props) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  return (
    <div className="container py-12">
      {/* Back link */}
      <Link href="/workflows" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Workflows
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">{workflow.name}</h1>
              <SafetyBadge level={workflow.safetyLevel} score={workflow.safetyScore} />
            </div>
            <p className="text-lg text-muted-foreground">{workflow.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getCategoryColor(workflow.category)}>
              {workflow.category.replace('-', ' ')}
            </Badge>
            <Badge variant="secondary">{workflow.difficulty}</Badge>
            {workflow.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Workflow Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <List className="h-5 w-5" />
                Workflow Steps ({workflow.steps.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {workflow.steps.map((step) => (
                  <li key={step.order} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-semibold">
                      {step.order}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Workflow Code/Content */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Workflow Code</CardTitle>
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap font-mono">
                {workflow.content}
              </pre>
            </CardContent>
          </Card>

          {/* Usage instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>1. Review the workflow steps and safety warnings</p>
              <p>2. Click "Copy" to copy the workflow code</p>
              <p>3. Paste into your project or CI/CD pipeline</p>
              <p>4. Customize as needed for your specific use case</p>
              <p>5. Test in a safe environment before production use</p>
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
                <SafetyBadge level={workflow.safetyLevel} score={workflow.safetyScore} showScore={false} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Safety Score</span>
                <span className="font-mono">{workflow.safetyScore}/100</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {workflow.safetyFlags.hasFileSystemAccess ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span>File System Access</span>
                </div>
                <div className="flex items-center gap-2">
                  {workflow.safetyFlags.hasShellCommands ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span>Shell Commands</span>
                </div>
                <div className="flex items-center gap-2">
                  {workflow.safetyFlags.hasTurboMode ? (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  <span>Turbo Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  {workflow.safetyFlags.hasDeleteCommands ? (
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
                <span>{workflow.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="capitalize">{workflow.category.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="capitalize">{workflow.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Time</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {workflow.estimatedTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Steps</span>
                <span>{workflow.steps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {workflow.viewCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Author</span>
                <span>{workflow.author.name}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
