"use client";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Histogram } from "./Histogram";
import { generateHistogramData } from "./helpers";
import { useFetchScores } from "./useFetchScores";
import { GameAggregateScores } from "@/types/gameResult";
import { recordsSelectors } from "@/shared/store/records";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { fetchUserRecords } from "@/shared/store/records/thunks";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { ErrorBlock } from "@/shared/components/ErrorBlock";
import { SecondaryHeader } from "@/shared/components/ui/text";

// TODO когда будет больше данных фильтровать по категориям и длительности
const getTemporaryData = (data: GameAggregateScores[]): number[] =>
  data
    .reduce((acc, item) => [...acc, ...item.scores], [] as number[])
    .sort((a, b) => a - b);

export const HistogramSection: FC = () => {
  const { scores, status } = useFetchScores();
  // TODO когда будет больше  - данных фильтровать по категориям и длительности
  const userRecord = useSelector(recordsSelectors.getTopUserRecord);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userRecord === null) {
      dispatch(fetchUserRecords());
    }
  }, [userRecord, dispatch]);

  if (status === "loading") {
    return <ContentLoader />;
  }
  if (status === "failed" || userRecord === null) {
    return <ErrorBlock text="Не удалось загрузить данные графика" />;
  }

  const data = getTemporaryData(scores);

  const histogramData = generateHistogramData(data, userRecord);
  if (!histogramData) {
    return (
      <SecondaryHeader className="text-center">
        Недостаточно данных для построения графика
      </SecondaryHeader>
    );
  }
  return (
    <section>
      <h2 className="invisible h-0">Гистограмма распределения результатов</h2>
      <Histogram data={histogramData} userRecord={userRecord} />
    </section>
  );
};
