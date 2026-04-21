import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '../..');

export const distDir = path.resolve(rootDir, 'dist');
export const generatedDir = path.resolve(rootDir, '.generated');

fs.mkdirSync(distDir, { recursive: true });
fs.rmSync(generatedDir, { recursive: true, force: true });
fs.mkdirSync(generatedDir, { recursive: true });

/**
 * Writes `content` to `<dir>/<relPath>`, creating any missing parent directories.
 * Calls `cb` after the file is written if provided.
 */
export function writeFile(
  dir: string,
  relPath: string,
  content: string,
  cb?: () => void
): void {
  const dest = path.join(dir, relPath);

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
  cb?.();
}
