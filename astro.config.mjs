import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import prismjsPlugin from "vite-plugin-prismjs";

import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
    rehypePlugins: [rehypeKatex],
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
    ],
  },
  // output: "server",
  // adapter: cloudflare(),
  integrations: [lit()],
});
