import critters from "astro-critters";
import mdx from "@astrojs/mdx";
import purgecss from "astro-purgecss";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkMermaid from "remark-mermaidjs";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import min from "astro-min";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm, remarkMermaid, remarkSmartypants, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            class: "anchor-link",
            ariaHidden: true,
            tabIndex: -1,
          },
          behavior: "append",
          content: {
            type: "text",
            value: "#",
          },
        },
      ],
      rehypeKatex,
    ],
  },
  vite: {
    css: {
      postcss: {
        plugins: [autoprefixer, postcssPresetEnv, cssnano],
      },
    },
  },
  integrations: [
    expressiveCode({
      themes: ["dark-plus", "light-plus"],
      styleOverrides: {
        codeFontFamily: "'Fira Code', monospace",
      },
    }),
    mdx(),
    critters({}),
    purgecss(),
    min(),
  ],
});
