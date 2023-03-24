// Run with:
/* tsc src/utils/algolia.ts --esModuleInterop \
 && mv src/utils/algolia.js src/utils/algolia.cjs \
 && node src/utils/algolia.cjs */
import * as dotenv from "dotenv";
dotenv.config();
import algoliasearch from "algoliasearch";
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_WRITE_API_KEY!
);

// 1. Build records
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import RemoveMarkdown from "remove-markdown";

(async () => {
  const filenames = await fs.readdir(path.join("./src/content/blog"));
  const data = await Promise.all(
    filenames.map(async (filename) => {
      const markdownWithMeta = await fs.readFile(
        "./src/content/blog/" + filename
      );

      const { data: frontmatter, content } = matter(markdownWithMeta);
      console.log(frontmatter);
      return {
        objectID: filename.replace(/\.md$/, ""),
        title: frontmatter.title,
        content: RemoveMarkdown(content).replace(/\n/g, ""),
      };
    })
  );
  // 2. Send the records in JSON format
  const res = await client
    .initIndex("dev_blog")
    .saveObjects(JSON.parse(JSON.stringify(data)));
  console.log(res); //show the result
})();
