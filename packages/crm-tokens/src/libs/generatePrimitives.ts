import { writeFile } from '@/libs/writeFile';
import { Generator } from '@/types/generator';

export async function generatePrimitives({
  label,
  files,
}: Generator): Promise<void> {
  console.log(`\n${label}:`);

  for (const { dir, path, content } of files) {
    await writeFile(dir, path, content);
    console.log(`  ✓ ${path}`);
  }
}
