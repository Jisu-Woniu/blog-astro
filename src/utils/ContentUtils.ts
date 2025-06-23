import { getCollection } from "astro:content";

const getSortedBlogCollection = () =>
  getCollection("blog").then((collection) =>
    collection.sort(
      (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
    ),
  );
export { getSortedBlogCollection };
