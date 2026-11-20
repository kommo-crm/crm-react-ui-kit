import { build } from '../config/style-dictionary.config';

build().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
