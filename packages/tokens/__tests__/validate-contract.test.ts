import { readFileSync } from 'node:fs';
import { extractCssVars, validateCssContract } from '../config/validate-contract';

jest.mock('node:fs');

const mockReadFileSync = readFileSync as jest.MockedFunction<typeof readFileSync>;

const CSS = ':root{--color-blue-500:#4c8bf7;--color-neutral-50:#fff}';

beforeEach(() => {
  mockReadFileSync.mockReturnValue(CSS as any);
});

describe('extractCssVars', () => {
  it('extracts all css variable names', () => {
    expect(extractCssVars(CSS)).toEqual(['--color-blue-500', '--color-neutral-50']);
  });

  it('deduplicates repeated vars', () => {
    const css = ':root{--foo:#000;--foo:#fff}';
    expect(extractCssVars(css)).toEqual(['--foo']);
  });

  it('returns empty array for css without vars', () => {
    expect(extractCssVars('body { margin: 0 }')).toEqual([]);
  });
});

describe('validateCssContract', () => {
  it('passes when required vars match css exactly', () => {
    expect(() =>
      validateCssContract('any.css', ['--color-blue-500', '--color-neutral-50'])
    ).not.toThrow();
  });

  it('throws on missing required var', () => {
    expect(() =>
      validateCssContract('any.css', ['--color-blue-500', '--color-red-500'])
    ).toThrow('Missing required CSS variables');
  });

  it('throws on unregistered var in css', () => {
    expect(() =>
      validateCssContract('any.css', ['--color-blue-500'])
    ).toThrow('Unregistered CSS variables');
  });

  it('error message lists both missing and unregistered', () => {
    expect(() =>
      validateCssContract('any.css', ['--color-blue-500', '--color-missing-999'])
    ).toThrow('Token contract violation');
  });

  it('error message contains variable names', () => {
    expect(() =>
      validateCssContract('any.css', ['--color-missing-999'])
    ).toThrow('--color-missing-999');
  });
});
