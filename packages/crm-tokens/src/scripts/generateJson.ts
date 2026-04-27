import { primitives } from '@/design/primitives';

type DTCGToken = { $type: string; $value: string };
type DTCGNode = DTCGToken | { [key: string]: DTCGNode };

function primitiveToDTO(node: unknown): DTCGNode {
  if (typeof node === 'string') {
    return { $type: 'color', $value: node };
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([k, v]) => [
      k,
      primitiveToDTO(v),
    ])
  );
}

export function generatePrimitivesJson(): string {
  return JSON.stringify(primitiveToDTO(primitives), null, 2);
}
