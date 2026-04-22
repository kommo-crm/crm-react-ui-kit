import { primitives } from '@/design/primitives';
import { isRawColorValue } from '@/libs/isRawColorValue';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _semanticToDTO(node: unknown): DTCGNode {
  if (typeof node === 'string') {
    const value = isRawColorValue(node as Parameters<typeof isRawColorValue>[0])
      ? node
      : `{${node}}`;

    return { $type: 'color', $value: value };
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([k, v]) => [
      k,
      _semanticToDTO(v),
    ])
  );
}

export function generatePrimitivesJson(): string {
  return JSON.stringify(primitiveToDTO(primitives), null, 2);
}
