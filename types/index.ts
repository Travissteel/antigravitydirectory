// Safety flags for analyzing prompt content
export interface SafetyFlags {
  hasFileSystemAccess: boolean;
  hasNetworkAccess: boolean;
  hasShellCommands: boolean;
  hasTurboMode: boolean;
  hasDeleteCommands: boolean;
  deletionRisk: 'none' | 'low' | 'medium' | 'high';
}

// Safety analysis result
export interface SafetyAnalysis {
  score: number; // 1-100
  level: 'safe' | 'caution' | 'dangerous';
  flags: SafetyFlags;
  warnings: string[];
}

// Author info
export interface Author {
  id: string;
  name: string;
  avatarUrl?: string;
  githubUrl?: string;
  verified: boolean;
}

// Changelog entry for versioning
export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

// Main directory item (prompts, workflows, templates)
export interface DirectoryItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  type: 'workflow' | 'prompt' | 'mcp' | 'template';

  // Categorization
  tags: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  // Safety (CRITICAL DIFFERENTIATOR)
  safetyScore: number;
  safetyLevel: 'safe' | 'caution' | 'dangerous';
  safetyFlags: SafetyFlags;

  // Author
  author: Author;

  // Versioning
  version: string;
  changelog: ChangelogEntry[];
  deprecated: boolean;

  // Social proof
  viewCount: number;
  copyCount: number;

  // Media
  videoUrl?: string;

  // Compatibility
  compatibleWith: string[];

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// MCP Server type
export interface MCPServer {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  tags: string[];
  installCommand: string;
  configJson: string;
  pricing: 'free' | 'freemium' | 'paid';
  docsUrl: string;
  githubUrl?: string;
  viewCount: number;
}

// Category type
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

// Rule type - for coding rules and best practices
export interface Rule {
  id: string;
  slug: string;
  name: string;
  description: string;
  content: string; // The actual rule code/content

  // Categorization
  category: 'coding-style' | 'architectural-patterns' | 'security-standards' | 'performance';
  language: string; // typescript, python, javascript, etc.
  tags: string[];

  // Safety (for rules that include shell commands)
  safetyScore?: number;
  safetyLevel?: 'safe' | 'caution' | 'dangerous';
  safetyFlags?: SafetyFlags;

  // Author
  author: Author;

  // Versioning
  version: string;

  // Social proof
  viewCount: number;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// Workflow step
export interface WorkflowStep {
  order: number;
  title: string;
  description: string;
}

// Workflow type - for automated workflows
export interface Workflow {
  id: string;
  slug: string;
  name: string;
  description: string;
  content: string; // The workflow steps/code

  // Categorization
  category: 'automated-qa' | 'ci-cd' | 'database-migration' | 'deployment' | 'refactoring';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  // Workflow-specific
  steps: WorkflowStep[];
  estimatedTime: string; // e.g., "5-10 minutes"

  // Safety (workflows often have shell commands - REQUIRED)
  safetyScore: number;
  safetyLevel: 'safe' | 'caution' | 'dangerous';
  safetyFlags: SafetyFlags;

  // Author
  author: Author;

  // Versioning
  version: string;

  // Social proof
  viewCount: number;

  // Metadata
  createdAt: string;
  updatedAt: string;
}
