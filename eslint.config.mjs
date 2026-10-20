// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    rules: {
      // 1. SILENCIA O PRETTIER (Aspas, espaços, ponto e vírgula)
      // Em vez de "error", mudamos para "off" para ele parar de marcar seu código de vermelho
      "prettier/prettier": "off",

      // 2. PERMITE ASYNC SEM AWAIT
      // Isso remove o erro: "Async method has no await expression"
      '@typescript-eslint/require-await': 'off',

      // 3. PERMITE VARIÁVEIS NÃO USADAS
      // Útil quando você declara o "params" mas ainda não o usou no return
      '@typescript-eslint/no-unused-vars': 'off',

      // 4. MANTÉM OS OUTROS QUE JÁ TINHAMOS AJUSTADO
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  /* {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  }, */
);
