"use client";

import { ContentLoader } from "@/shared/components/ContentLoader";
import { ErrorBlock } from "@/shared/components/ErrorBlock";
import { PrimaryText, SecondaryHeader } from "@/shared/components/ui/text";
import { useFetchRecords } from "@/shared/hooks/useFetchRecords";
import { GameCategory, GameDuration } from "@/types/game";
import { FC } from "react";
import { TableTopResults } from "./TableTopResults";

export interface TablesSectionProps {
  duration: GameDuration;
  category: GameCategory;
}
export const TablesSection: FC<TablesSectionProps> = ({
  duration,
  category,
}) => {
  const { status, records } = useFetchRecords(50);

  if (status === "loading") {
    return <ContentLoader />;
  }

  if (status === "failed") {
    return <ErrorBlock text="Не удалось загрузить данные таблицы рекордов" />;
  }
  const filteredRecords = records.find(
    ({ params }) => params.category === category && params.duration === duration
  );

  if (!filteredRecords || !filteredRecords.bestResult.length) {
    return (
      <PrimaryText className="text-center ">
        Нет данных для отображения
      </PrimaryText>
    );
  }
  return (
    <section className="bg-transparent rounded-lg">
      <div className=" bg-neutral-200/20 dark:bg-neutral-900/20 rounded-lg py-4 sm:py-8">
        <SecondaryHeader className="text-center ">
          Наши рекордсмены
        </SecondaryHeader>
        <TableTopResults result={filteredRecords} />
      </div>
    </section>
  );
};
