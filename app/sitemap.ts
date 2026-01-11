import { MetadataRoute } from 'next';
import { getAllPrompts, getAllMCPServers } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://antigravity-directory.vercel.app';
  const prompts = getAllPrompts();
  const servers = getAllMCPServers();

  const promptUrls = prompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: new Date(prompt.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const mcpUrls = servers.map((server) => ({
    url: `${baseUrl}/mcp/${server.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mcp`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...promptUrls,
    ...mcpUrls,
  ];
}
