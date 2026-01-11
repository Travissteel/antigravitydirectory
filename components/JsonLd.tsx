interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generatePromptJsonLd(prompt: {
  title: string;
  description: string;
  slug: string;
  author: { name: string };
  createdAt: string;
  updatedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: prompt.title,
    description: prompt.description,
    url: `https://antigravity-directory.vercel.app/prompts/${prompt.slug}`,
    author: {
      '@type': 'Person',
      name: prompt.author.name,
    },
    dateCreated: prompt.createdAt,
    dateModified: prompt.updatedAt,
    programmingLanguage: 'Markdown',
    applicationCategory: 'AI Prompt',
  };
}

export function generateMCPJsonLd(server: {
  name: string;
  description: string;
  slug: string;
  docsUrl: string;
  pricing: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: server.name,
    description: server.description,
    url: `https://antigravity-directory.vercel.app/mcp/${server.slug}`,
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: server.pricing === 'free' ? '0' : undefined,
      priceCurrency: 'USD',
    },
  };
}
