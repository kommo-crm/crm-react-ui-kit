import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssSelectorReplace from 'postcss-selector-replace';

export default {
  plugins: [
    postcssImport,
    postcssNested,
    postcssCustomProperties,
    postcssSelectorReplace({ before: [/{{emptyValue}}/g], after: [''] }),
  ],
};
