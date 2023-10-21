import critters from "astro-critters";
import mdx from "@astrojs/mdx";
import prismjsPlugin from "vite-plugin-prismjs";
import purgecss from "astro-purgecss";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaidjs";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import { defineConfig } from "astro/config";
import type { RehypePlugin } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
    rehypePlugins: [
      rehypeMermaid as unknown as RehypePlugin,
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
    syntaxHighlight: "prism",
    shikiConfig: {
      theme: "light-plus",
    },
  },
  vite: {
    plugins: [
      prismjsPlugin({
        languages: ["clike", "csharp", "fsharp", "markup", "xml-doc", "bash"],
        plugins: [
          "line-numbers",
          "toolbar",
          "show-language",
          "copy-to-clipboard",
        ],
      }),
    ],
  },
  integrations: [mdx(), critters(), purgecss()],
});
