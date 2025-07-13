import React from "react";
import { Post } from "../../utils/interface";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import Image from "next/image";
import imageLoader from "../../utils/image-loader";
import { Link, linkBase } from "./link";
import { useTranslations } from "next-intl";

interface LinkDivProps {
  /**
   * Sets the style variant of the link element
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}
export function LinkDiv({ children, variant = "primary" }: LinkDivProps) {
  return (
    <div
      className={`${linkBase({ variant })} underline-animation group-hover:after:w-full`}
    >
      {children}
    </div>
  );
}
interface Props {
  post: Post;
}
const PostComponent = ({ post }: Props) => {
  const t = useTranslations("Blog");
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
              alt={post.mainImage.alt || "Placeholder alt"}
              className="w-full object-cover aspect-square rounded-2xl"
            />
            <div className="flex gap-2">
              {post.categories.map((category) => (
                <Paragraph
                  key={category.label}
                  size="xs"
                  className="py-1 px-2 text-white font-semibold bg-pink border border-black rounded-lg"
                >
                  {category.label}
                </Paragraph>
              ))}
            </div>
            <Heading size="xs">{post.title}</Heading>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <LinkDiv variant="secondary">{t("cta_blog_post")}</LinkDiv>
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
