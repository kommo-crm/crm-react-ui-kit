import { primitives } from '@/design/primitives';

const HEADER = '// Auto-generated. Do not edit manually.\n';

export function generatePrimitivesTs(): string {
  return `${HEADER}export const color = ${JSON.stringify(primitives.color, null, 2)} as const;\n`;
}
