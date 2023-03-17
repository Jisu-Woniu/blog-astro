import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import prismjsPlugin from "vite-plugin-prismjs";
// import PurgeCSS from "vite-plugin-purgecss";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import purgecss from "astro-purgecss";
import prefetch from "@astrojs/prefetch";

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
        languages: ["html"],
        // "all",
        plugins: ["line-numbers", "toolbar", "copy-to-clipboard"],
      }),
      // PurgeCSS({
      //   safelist: {
      //     standard: [/code/, /toolbar/, /line-numbers/],
      //     deep: [/button/],
      //   },
      // }),
    ],
  },
  // output: "server",
  // adapter: cloudflare(),
  integrations: [prefetch(), purgecss()],
});
