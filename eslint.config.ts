import { browser } from "globals"
import { defineConfig } from "eslint/config"
import importPlugin from "eslint-plugin-import"
import js from "@eslint/js"
import next from "@next/eslint-plugin-next"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import stylistic from "@stylistic/eslint-plugin"
import tseslint from "typescript-eslint"

import type { Linter } from "eslint"

const stylisticConfig = stylistic.configs.customize({
  indent: 2,
  quotes: "double",
})

const stylisticRulesAsWarnings: Record<string, Linter.RuleEntry>
  = Object.entries(stylisticConfig.rules || {}).reduce(
    (acc, [ruleName, ruleConfig]) => {
      if (Array.isArray(ruleConfig)) {
        // Rule has configuration options: ["error", { options }] -> ["warn", { options }]
        acc[ruleName] = ["warn", ...ruleConfig.slice(1)]
      }
      else {
        // Rule is just a severity level: "error" -> "warn"
        acc[ruleName] = "warn"
      }

      return acc
    },
    {} as Record<string, Linter.RuleEntry>,
  )

export default defineConfig([
  {
    ignores: [
      "**/dist/**",
      "node_modules/**",
      "__registry__/index.tsx",
      "apps/docs/.next/**",
      "apps/docs/.source/**",
      "apps/docs/next-env.d.ts",
    ],
  },
  {
    extends: [
      importPlugin.flatConfigs.recommended,
      js.configs.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs["recommended-latest"],
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}", "apps/docs/**/*.{ts,tsx}"],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      globals: {
        ...browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      // @ts-expect-error: @next/eslint-plugin-next doesn’t export types correctly
      "@next/next": next.flatConfig.recommended.plugins["@next/next"],
      react,
      "@stylistic": stylistic,
    },
    // @ts-expect-error: @next/eslint-plugin-next doesn’t export types correctly
    rules: {
      ...stylisticRulesAsWarnings,
      ...next.flatConfig.coreWebVitals.rules,
      ...next.flatConfig.recommended.rules,
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
])
