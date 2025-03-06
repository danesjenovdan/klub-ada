"use client";
import React from "react";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import Image from "next/image";
import { Link } from "./link";

export default function EventSkeleton() {
  return (
    <div className="bg-gray-300 animate-pulse rounded-2xl h-[440px] md:h-[424px]" />
  );
}
