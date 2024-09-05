"use client";

import { Tabs } from "@/shared/components/Tabs";
import {
  PrimaryHeader,
  PrimaryText,
  SecondaryText,
} from "@/shared/components/ui/text";
import { GameCategory, GameDuration } from "@/types/game";
import { FC, useState } from "react";
import {
  categoryTabData,
  defaultCategory,
  defaultDuration,
  durationTabData,
  title,
} from "./const";
import { TextData } from "@/shared/const/textCategories";
import { TablesSection } from "./TablesSection";
import { HistogramSection } from "./HistogramSection";

const StatsPage: FC = () => {
  const [duration, setDuration] = useState<GameDuration>(defaultDuration);
  const [category, setCategory] = useState<GameCategory>(defaultCategory);
  const onClickDuration = (durationItem: GameDuration) =>
    setDuration(durationItem);
  const onClickCategory = (categoryItem: GameCategory) =>
    setCategory(categoryItem);

  return (
    <div className="rounded-lg max-w-[1200px] m-auto mb-16 ">
      <div className="bg-neutral-200/90 dark:bg-neutral-900/90 flex flex-col gap-2 py-2 min-h-[600px] md:min-h-[880px] rounded-lg md:py-16 md:p-6 xl:p-24 ">
        <PrimaryHeader className="text-center">{title}</PrimaryHeader>
        <div className="w-full  rounded-lg">
          <Tabs
            onClick={onClickCategory}
            selectedValue={category}
            tabData={categoryTabData}
          />
          <Tabs
            onClick={onClickDuration}
            selectedValue={duration}
            tabData={durationTabData}
          />
        </div>
        <PrimaryText className="font-bold text-center my-2">
          {TextData.duration[duration]} игра / {TextData.category[category]}
        </PrimaryText>
        <TablesSection duration={duration} category={category} />
        <SecondaryText className="font-bold text-center my-2 text-red-500">
          График с разбивкой по категориям появится, когда будет больше данных
        </SecondaryText>
        <HistogramSection />
      </div>
    </div>
  );
};

export default StatsPage;
