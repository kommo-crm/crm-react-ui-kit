import { readFileSync } from 'node:fs';

export function extractCssVars(css: string): string[] {
  const matches = css.matchAll(/--[\w-]+(?=:)/g);

  return [...new Set([...matches].map((m) => m[0]))];
}

export function validateCssContract(
  cssPath: string,
  requiredVars: string[]
): void {
  const css = readFileSync(cssPath, 'utf8');
  const found = extractCssVars(css);
  const allowed = new Set(requiredVars);

  const missing = requiredVars.filter((v) => !found.includes(v));
  const extra = found.filter((v) => !allowed.has(v));

  const errors: string[] = [];

  if (missing.length > 0) {
    errors.push(
      `Missing required CSS variables:\n${missing.map((v) => `  • ${v}`).join('\n')}`
    );
  }

  if (extra.length > 0) {
    errors.push(
      `Unregistered CSS variables (not in requiredTokens):\n${extra.map((v) => `  • ${v}`).join('\n')}`
    );
  }

  if (errors.length > 0) {
    throw new Error(`Token contract violation\n\n${errors.join('\n\n')}`);
  }
}
