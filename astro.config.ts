import mdx from "@astrojs/mdx";
import critters from "@critters-rs/astro";
import expressiveCode from "astro-expressive-code";
import min from "astro-min";
import purgecss from "astro-purgecss";
import { defineConfig } from "astro/config";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssPresetEnv from "postcss-preset-env";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkGfm,
      // remarkMermaid,
      remarkSmartypants as never,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeMermaid,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            class: "anchor-link",
            ariaHidden: "true",
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
