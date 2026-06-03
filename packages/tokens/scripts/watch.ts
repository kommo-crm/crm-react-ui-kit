import { watch } from 'node:fs';
import { resolve } from 'node:path';
import { build } from '../config/style-dictionary.config';

const TOKENS_DIR = resolve('tokens');

let building = false;
let pending = false;

async function rebuild() {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  const start = Date.now();
  try {
    await build();
    console.log(`[tokens] built in ${Date.now() - start}ms`);
  } catch (err) {
    console.error('[tokens] build error:', err);
  } finally {
    building = false;
    if (pending) {
      pending = false;
      rebuild();
    }
  }
}

console.log(`[tokens] watching ${TOKENS_DIR}`);

watch(TOKENS_DIR, { recursive: true }, (_, filename) => {
  if (filename?.endsWith('.json')) {
    console.log(`[tokens] changed: ${filename}`);
    rebuild();
  }
});
