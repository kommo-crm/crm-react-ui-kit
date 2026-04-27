import * as fs from 'fs/promises';
import * as path from 'path';

const rootDir = path.resolve(__dirname, '../..');

export const distDir = path.resolve(rootDir, 'dist');
export const generatedDir = path.resolve(rootDir, '.generated');

export async function setup(): Promise<void> {
  await fs.mkdir(distDir, { recursive: true });
  await fs.rm(generatedDir, { recursive: true, force: true });
  await fs.mkdir(generatedDir, { recursive: true });
}

export async function writeFile(
  dir: string,
  relPath: string,
  content: string
): Promise<void> {
  const dest = path.join(dir, relPath);

  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, content, 'utf8');
}
