import Contentful from "@lib/Contentful";
import Streamers from "@lib/Streamers";
import StreamersGrid from "@components/StreamersGrid";
import MainLayout from "@components/MainLayout";
import { NextSeo } from "next-seo";

export default function Tag({ streamers, tag, tags }) {
  return (
    <>
      <NextSeo
        title={`${tag.name}`}
        description={`You are viewing ${tag.name} streamers. Women Who Stream Tech is a directory of Twitch tech streamers who identify as women.`}
      />
      <main>
        <MainLayout tags={tags} selectedTag={tag}>
          <StreamersGrid streamers={streamers} />
        </MainLayout>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const tags = await Contentful.getTags();

  const paths = tags.map((tag) => {
    return { params: { tag: tag.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const streamers = await Streamers.getByTag(params.tag);
  const tag = await Contentful.getTagBySlug(params.tag);
  const tags = await Contentful.getTags();

  return {
    props: {
      streamers,
      tag,
      tags,
    },
    revalidate: 5,
  };
}
