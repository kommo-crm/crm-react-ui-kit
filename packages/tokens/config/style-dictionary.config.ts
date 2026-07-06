import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
  renameSync,
  existsSync,
  statSync,
} from 'node:fs';

import StyleDictionary from 'style-dictionary';

import config from '../tokens.config';
import { jsNestedFormat } from '../formats/js-nested';
import { cssMinifiedFormat } from '../formats/css-minified';
import { dtsFormat } from '../formats/dts-generator';

import { deepMerge, detectCollisions } from '../utils/deep-merge';

import { validateCssContract } from './validate-contract';

StyleDictionary.registerFormat(jsNestedFormat);
StyleDictionary.registerFormat(cssMinifiedFormat);
StyleDictionary.registerFormat(dtsFormat);

const { themes } = config;

function getJsonFiles(dir: string): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = `${dir}/${entry.name}`;

    if (entry.isDirectory()) {
      results.push(...getJsonFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      results.push(fullPath);
    }
  }

  return results;
}

function buildPrimitives(root: string): StyleDictionary {
  const prefix = '';

  return new StyleDictionary({
    source: ['tokens/primitives/**/*.json'],
    platforms: {
      'css-min': {
        transformGroup: 'css',
        prefix,
        buildPath: `${root}/css/`,
        files: [
          {
            destination: 'primitives.min.css',
            format: 'custom/css-minified',
            options: { selector: ':root', prefix },
          },
        ],
      },
      'scss': {
        transformGroup: 'scss',
        prefix,
        buildPath: `${root}/scss/`,
        files: [{ destination: '_primitives.scss', format: 'scss/variables' }],
      },
      'less': {
        transformGroup: 'less',
        prefix,
        buildPath: `${root}/less/`,
        files: [{ destination: '_primitives.less', format: 'less/variables' }],
      },
      'js': {
        transformGroup: 'js',
        prefix,
        buildPath: `${root}/js/`,
        files: [
          {
            destination: 'primitives.js',
            format: 'custom/js-nested',
            options: { prefix },
          },
          {
            destination: 'primitives.d.ts',
            format: 'custom/typescript-declarations',
            options: { prefix },
          },
        ],
      },
    },
  });
}

interface BuildThemeOptions {
  root: string;
  name: string;
  source: string;
  selector: string;
  prefix?: string;
}

function buildTheme({
  root,
  name,
  source,
  selector,
  prefix = '',
}: BuildThemeOptions): StyleDictionary {
  const semanticFilter = (token: { filePath: string }) =>
    token.filePath.includes(`semantic/${name}`);

  return new StyleDictionary({
    source: ['tokens/primitives/**/*.json', source],
    platforms: {
      'css-min': {
        transformGroup: 'css',
        prefix,
        buildPath: `${root}/css/semantic/`,
        files: [
          {
            destination: `${name}.min.css`,
            format: 'custom/css-minified',
            options: { selector, prefix },
            filter: semanticFilter,
          },
        ],
      },
      'scss': {
        transformGroup: 'scss',
        prefix,
        buildPath: `${root}/scss/semantic/`,
        files: [
          {
            destination: `_${name}.scss`,
            format: 'scss/variables',
            filter: semanticFilter,
          },
        ],
      },
      'less': {
        transformGroup: 'less',
        prefix,
        buildPath: `${root}/less/semantic/`,
        files: [
          {
            destination: `_${name}.less`,
            format: 'less/variables',
            filter: semanticFilter,
          },
        ],
      },
      'js': {
        transformGroup: 'js',
        prefix,
        buildPath: `${root}/js/semantic/`,
        files: [
          {
            destination: `${name}.js`,
            format: 'custom/js-nested',
            options: { prefix },
            filter: semanticFilter,
          },
          {
            destination: `${name}.d.ts`,
            format: 'custom/typescript-declarations',
            options: { prefix },
            filter: semanticFilter,
          },
        ],
      },
    },
  });
}

function buildMergedJson(root: string): void {
  const primitiveFiles = getJsonFiles('tokens/primitives');
  const semanticFiles = Object.values(themes).map((t) => t.source);

  const merged: Record<string, unknown> = {};

  for (const file of [...primitiveFiles, ...semanticFiles]) {
    const content = JSON.parse(readFileSync(file, 'utf8')) as Record<
      string,
      unknown
    >;

    const collisions = detectCollisions(merged, content);

    if (collisions.length > 0) {
      throw new Error(
        `Token collision while merging "${file}": ` +
          `${collisions.join(', ')} already defined by an earlier token file`
      );
    }

    deepMerge(merged, content);
  }

  mkdirSync(root, { recursive: true });
  writeFileSync(`${root}/tokens.json`, JSON.stringify(merged, null, 2));
}

function buildIndex(root: string): void {
  const content = [
    '// Auto-generated by @kommo-crm/crm-tokens. Do not edit manually.',
    "export * from './primitives.js';",
    "export { default } from './primitives.js';",
  ].join('\n');

  writeFileSync(`${root}/js/index.js`, content);
  writeFileSync(`${root}/js/index.d.ts`, content);
}

// Leftover dirs younger than this may belong to a concurrent in-flight build
// (e.g. `turbo watch` + a manual `yarn build`), so we leave them untouched.
const STALE_BUILD_DIR_MS = 60 * 60 * 1000;

function cleanupStaleBuildDirs(): void {
  const now = Date.now();

  for (const entry of readdirSync('.', { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^dist\.(tmp|old)-/.test(entry.name)) {
      continue;
    }

    if (now - statSync(entry.name).mtimeMs < STALE_BUILD_DIR_MS) {
      continue;
    }

    rmSync(entry.name, { recursive: true, force: true });
  }
}

export async function build(): Promise<void> {
  cleanupStaleBuildDirs();

  const tmpRoot = `dist.tmp-${process.pid}-${Date.now()}`;

  try {
    await buildPrimitives(tmpRoot).buildAllPlatforms();

    if (config.requiredTokens !== undefined) {
      validateCssContract(
        `${tmpRoot}/css/primitives.min.css`,
        config.requiredTokens
      );
    }

    for (const [name, { source, selector, prefix }] of Object.entries(themes)) {
      await buildTheme({
        root: tmpRoot,
        name,
        source,
        selector,
        prefix,
      }).buildAllPlatforms();
    }

    buildMergedJson(tmpRoot);
    buildIndex(tmpRoot);
  } catch (err) {
    rmSync(tmpRoot, { recursive: true, force: true });
    throw err;
  }

  const oldRoot = `dist.old-${process.pid}-${Date.now()}`;
  const hadOldDist = existsSync('dist');

  if (hadOldDist) {
    renameSync('dist', oldRoot);
  }

  try {
    renameSync(tmpRoot, 'dist');
  } catch (err) {
    if (hadOldDist) {
      try {
        renameSync(oldRoot, 'dist');
      } catch (restoreErr) {
        console.error(
          `Failed to restore previous dist from ${oldRoot} after a failed build swap:`,
          restoreErr
        );
        throw restoreErr;
      }
    }

    throw err;
  }

  if (hadOldDist) {
    rmSync(oldRoot, { recursive: true, force: true });
  }
}
