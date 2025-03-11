import { getCollection } from "astro:content";
import type { GetStaticPaths, InferGetStaticPropsType } from "astro";

export const getStaticPaths = (async () =>
  (await getCollection("blog")).map((post) => ({
    params: { id: post.id },
    props: { post },
  }))) satisfies GetStaticPaths;

export type SlugProps = InferGetStaticPropsType<typeof getStaticPaths>;
export type IFrontmatter = SlugProps["post"]["data"];
