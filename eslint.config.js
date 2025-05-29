import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astroEslintParser from 'eslint-plugin-astro';

export default [
  // Ignore files
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.astro/**',
      'public/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'package-lock.json'
    ]
  },
  
  // Base JavaScript configuration
  js.configs.recommended,
  
  // JavaScript and TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  },
  
  // API files - allow console statements
  {
    files: ['**/api/**/*.js'],
    rules: {
      'no-console': 'off'
    }
  },
  
  // TypeScript specific configuration
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },
  
  // Astro files configuration
  ...astroEslintParser.configs.recommended,
  {
    files: ['**/*.astro'],
    rules: {
      // Add any specific Astro rules here if needed
    }
  },
  
  // Specific overrides for generated files
  {
    files: ['.astro/**/*.ts', '.astro/**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];
