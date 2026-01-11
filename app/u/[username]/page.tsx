import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Shield, Star, Bookmark, Grid, Activity } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface Props {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    return {
        title: `${username}'s Profile | Antigravity Directory`,
        description: `View ${username}'s contributions and saved agentic workflows.`,
    };
}

export default async function UserProfilePage({ params }: Props) {
    const { username } = await params;

    // Mock data for initial profile view
    const profile = {
        username,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        bio: 'Agentic workflow enthusiast and precision prompter. Building the future of automated testing.',
        joinedDate: 'Jan 2026',
        contributions: 12,
        savedCount: 45,
        reputation: 850,
        badges: ['Early Adopter', 'Bug Hunter', 'Safety First'],
        recentActivity: [
            { type: 'submission', title: 'Self-Annealing DOE Workspace', date: '2 days ago' },
            { type: 'bookmark', title: 'E2E Testing with Playwright', date: '4 days ago' },
            { type: 'rating', title: 'Clean Code Rules', date: '1 week ago' }
        ]
    };

    return (
        <div className="container py-12 max-w-6xl">
            <div className="flex flex-col gap-6 mb-12">
                <Breadcrumbs items={[{ title: 'Community', href: '#' }, { title: username, href: `/u/${username}` }]} />

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar / Stats */}
                    <aside className="w-full md:w-80 space-y-6">
                        <Card className="border-muted-foreground/10 bg-card/30 backdrop-blur-sm">
                            <CardContent className="pt-6 text-center space-y-4">
                                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center border-2 border-primary/20">
                                    <User className="h-12 w-12 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {profile.badges.map(badge => (
                                        <Badge key={badge} variant="secondary" className="text-[10px]">{badge}</Badge>
                                    ))}
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-2 py-2">
                                    <div className="text-center">
                                        <p className="font-bold text-lg">{profile.contributions}</p>
                                        <p className="text-[10px] uppercase text-muted-foreground">Posts</p>
                                    </div>
                                    <div className="text-center border-x border-muted-foreground/10">
                                        <p className="font-bold text-lg">{profile.savedCount}</p>
                                        <p className="text-[10px] uppercase text-muted-foreground">Saved</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-lg">{profile.reputation}</p>
                                        <p className="text-[10px] uppercase text-muted-foreground">Rep</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-muted-foreground/10 bg-card/30 backdrop-blur-sm">
                            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4" /> About</CardTitle></CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                {profile.bio}
                                <p className="mt-4 text-[10px] text-muted-foreground/50 italic">Member since {profile.joinedDate}</p>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-8">
                        <div className="flex items-center gap-4 border-b border-muted-foreground/10 pb-4">
                            <Button variant="ghost" className="text-primary border-b-2 border-primary rounded-none px-0">Activity</Button>
                            <Button variant="ghost" className="hover:text-primary rounded-none px-0">Saved Items</Button>
                            <Button variant="ghost" className="hover:text-primary rounded-none px-0">Submissions</Button>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" /> Recent Activity
                            </h2>
                            <div className="grid gap-4">
                                {profile.recentActivity.map((activity, i) => (
                                    <Card key={i} className="border-muted-foreground/10 hover:border-primary/30 transition-colors bg-card/20 group">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                                    {activity.type === 'submission' && <Grid className="h-4 w-4" />}
                                                    {activity.type === 'bookmark' && <Bookmark className="h-4 w-4" />}
                                                    {activity.type === 'rating' && <Star className="h-4 w-4" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{activity.title}</p>
                                                    <p className="text-xs text-muted-foreground">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground">{activity.date}</span>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
