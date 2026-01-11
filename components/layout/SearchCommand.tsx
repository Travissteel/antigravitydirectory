'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Search,
    FileCode,
    Zap,
    Terminal,
    Cpu,
} from 'lucide-react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import { getSearchItems, UnifiedSearchItem } from '@/lib/data';

export function SearchCommand() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const [items, setItems] = React.useState<UnifiedSearchItem[]>([]);

    React.useEffect(() => {
        setItems(getSearchItems());
    }, []);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    const getIcon = (type: UnifiedSearchItem['type']) => {
        switch (type) {
            case 'prompt':
                return <Terminal className="mr-2 h-4 w-4" />;
            case 'rule':
                return <FileCode className="mr-2 h-4 w-4" />;
            case 'workflow':
                return <Zap className="mr-2 h-4 w-4" />;
            case 'mcp':
                return <Cpu className="mr-2 h-4 w-4" />;
            default:
                return <Search className="mr-2 h-4 w-4" />;
        }
    };

    const getPath = (item: UnifiedSearchItem) => {
        switch (item.type) {
            case 'prompt':
                return `/prompts/${item.slug}`;
            case 'rule':
                return `/rules/${item.slug}`;
            case 'workflow':
                return `/workflows/${item.slug}`;
            case 'mcp':
                return `/mcp/${item.slug}`;
            default:
                return `/prompts/${item.slug}`;
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1 transparent"
            >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline-block">Search...</span>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Prompts">
                        {items.filter(item => item.type === 'prompt' || item.type === 'template').map((item) => (
                            <CommandItem
                                key={item.id}
                                onSelect={() => runCommand(() => router.push(getPath(item)))}
                            >
                                {getIcon(item.type)}
                                <span>{item.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Workflows">
                        {items.filter(item => item.type === 'workflow').map((item) => (
                            <CommandItem
                                key={item.id}
                                onSelect={() => runCommand(() => router.push(getPath(item)))}
                            >
                                {getIcon(item.type)}
                                <span>{item.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Rules">
                        {items.filter(item => item.type === 'rule').map((item) => (
                            <CommandItem
                                key={item.id}
                                onSelect={() => runCommand(() => router.push(getPath(item)))}
                            >
                                {getIcon(item.type)}
                                <span>{item.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="MCP Servers">
                        {items.filter(item => item.type === 'mcp').map((item) => (
                            <CommandItem
                                key={item.id}
                                onSelect={() => runCommand(() => router.push(getPath(item)))}
                            >
                                {getIcon(item.type)}
                                <span>{item.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => runCommand(() => router.push('/about'))}>
                            <User className="mr-2 h-4 w-4" />
                            <span>About Project</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/privacy'))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Privacy Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
