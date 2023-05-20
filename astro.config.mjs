import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import prismjsPlugin from "vite-plugin-prismjs";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
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
          content: { type: "text", value: "#" },
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
        languages: ["clike", "csharp", "fsharp"],
        plugins: ["line-numbers", "toolbar", "copy-to-clipboard"],
      }),
      ,
    ],
  },
  integrations: [purgecss()],
});
