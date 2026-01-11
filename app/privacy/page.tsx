export const metadata = {
    title: 'Privacy Policy | Antigravity Directory',
};

export default function PrivacyPage() {
    return (
        <div className="container py-16 max-w-3xl">
            <h1 className="text-4xl font-bold mb-12 text-center tracking-tight">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                <p>
                    Last Updated: January 2026
                </p>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
                    <p>
                        We collect minimal information to provide our services. This may include your email address
                        if you sign up for an account, and technical data about your interaction with the site.
                    </p>
                </section>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">2. How We Use Information</h2>
                    <p>
                        Information is used solely to improve the user experience, manage your submissions,
                        and provide occasional updates if you've opted in.
                    </p>
                </section>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">3. Data Security</h2>
                    <p>
                        We take industry-standard measures to protect your data. However, no internet-based
                        system is 100% secure.
                    </p>
                </section>
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">4. Contact Us</h2>
                    <p>
                        If you have questions about this policy, please contact us at privacy@antigravity.dev
                    </p>
                </section>
            </div>
        </div>
    );
}
