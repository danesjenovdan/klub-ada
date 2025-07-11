"use client";

import { Footer } from "@/src/app/components/footer";
import { Paragraph } from "@/src/app/components/paragraph";
import imageLoader from "@/src/app/utils/image-loader";
import Image from "next/image";
import { Heading } from "@/src/app/components/heading";
import { PageWrapper } from "@/src/app/components/page-wrapper";
import { Post } from "@/src/app/utils/interface";
import { PortableText, PortableTextComponents } from "next-sanity";
import React, { useMemo } from "react";
import { formatDate } from "@/src/app/utils/date";
import { useParams } from "next/navigation";
import { useSanityData } from "@/src/app/utils/use-sanity-data";
import { LoadingAnimation } from "@/src/app/components/loading-animation";
import { InlineError } from "@/src/app/components/inline-error";

const GET_BLOG_POST = `*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  publishedAt,
  mainImage,
  _id,
  body,
  categories[]-> {
    _id,
    slug,
    title,
  }
}`;

// Blog Article Component
const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const params = useMemo(() => ({ slug }), []);
  const { data, error, isLoading } = useSanityData({
    query: GET_BLOG_POST,
    params,
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full p-6 justify-center">
        <InlineError />
      </div>
    );
  }

  const post = data as Post | null;
  const imageSrc = imageLoader(post?.mainImage);
  const formattedDate = post?.publishedAt ? formatDate(post.publishedAt) : "";

  const portableTextComponents: Partial<PortableTextComponents> = {
    block: {
      h1: ({ children }) => (
        <Heading
          size="md"
          color="black"
          textAlign="left"
          className="mt-12 mb-2"
        >
          {children}
        </Heading>
      ),
      h2: ({ children }) => (
        <Paragraph
          size="xxl"
          color="black"
          weight="bold"
          textAlign="left"
          className="mt-8 mb-2"
        >
          {children}
        </Paragraph>
      ),
      h3: ({ children }) => (
        <Paragraph
          size="xl"
          color="pink"
          weight="bold"
          textAlign="left"
          className="mt-6 mb-2"
        >
          {children}
        </Paragraph>
      ),
      body: ({ children }) => (
        <Paragraph size="lg" color="black" textAlign="left" className="mb-6">
          {children}
        </Paragraph>
      ),
      bodyLg: ({ children }) => (
        <Paragraph size="xl" color="black" textAlign="left" className="mb-6">
          {children}
        </Paragraph>
      ),
      normal: ({ children }) => (
        <Paragraph size="lg" color="black" textAlign="left" className="mb-6">
          {children}
        </Paragraph>
      ),
      blockquote: ({ children }) => (
        <Paragraph
          size="lg"
          className="pl-4 border-l-4 border-pink italic text-gray-500 my-8"
        >
          {children}
        </Paragraph>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-4 [&_p]:mb-1">{children}</ul>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-gray-900">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-600">{children}</em>
      ),
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black text-lg underline underline-offset-2 font-bold hover:text-pink"
          style={{ textDecorationColor: "pink" }}
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        if (!value) {
          return null;
        }
        return (
          <div className="my-4">
            <Image
              src={imageLoader(value)}
              alt={value.alt || "Placeholder alt"}
              width={700}
              height={384}
              className="w-full object-cover max-h-96 rounded-2xl border border-black my-10"
            />
          </div>
        );
      },
    },
  };

  return (
    <>
      <PageWrapper hasNoTopPadding>
        <div className="max-w-3xl mx-auto md:p-6 gap-10 pt-8 md:pt-16">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {(post?.categories || []).map((category) => (
                <Paragraph
                  size="xs"
                  className="py-1 px-2 text-white font-semibold bg-pink border border-black rounded-lg"
                  key={category.title}
                >
                  {category.title}
                </Paragraph>
              ))}
            </div>

            <Heading size="lg" color="black">
              {post?.title}
            </Heading>
            <Paragraph size="lg">{formattedDate}</Paragraph>
            <Image
              src={imageSrc}
              width={700}
              height={384}
              alt={post?.mainImage.alt || "Placeholder alt"}
              className="w-full object-cover max-h-96 rounded-2xl border border-black mb-6"
            />
          </div>
          <PortableText
            value={post?.body}
            components={portableTextComponents}
          />
        </div>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default BlogArticle;
