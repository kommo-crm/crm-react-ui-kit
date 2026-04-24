import { collectPrimitives } from '@/scripts/collectTokens';
import { setup } from '@/libs/writeFile';
import { generatePrimitives } from '@/libs/generatePrimitives';
import { createGenerators } from '@/shared/config';

(async () => {
  await setup();

  const collection = collectPrimitives();
  const primitiveCount = Object.keys(collection.flat).length;

  console.log('Generating design tokens...\n');
  console.log(`Primitives: ${primitiveCount}\n`);

  for (const generator of createGenerators(collection)) {
    await generatePrimitives(generator);
  }

  console.log('\nDone!');
})();
