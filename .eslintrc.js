'use strict';

module.exports = {
   // Currently ESLint requires shared config packages to be prefixed with `eslint-config`
   // to be resolved. Since we re using a shared config in a standards mono-repo, we have
   // to use the full relative file path.
   extends: [ './node_modules/@creativepenguin/standards/eslint/node.js' ],
   rules: {
      'new-cap': 'off',
      'no-process-env': 'off',
      'no-console': 'off',
   },
   overrides: {
      files: [ '*.d.ts' ],
      rules: {
         'no-shadow': 'off',
         '@typescript-eslint/no-unused-vars': 'off',
         '@typescript-eslint/explicit-member-accessibility': 'off',
      },
   },
};
