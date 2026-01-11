import { getAllPrompts } from '@/lib/data';
import { DirectoryGrid } from '@/components/directory';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workflow Templates | Antigravity Directory',
  description: 'Download complete .antigravity folder templates. Multi-agent orchestration, CI/CD, and more.',
};

export default function TemplatesPage() {
  // Get prompts that could serve as templates (workflows, multi-agent, etc.)
  const allPrompts = getAllPrompts();
  const templates = allPrompts.filter(p =>
    p.type === 'workflow' ||
    p.type === 'template' ||
    p.category === 'multi-agent' ||
    p.category === 'devops'
  );

  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Workflow Templates</h1>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            Beta
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Complete .antigravity folder templates for common workflows. Clone and customize for your projects.
        </p>
      </div>

      {templates.length > 0 ? (
        <DirectoryGrid items={templates} showFilters={true} />
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold mb-2">Templates Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're curating complete workflow templates for multi-agent orchestration,
            CI/CD pipelines, and more. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
