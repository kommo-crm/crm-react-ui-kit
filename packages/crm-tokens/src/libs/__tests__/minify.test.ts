import { minify } from '@/libs/minify';

describe('minify', () => {
  it('removes CSS comments', () => {
    expect(minify('/* comment */ .a { color: red; }')).toBe('.a{color:red;}');
  });

  it('collapses whitespace around braces, colons and semicolons', () => {
    expect(minify(':root {\n  --color: #fff;\n}')).toBe(':root{--color:#fff;}');
  });

  it('trims leading and trailing whitespace', () => {
    expect(minify('  .a { color: red; }  ')).toBe('.a{color:red;}');
  });

  it('handles already-minified input without change', () => {
    expect(minify('.a{color:red;}')).toBe('.a{color:red;}');
  });
});
