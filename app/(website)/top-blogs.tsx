import { Heading } from "../components/heading";
import { LinkButton } from "../components/link-button";
import { PageWrapper } from "../components/page-wrapper";
import PostComponent from "../components/post-component";
import { Post } from "../utils/interface";
import { getPinnedPosts } from "./blog/blogs";

export async function TopBlogs() {
  const pinnedPosts: Post[] = await getPinnedPosts();

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

        <div className="flex flex-col md:flex-row md:flex-nowrap gap-4">
          {pinnedPosts.map((post) => (
            <div key={post.slug.current} className="basis-1/3">
              <PostComponent post={post} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
