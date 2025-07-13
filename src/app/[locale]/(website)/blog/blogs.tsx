import { Heading } from "@/src/app/[locale]/components/heading";
import { PageWrapper } from "@/src/app/[locale]/components/page-wrapper";
import { Paragraph } from "@/src/app/[locale]/components/paragraph";
import { Post } from "@/src/app/utils/interface";
import PostComponent from "@/src/app/[locale]/components/post-component";
import { NewsletterComponent } from "@/src/app/[locale]/components/newsletter-component";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Filters } from "./filters";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { InlineError } from "@/src/app/[locale]/components/inline-error";
import { LoadingAnimation } from "@/src/app/[locale]/components/loading-animation";
import { useLocale, useTranslations } from "next-intl";

const getBlogQuery = (category: string | null) => {
  const optionalCategoryFilter = "&& $category in (categories[]->slug.current)";
  return `*[_type == "post" && language == $language ${
    category ? optionalCategoryFilter : ""
  }] | order(pinned asc) {
title,
slug,
mainImage,
categories[]-> {
  _id,
  slug,
  'label': coalesce(title[$language], title.sl)
}
}`;
};

export default function Blogs() {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const params = useMemo(
    () => ({ category: selectedCategory, language: locale }),
    [selectedCategory]
  );
  const { data, error, isLoading } = useSanityData({
    query: getBlogQuery(selectedCategory),
    params,
  });

  const posts = (data || []) as Post[];

  return (
    <PageWrapper>
      <div className="flex flex-col pb-10 md:pb-20 md:px-16 gap-6 items-center">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src="/assets/blog-illustration.svg"
            width={100}
            height={100}
            alt="Blog illustration"
            className="w-[80px] md:w-[120px] lg:w-[160]"
          />
          <Heading size="lg" className="max-w-xl text-center">
            {t("title")}
          </Heading>
        </div>
        <Paragraph size="lg" className="max-w-xl text-center">
          {t("description_long")}
        </Paragraph>
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategoryAction={(category: string | null) =>
            setSelectedCategory(category)
          }
        />
      </div>
      {error || isLoading ? (
        <div className="w-full flex flex-col gap-6">
          <div className="self-center">
            {isLoading ? <LoadingAnimation /> : <InlineError />}
          </div>
          {/* Newsletter Component */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-10 md:py-20">
            <NewsletterComponent />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <div key={post.slug.current} className="col-span-1">
              <PostComponent post={post} />
            </div>
          ))}

          {/* Newsletter Component */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-10 md:py-20">
            <NewsletterComponent />
          </div>

          {/* Remaining Posts (4 to 10) */}
          {posts.slice(3).map((post) => (
            <div key={post.slug.current} className="col-span-1">
              <PostComponent post={post} />
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
