import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2018,
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            "react-hooks": reactHooks,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            indent: ["warn", 4],
            "no-shadow": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-explicit-any": "off",
            "max-len": [
                "error",
                120,
                2,
                {
                    ignoreUrls: true,
                    ignoreComments: false,
                    ignoreRegExpLiterals: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ],
            quotes: "off",
            "object-curly-newline": "off",
            "arrow-body-style": "off",
            "comma-dangle": "off",
            "operator-linebreak": "off",
            "implicit-arrow-linebreak": "off",
        },
    },
    {
        ignores: ["dist/**", "node_modules/**", "legacy-comparison/**"],
    },
];
