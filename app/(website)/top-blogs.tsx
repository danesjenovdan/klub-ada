"use client";

import { Heading } from "../components/heading";
import { LinkButton } from "../components/link-button";
import { PageWrapper } from "../components/page-wrapper";
import PostComponent from "../components/post-component";
import { Post } from "../utils/interface";
import { client } from "@/sanity/lib/client";
import { useSanityData } from "../utils/use-sanity-data";
import { InlineError } from "../components/inline-error";
import EventSkeleton from "../components/event-skeleton";

const PINNED_POSTS_QUERY = `*[_type == "post" && pinned] {
  title,
  slug,
  mainImage,
  categories[]-> {
    _id,
    slug,
    title,
  }
}`;

export function TopBlogs() {
  const { data, error, isLoading } = useSanityData({
    query: PINNED_POSTS_QUERY,
  });

  const pinnedPosts = (data || []) as Post[];

  return (
    <PageWrapper bgColor="bg-pink">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="max-w-sm md:max-w-2xl">
            <Heading size="lg">Najnovejše objave</Heading>
          </div>
          <div className="">
            <LinkButton
              size="md"
              variant="secondary"
              href="
            /blog"
            >
              Preberi naš blog
            </LinkButton>
          </div>
        </div>

        {error ? (
          <div className="w-full flex justify-center">
            <InlineError hasBox />
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EventSkeleton />
                <EventSkeleton />
                <EventSkeleton />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:flex-nowrap gap-4">
                {pinnedPosts.map((post) => (
                  <div key={post.slug.current} className="basis-1/3">
                    <PostComponent post={post} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageWrapper>
  );
}
