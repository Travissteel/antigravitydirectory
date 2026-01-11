'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
    content: string;
    label?: string;
    className?: string;
}

export function CopyButton({ content, label = 'Copy', className = '' }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className={`${className} transition-all duration-200 ${copied ? 'border-green-500 text-green-500 hover:text-green-500' : ''}`}
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4 mr-2" />
                    {label}
                </>
            )}
        </Button>
    );
}
