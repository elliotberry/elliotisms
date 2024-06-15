import pluginImport from "eslint-plugin-import"
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural"
import is from "eslint-plugin-simple-import-sort"
import eslintPluginUnicorn from "eslint-plugin-unicorn"

export default [
  eslintPluginUnicorn.configs["flat/recommended"],
  perfectionistNatural,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module"
    },
    plugins: {
      import: pluginImport,
      pluginImport,
      "simple-import-sort": is
    },

    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
      "unicorn/no-null": "warn",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": "warn",
      "unicorn/consistent-function-scoping": "warn",
      "unicorn/no-array-callback-reference": "warn",
      "unicorn/no-process-exit": "off",
      "perfectionist/sort-imports": "warn",
      "perfectionist/sort-objects": "warn"
    }
  }
]
