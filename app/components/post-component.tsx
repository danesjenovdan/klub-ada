import React from "react";
import { Post } from "../utils/interface";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import Image from "next/image";
import imageLoader from "../utils/image-loader";
import { Link } from "./link";

interface Props {
  post: Post;
}
const PostComponent = ({ post }: Props) => {
  const imageSrc = imageLoader(post.mainImage);

  return (
    <Link href={`/blog/${post.slug.current}`} className="block h-full group">
      <div className="flex flex-col bg-white gap-6 border border-black rounded-2xl p-4 lg:p-6 h-full justify-between ${className}">
        <div className="flex flex-col h-full justify-between gap-4">
          <div className="flex flex-col gap-4">
            <Image
              src={imageSrc}
              width={500}
              height={500}
              alt={post.mainImage.alt}
              className="w-full object-cover aspect-square rounded-2xl"
            />
            <div className="flex gap-2">
              {post.categories.map((category) => (
                <Paragraph
                  size="xs"
                  className="py-1 px-2 text-white font-semibold bg-pink border border-black rounded-lg"
                >
                  {category.title}
                </Paragraph>
              ))}
            </div>
            <Heading size="xs" lineHeight="tight">
              {post.title}
            </Heading>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Link variant="secondary" href={`/blog/${post.slug.current}`}>
                Preberi blog
              </Link>
            </div>
            <Image
              src="/assets/chevron-right.svg"
              width={24}
              height={24}
              alt="Chevron right illustration"
              className="cover-image"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostComponent;
