export const metadata = {
    title: 'Terms of Service | Antigravity Directory',
};

export default function TermsPage() {
    return (
        <div className="container py-16 max-w-3xl">
            <h1 className="text-4xl font-bold mb-12 text-center tracking-tight">Terms of Service</h1>
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p>
                    Last Updated: January 2026
                </p>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                    <p>
                        By using Antigravity Directory, you agree to these terms. If you do not agree,
                        please do not use the service.
                    </p>
                </section>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">2. Content Responsibility</h2>
                    <p>
                        You are responsible for any code or prompts you copy or use from this directory.
                        While we audit for safety, we provide NO WARRANTY for the actions taken by your AI agents.
                    </p>
                </section>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">3. Prohibited Use</h2>
                    <p>
                        You may not use this directory for any illegal purpose or to distribute malicious code.
                    </p>
                </section>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">4. Limitation of Liability</h2>
                    <p>
                        Antigravity Directory is provided "as is". We are not liable for any damages resulting
                        from the use of resources found here.
                    </p>
                </section>
            </div>
        </div>
    );
}
