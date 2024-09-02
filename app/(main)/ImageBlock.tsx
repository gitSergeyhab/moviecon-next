"use client";

import { TitleText } from "@/shared/components/ui/text";
import { cn } from "@/shared/lib/utils/styles";
import { FC } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface IImageBlockProps {
  image: string;
  title: string;
  id: number;
}
export const ImageBlock: FC<IImageBlockProps> = ({ image, title }) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  return (
    <div className="w-full " ref={ref}>
      <TitleText
        className={cn(
          "text-center py-4 md:py-6 opacity-50",
          inView ? "animate-shadowsUp" : ""
        )}
      >
        {title}
      </TitleText>

      <Image
        src={`${image}.webp`}
        width={1145}
        height={700}
        alt={title}
        className={cn(
          "m-auto w-full text-center overflow-hidden rounded-lg shadow-2xl md:w-[90%]",
          "transition-opacity opacity-0 duration-1000 transform-gpu",
          inView ? "opacity-100 scale-100" : ""
        )}
      />
    </div>
  );
};
