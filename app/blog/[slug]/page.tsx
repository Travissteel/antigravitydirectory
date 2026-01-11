import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Calendar, Clock, ArrowLeft, User, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Props {
    params: Promise<{ slug: string }>;
}

const blogPosts = {
    'getting-started-with-antigravity': {
        title: 'Getting Started with Antigravity IDE',
        description: 'A comprehensive guide to setting up your environment for the world\'s first agent-first IDE.',
        content: `
      ## Introduction
      Welcome to the future of development. Antigravity IDE isn't just another code editor; it's a paradigm shift. Unlike traditional editors that focus on the developer, Antigravity is built around the "Agentic Workflow"—where AI agents are first-class citizens.

      ## Setting Up Your Workspace
      To get started, you'll need to install the core CLI and configure your agentic environment. This involves setting up your .antigravity folder and defining your initial agent roles.

      ### 1. Prerequisites
      - Node.js 18.x or higher
      - A Gemini API Key
      - The latest Antigravity binary

      ### 2. Initialization
      Run the following command to bootstrap your project:
      \`\`\`bash
      antigravity init my-new-project
      \`\`\`

      ## Your First Agentic Task
      The core of Antigravity is the GEMINI.md file. This acts as the conductor for your subagents. In the next section, we'll explore how to structure your first complex task.
    `,
        date: 'Jan 10, 2026',
        readingTime: '5 min read',
        category: 'Guide',
        author: 'Antigravity Team',
        tags: ['setup', 'beginner', 'core']
    }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts[slug as keyof typeof blogPosts];
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Antigravity Blog`,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts[slug as keyof typeof blogPosts];

    if (!post) {
        notFound();
    }

    return (
        <article className="container py-12 max-w-4xl">
            <div className="flex flex-col gap-6 mb-12">
                <Breadcrumbs />

                <div className="flex justify-center">
                    <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Blog
                    </Link>
                </div>

                <div className="space-y-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {post.category}
                        </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {post.readingTime}
                        </span>
                        <span className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-primary" />
                            {post.author}
                        </span>
                    </div>
                </div>
            </div>

            <Separator className="my-12" />

            <div className="prose prose-invert max-w-none mx-auto text-left prose-headings:text-primary prose-a:text-primary prose-code:text-primary/80">
                {/* In a real app, this would be MDXRemote or similar */}
                <div className="space-y-6">
                    <p className="text-xl text-muted-foreground leading-relaxed italic">
                        {post.description}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, '</p><p>').replace(/### (.*)/g, '<h3 className="text-2xl font-bold mt-8 mb-4">$1</h3>').replace(/## (.*)/g, '<h2 className="text-3xl font-bold mt-12 mb-6 border-b pb-2">$2</h2>') }} />
                </div>
            </div>

            <Separator className="my-12" />

            <div className="flex flex-wrap gap-2 justify-center">
                {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
            </div>
        </article>
    );
}
