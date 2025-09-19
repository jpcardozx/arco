// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// Simplified ESLint config for Next.js 15
export default [{
  ignores: ['**/*'],
}, ...storybook.configs["flat/recommended"]];
