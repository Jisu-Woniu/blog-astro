import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import prismjsPlugin from "vite-plugin-prismjs";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
// astro-purgecss issue: https://github.com/codiume/orbit/issues/312
import purgecss from "astro-purgecss";
import remarkMermaid from "remark-mermaidjs";
import critters from "astro-critters";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath, remarkMermaid],
    rehypePlugins: [
      // rehypeMermaid,
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
      ,
    ],
  },
  integrations: [mdx(), critters(), purgecss()],
});
