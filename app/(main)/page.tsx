"use client";
import { cn } from "@/shared/lib/utils/styles";
import {
  PrimaryHeader,
  PrimaryText,
  SecondaryText,
} from "../../shared/components/ui/text";
import { features } from "./const";
import { FeatureListItem } from "./FeatureListItem";
import { ImagesSection } from "./ImagesSection";
import { MainTableSection } from "./MainTablesSection";
import { StartLink } from "./StartLink";
import { useFetchUser } from "@/shared/hooks/useFetchUser";

export default function MainPage() {
  useFetchUser();
  return (
    <div className="bg-neutral-200/30 dark:bg-neutral-800/30 flex flex-wrap max-w-[1400px] mx-auto p-8 pb-12 px-2 rounded-lg gap-4 md:p-16 sm:pb-16">
      <div className="w-full col-span-2 rounded-lg">
        <div className="flex justify-center">
          <div
            className={cn(
              "border-neutral-800 dark:border-neutral-200 p-8 border-4 min-w-min",
              "drop-shadow-[0_1px_4px_rgb(0,0,0)] dark:drop-shadow-[0_4px_4px_rgb(200,200,200)]",
              "animate-blink"
            )}
          >
            <PrimaryHeader
              className="
              dark:drop-shadow-[0_1px_4px_rgb(0,0,0)] drop-shadow-[0_4px_4px_rgb(250,250,250)]
              text-center uppercase text-4xl sm:text-6xl font-bold md:text-8xl"
            >
              MovieCon
            </PrimaryHeader>
          </div>
        </div>
        <PrimaryText className="mt-8 font-bold text-center text-3xl md:mt-16 md:text-5xl">
          Добро пожаловать в мир кино!
        </PrimaryText>
        <div
          className={cn(
            "border-neutral-800  dark:border-neutral-200 border-8  aspect-[3/2] w-full mt-8 md:mt-16  rounded-xl",
            "bg-[url('/img/sd/main-pic-tablet.webp')] md:bg-[url('/img/sd/main-pic.webp')] bg-cover bg-no-repeat bg-center",
            "animate-gettingDark"
          )}
        />
        <section className="bg-neutral-200/80 dark:bg-neutral-800/80 mt-8 p-4 sm:p-8 rounded-md ">
          <h2 className="hidden">описание игры</h2>
          <SecondaryText className="indent-8 text-justify mt-2 text-lg md:text-xl lg:text-2xl">
            Испытайте свои знания кино в нашей увлекательной игре. Здесь вы
            сможете проверить, насколько хорошо вы знаете актеров и фильмы,
            вспомнить любимые сцены и испытать свою память на прочность.
            Соревнуйтесь с друзьями или играйте в одиночку, чтобы узнать новое и
            получить удовольствие. Вас ждет множество интересных вопросов и
            неожиданных поворотов сюжета.
          </SecondaryText>
          <ul className="mt-2">
            {features.map((feature) => (
              <FeatureListItem key={feature.feature} {...feature} />
            ))}
          </ul>
          <PrimaryText className="font-bold mt-2">
            Начните прямо сейчас и проверьте свои знания. Удачи!
          </PrimaryText>
        </section>
        <StartLink />
        <ImagesSection />
        <MainTableSection />
        <StartLink />
      </div>
    </div>
  );
}
