import { Heading } from "@/app/components/heading";
import { PageWrapper } from "@/app/components/page-wrapper";
import { Paragraph } from "@/app/components/paragraph";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import PostComponent from "@/app/components/post-component";
import { NewsletterComponent } from "@/app/components/newsletter-component";
import Image from "next/image";

async function getPosts() {
  const query = `*[_type == "post" && pinned != true] {
  title,
  slug,
  mainImage,
  categories[]-> {
    _id,
    slug,
    title,
  }
}`;
  const data = await client.fetch(query);
  return data;
}

export async function getPinnedPosts() {
  const query = `*[_type == "post" && pinned] {
  title,
  slug,
  mainImage,
  categories[]-> {
    _id,
    slug,
    title,
  }
}`;
  const data = await client.fetch(query);
  return data;
}
export default async function Blogs() {
  const posts: Post[] = await getPosts();
  const pinnedPosts: Post[] = await getPinnedPosts();

  return (
    <PageWrapper>
      <div className="flex flex-col pb-10 md:pb-20 md:px-16 md:gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="/assets/blog-illustration.png"
            width={100}
            height={100}
            alt="Blog illustration"
            className="w-[80px] md:w-[120px] lg:w-[160]"
          />
          <Heading size="xl" className="max-w-xl text-center">
            {"Preberi naše članke"}
          </Heading>
        </div>
        <Paragraph size="lg" className="max-w-xl text-center">
          {
            "Preberi povzetke dogodkov, uporabne nasvete za iskanje službe, priprava na tehnični intervju, predlogi knjig in še več."
          }
        </Paragraph>
      </div>
      {/* First 3 posts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pinnedPosts.map((post) => (
          <div key={post.slug.current} className="col-span-1">
            <PostComponent post={post} />
          </div>
        ))}
      </div>

      {/* Newsletter Component */}
      <div className="py-10 md:py-20">
        <NewsletterComponent />
      </div>

      {/* Remaining Posts (4 to 10) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug.current} className="col-span-1">
            <PostComponent post={post} />
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
