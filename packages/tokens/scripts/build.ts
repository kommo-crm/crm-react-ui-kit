import { build } from '../config/style-dictionary.config.js';

build().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
