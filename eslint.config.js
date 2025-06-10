import { Linter } from "eslint";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals.js";

/** @type {Linter.FlatConfig[]} */
const config = [
  nextCoreWebVitals,
  {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react-hooks", "import", "react"],
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    globals: {
      React: "writable",
      JSX: "writable",
      document: "writable",
      window: "writable",
      navigator: "writable",
      localStorage: "writable",
      setTimeout: "writable",
      clearTimeout: "writable",
      setInterval: "writable",
      clearInterval: "writable",
      HTMLElement: "writable",
      HTMLDivElement: "writable",
      HTMLButtonElement: "writable",
      HTMLInputElement: "writable",
      HTMLTextAreaElement: "writable",
      HTMLSelectElement: "writable",
      HTMLSpanElement: "writable",
      HTMLHeadingElement: "writable",
      HTMLParagraphElement: "writable",
      HTMLAnchorElement: "writable",
      CustomEvent: "writable",
      Event: "writable",
      SVGSVGElement: "writable",
      MutationObserver: "writable",
      URL: "writable",
      URLSearchParams: "writable",
      Blob: "writable",
      fetch: "writable",
      performance: "writable",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "import/order": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "no-useless-escape": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "never",
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-pascal-case": "error",
      "react/hook-use-state": "warn",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error", "info"],
        },
      ],
      "prefer-const": "error",
      "spaced-comment": ["error", "always"],
      "no-undef": "warn",
    },
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "public/",
      "*.config.js",
      "*.config.mjs",
      "next.config.mjs",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
      "eslint-fix-scripts/**/*.js",
      "fix-eslint*.js",
    ],
  },
];

export default config;
