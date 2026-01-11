import { Suspense } from 'react';
import { DirectoryGrid } from '@/components/directory';
import { getSearchItems } from '@/lib/data';
import { Metadata } from 'next';
import { searchItems } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Search Results | Antigravity Directory',
    description: 'Search results for Antigravity prompts, rules, and workflows.',
};

export default function SearchPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const query = typeof searchParams.q === 'string' ? searchParams.q : '';
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;

    // Note: searchItems returns DirectoryItem[], but SearchPage should 
    // ideally show all types. For now, we'll use prompts and display 
    // them, but in a real app we'd unified the search.
    const allItems = getSearchItems();
    // Map UnifiedSearchItem back to DirectoryItem for DirectoryGrid 
    // (Or upgrade DirectoryGrid to handle UnifiedSearchItem)

    // Actually, let's just use the prompts for now as DirectoryGrid expects DirectoryItem
    const items = searchItems(query);

    return (
        <div className="container py-12">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Search Results</h1>
                {query && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Showing results for "<span className="text-primary font-semibold">{query}</span>"
                    </p>
                )}
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <DirectoryGrid
                    items={items as any}
                    showFilters={true}
                    initialQuery={query}
                    initialCategory={category}
                />
            </Suspense>
        </div>
    );
}
