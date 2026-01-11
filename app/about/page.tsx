import { Shield, Target, Users } from 'lucide-react';

export const metadata = {
    title: 'About | Antigravity Directory',
    description: 'Learn about the mission and safety standards of the Antigravity Directory.',
};

export default function AboutPage() {
    return (
        <div className="container py-16 max-w-4xl">
            <div className="space-y-8">
                <div className="text-center space-y-6 mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About Antigravity Directory</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        The world's first agent-first directory with automated safety auditing.
                    </p>
                </div>

                <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                        Antigravity Directory was born from a simple observation: as AI agents become more powerful,
                        the risk of "rogue" actions increases. We saw a need for a community-driven platform where
                        prompts, workflows, and MCP servers aren't just shared, but audited.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    <div className="p-6 rounded-xl border border-border bg-card/50 space-y-3 text-center">
                        <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
                        <h3 className="text-lg font-bold">Safety First</h3>
                        <p className="text-sm text-muted-foreground">
                            Every item is analyzed for risky shell commands, file system access, and destructive actions.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl border border-border bg-card/50 space-y-3 text-center">
                        <Target className="h-12 w-12 text-[#FC413D] mx-auto mb-2" />
                        <h3 className="text-lg font-bold">Curated Quality</h3>
                        <p className="text-sm text-muted-foreground">
                            We focus on high-utility resources that solve real-world development problems.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl border border-border bg-card/50 space-y-3 text-center">
                        <Users className="h-12 w-12 text-[#00B95C] mx-auto mb-2" />
                        <h3 className="text-lg font-bold">Community Driven</h3>
                        <p className="text-sm text-muted-foreground">
                            Built for developers, by developers who believe in the power of agentic workflows.
                        </p>
                    </div>
                </div>

                <div className="pt-12 space-y-6">
                    <h2 className="text-2xl font-bold">Our Safety Standards</h2>
                    <p className="text-muted-foreground">
                        We use a proprietary analysis engine that assigns a safety score to every submission.
                        Items with high-risk flags are clearly marked, and we encourage users to always
                        review code before execution.
                    </p>
                    <div className="p-6 rounded-lg bg-[#FBBC04]/10 border border-[#FBBC04]/20">
                        <p className="text-lg text-[#FBBC04] font-medium italic text-center">
                            "Every prompt audited for safety. No more drive deletions."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
