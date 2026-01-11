import { DirectoryGrid } from '@/components/directory';
import { getAllPrompts } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompts | Antigravity Directory',
  description: 'Browse trusted Antigravity prompts and workflows. Every prompt audited for safety.',
};

export default function PromptsPage() {
  const prompts = getAllPrompts();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Prompts & Workflows</h1>
        <p className="text-muted-foreground">
          {prompts.length} curated prompts, all audited for safety
        </p>
      </div>

      <DirectoryGrid items={prompts} showFilters={true} />
    </div>
  );
}
