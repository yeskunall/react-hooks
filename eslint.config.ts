import { browser } from "globals"
import { defineConfig } from "eslint/config"
import importPlugin from "eslint-plugin-import"
import js from "@eslint/js"
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

export default defineConfig(
  { ignores: ["**/dist/**"] },
  {
    extends: [
      importPlugin.flatConfigs.recommended,
      js.configs.recommended,
      react.configs.flat["jsx-runtime"],
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
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
      react,
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
    },
    rules: {
      ...stylisticRulesAsWarnings,
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
)
