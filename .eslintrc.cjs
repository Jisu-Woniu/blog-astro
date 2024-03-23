module.exports = {
  extends: [
    "plugin:astro/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:mdx/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist/", ".astro/", "node_modules/"],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following
      // configuration. It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        parserOptions: {
          project: "./tsconfig.json",
        },
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
        "@typescript-eslint/triple-slash-reference": 0,
      },
    },
    {
      files: ["*.md?(x)"],
      rules: {
        "no-unused-vars": "warn", // TODO: not sure how to fix this one for MDX
        "@typescript-eslint/no-unused-vars": "warn",
      },
    },
  ],
};
