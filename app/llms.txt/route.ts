import { getAllPrompts, getAllMCPServers } from '@/lib/data';

export async function GET() {
  const prompts = getAllPrompts().filter(p => p.safetyLevel === 'safe');
  const servers = getAllMCPServers();

  const content = `# Antigravity Directory - LLMs.txt
# The Directory Developers Trust
# https://antigravity-directory.vercel.app

## About
This directory contains trusted Antigravity prompts and MCP servers.
Every prompt is audited for safety - no destructive commands, no turbo-mode risks.

## Safe Prompts (${prompts.length} items)

${prompts.map(p => `### ${p.title}
Category: ${p.category}
Difficulty: ${p.difficulty}
Safety Score: ${p.safetyScore}/100
Tags: ${p.tags.join(', ')}

${p.content}

---
`).join('\n')}

## MCP Servers (${servers.length} items)

${servers.map(s => `### ${s.name}
Category: ${s.category}
Pricing: ${s.pricing}
Install: ${s.installCommand}
Docs: ${s.docsUrl}

${s.description}

---
`).join('\n')}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
