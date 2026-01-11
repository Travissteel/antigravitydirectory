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
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Prompts & Workflows</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {prompts.length} curated prompts, all audited for safety. Ready to copy and use in Antigravity.
        </p>
      </div>

      <DirectoryGrid items={prompts} showFilters={true} />
    </div>
  );
}
