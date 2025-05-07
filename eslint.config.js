import eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactNativePlugin from "eslint-plugin-react-native";
import importPlugin from "eslint-plugin-import";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			globals: {
				// Browser globals
				window: "readonly",
				document: "readonly",
				navigator: "readonly",
				console: "readonly",
				// Jest globals
				jest: "readonly",
				describe: "readonly",
				it: "readonly",
				expect: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly",
				beforeAll: "readonly",
				afterAll: "readonly",
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: "detect",
			},
			"import/resolver": {
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"],
				},
				typescript: {},
			},
		},
		plugins: {
			react: reactPlugin,
			"react-hooks": reactHooksPlugin,
			"react-native": reactNativePlugin,
			import: importPlugin,
			"unused-imports": unusedImportsPlugin,
		},
		rules: {
			// Prevent usage of console logs in production (except warn and error)
			"no-console": ["error", { allow: ["warn", "error", "info"] }],

			// Prevent usage of any type
			"@typescript-eslint/no-explicit-any": "error",

			// Require explicit return types on functions and class methods
			"@typescript-eslint/explicit-function-return-type": "off",

			// Unused imports and variables
			"unused-imports/no-unused-imports": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],

			// React Native specific rules
			"react-native/no-unused-styles": "error",
			"react-native/split-platform-components": "error",
			"react-native/no-inline-styles": "error",
			"react-native/no-color-literals": "warn",
			"react-native/no-raw-text": [
				"off",
				{
					skip: ["ThemedText", "Text", "H1", "H2", "H3", "H4", "P"],
				},
			],
			"react-native/no-single-element-style-arrays": "error",

			// React hooks rules
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			// Sorted import order
			"import/order": [
				"error",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
					],
				},
			],

			// React props validation
			"react/prop-types": "off", // We're using TypeScript for prop validation

			// React specific rules
			"react/self-closing-comp": "error",
			"react/jsx-curly-brace-presence": [
				"error",
				{ props: "never", children: "never" },
			],
			"react/jsx-boolean-value": ["error", "never"],
		},
	},
	// Override rules for specific file patterns
	{
		files: ["**/*.js"],
		rules: {
			"@typescript-eslint/no-var-requires": "off",
		},
	},
	{
		files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
		languageOptions: {
			globals: {
				jest: "readonly",
				describe: "readonly",
				it: "readonly",
				expect: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly",
			},
		},
	},
	{
		ignores: [
			"node_modules/",
			"dist/",
			"build/",
			"coverage/",
			".expo/",
			".vscode/",
			"app-example/",
		],
	}
);
