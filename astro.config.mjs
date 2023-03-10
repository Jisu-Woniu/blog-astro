import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm, remarkSmartypants, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  output: "server",
  adapter: cloudflare(),
});
