function isMergeable(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  for (const [key, val] of Object.entries(source)) {
    if (isMergeable(val) && isMergeable(target[key])) {
      target[key] = deepMerge(
        target[key] as Record<string, unknown>,
        val as Record<string, unknown>
      );
    } else {
      target[key] = val;
    }
  }

  return target;
}

/**
 * Returns the dotted paths at which merging `source` into `target` would
 * overwrite an existing value instead of deep-merging two objects — i.e. the
 * cases where `deepMerge` silently drops data. A path is a collision when the
 * key already exists in `target` and at least one side is not a plain object
 * (so the two cannot be recursively merged).
 */
export function detectCollisions(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
  basePath: string[] = []
): string[] {
  const collisions: string[] = [];

  for (const [key, val] of Object.entries(source)) {
    if (!(key in target)) {
      continue;
    }

    const path = [...basePath, key];

    if (isMergeable(val) && isMergeable(target[key])) {
      collisions.push(...detectCollisions(target[key], val, path));
    } else {
      collisions.push(path.join('.'));
    }
  }

  return collisions;
}
