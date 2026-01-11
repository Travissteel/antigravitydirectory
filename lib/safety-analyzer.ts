import { SafetyFlags, SafetyAnalysis } from '@/types';

/**
 * Analyzes prompt content for safety risks
 * This is a CRITICAL DIFFERENTIATOR - no competitor has this
 */
export function analyzeSafety(content: string): SafetyAnalysis {
  const flags: SafetyFlags = {
    hasFileSystemAccess: /\b(fs\.|readFile|writeFile|unlink|rmdir|mkdir|copyFile|rename|appendFile)\b/i.test(content),
    hasNetworkAccess: /\b(fetch|axios|http|https|request|curl|wget)\b/i.test(content),
    hasShellCommands: /\b(exec|spawn|shell|bash|cmd|powershell|terminal|subprocess)\b/i.test(content),
    hasTurboMode: /turbo|auto-run|SafeToAutoRun|turbo-all/i.test(content),
    hasDeleteCommands: /\b(rm\s+-rf|rm\s+-r|del\s+\/|rmdir|unlink|delete|remove|DROP\s+TABLE|DROP\s+DATABASE)\b/i.test(content),
    deletionRisk: 'none'
  };

  // Calculate deletion risk
  if (flags.hasDeleteCommands && flags.hasTurboMode) {
    flags.deletionRisk = 'high';
  } else if (flags.hasDeleteCommands && flags.hasShellCommands) {
    flags.deletionRisk = 'high';
  } else if (flags.hasDeleteCommands) {
    flags.deletionRisk = 'medium';
  } else if (flags.hasFileSystemAccess && flags.hasShellCommands) {
    flags.deletionRisk = 'low';
  }

  // Calculate score (start at 100, deduct for risks)
  let score = 100;
  const warnings: string[] = [];

  if (flags.hasFileSystemAccess) {
    score -= 10;
    warnings.push('Has file system access');
  }
  if (flags.hasNetworkAccess) {
    score -= 5;
    warnings.push('Has network access');
  }
  if (flags.hasShellCommands) {
    score -= 20;
    warnings.push('Contains shell/command execution');
  }
  if (flags.hasTurboMode) {
    score -= 25;
    warnings.push('Uses Turbo/Auto-run mode - commands execute without confirmation');
  }
  if (flags.hasDeleteCommands) {
    score -= 30;
    warnings.push('Contains delete/remove commands');
  }

  // Determine level
  const level = score >= 80 ? 'safe' : score >= 50 ? 'caution' : 'dangerous';

  return {
    score: Math.max(0, score),
    level,
    flags,
    warnings
  };
}

/**
 * Get safety badge color classes
 */
export function getSafetyColor(level: 'safe' | 'caution' | 'dangerous'): string {
  switch (level) {
    case 'safe':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'caution':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'dangerous':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
  }
}

/**
 * Get safety icon
 */
export function getSafetyIcon(level: 'safe' | 'caution' | 'dangerous'): string {
  switch (level) {
    case 'safe':
      return '🟢';
    case 'caution':
      return '🟡';
    case 'dangerous':
      return '🔴';
  }
}
