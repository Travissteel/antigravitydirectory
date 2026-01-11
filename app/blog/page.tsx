import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog | Antigravity Directory',
    description: 'Expert guides, safety audits, and best practices for building with Antigravity IDE.',
};

const blogPosts = [
    {
        title: 'Getting Started with Antigravity IDE',
        description: 'A comprehensive guide to setting up your environment for the world\'s first agent-first IDE.',
        slug: 'getting-started-with-antigravity',
        date: 'Jan 10, 2026',
        readingTime: '5 min read',
        category: 'Guide',
        author: 'Antigravity Team',
        color: 'text-[#3186FF]'
    },
    {
        title: 'The Future of Agentic Workflows',
        description: 'How multi-agent systems are redefining software engineering and what it means for you.',
        slug: 'future-of-agentic-workflows',
        date: 'Jan 8, 2026',
        readingTime: '8 min read',
        category: 'Analysis',
        author: 'Antigravity Team',
        color: 'text-[#FC413D]'
    },
    {
        title: 'Safety First: Auditing Your Prompts',
        description: 'Learn how to use our safety analyzer and avoid common pitfalls when running untrusted code.',
        slug: 'safety-first-auditing-prompts',
        date: 'Jan 5, 2026',
        readingTime: '6 min read',
        category: 'Security',
        author: 'Antigravity Team',
        color: 'text-[#00B95C]'
    }
];

export default function BlogPage() {
    return (
        <div className="container py-12 max-w-6xl">
            <div className="flex flex-col gap-6 mb-12">
                <Breadcrumbs />
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Antigravity <span className="text-primary italic">Blog</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Expert insights, tutorials, and community updates for the agent-first era.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full border-muted-foreground/10 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden group-hover:shadow-2xl group-hover:shadow-primary/10">
                            <CardHeader className="p-0">
                                <div className="h-48 bg-muted relative flex items-center justify-center p-8 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-110 transition-transform duration-500" />
                                    <h3 className={cn("text-2xl font-bold text-center relative z-10", post.color)}>
                                        {post.category}
                                    </h3>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4 text-left">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readingTime}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-muted-foreground text-sm line-clamp-3">
                                    {post.description}
                                </p>

                                <div className="flex items-center text-primary font-medium text-sm pt-2">
                                    Read Article
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
