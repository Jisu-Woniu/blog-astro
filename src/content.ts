import type { GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

export const getStaticPaths = (async () => {
  const blogEntries = await getCollection("blog");
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}) satisfies GetStaticPaths;

export type SlugProps = InferGetStaticPropsType<typeof getStaticPaths>;
export type IFrontmatter = SlugProps["entry"]["data"];
