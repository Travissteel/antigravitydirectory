'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
    className?: string;
    items?: { title: string; href: string }[];
}

export function Breadcrumbs({ className, items }: BreadcrumbsProps) {
    const pathname = usePathname();

    // If items are provided, use them. Otherwise, generate from pathname.
    const breadcrumbs = items || pathname
        .split('/')
        .filter(Boolean)
        .map((segment, index, array) => {
            const href = `/${array.slice(0, index + 1).join('/')}`;
            const title = segment
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase());

            return { title, href };
        });

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-muted-foreground", className)}>
            <ol className="flex items-center gap-2">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>

                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <li key={item.href} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/50" />
                            {isLast ? (
                                <span className="font-semibold text-foreground truncate max-w-[200px]" aria-current="page">
                                    {item.title}
                                </span>
                            ) : (
                                <Link href={item.href} className="hover:text-primary transition-colors">
                                    {item.title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
