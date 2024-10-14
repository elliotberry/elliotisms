import js from "@eslint/js"
import noSecrets from "eslint-plugin-no-secrets"
import packageJson from "eslint-plugin-package-json/configs/recommended"
//import perfectionist from 'eslint-plugin-perfectionist'
import pluginSecurity from "eslint-plugin-security"
import is from "eslint-plugin-simple-import-sort"
import sonarjs from "eslint-plugin-sonarjs"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import importPlugin from "eslint-plugin-import"
export default [
  eslintPluginUnicorn.configs["flat/recommended"],

  js.configs.recommended,
  pluginSecurity.configs.recommended,
  sonarjs.configs.recommended,
  packageJson,
  importPlugin.flatConfigs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        clearTimeout: "readonly",
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
        setTimeout: "readonly",
        timeOut: "readonly"
      },
      sourceType: "module"
    },
    plugins: {
      "no-secrets": noSecrets,
      "simple-import-sort": is
    },

    rules: {
      "no-console": "off",
      "no-secrets/no-secrets": "error",
      "no-unused-vars": "warn",

      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
      "unicorn/consistent-function-scoping": "warn",
      "unicorn/no-array-callback-reference": "warn",
      "unicorn/no-null": "warn",
      "unicorn/no-process-exit": "off",
      "unicorn/prefer-switch": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": "warn"
    }
  }
]
