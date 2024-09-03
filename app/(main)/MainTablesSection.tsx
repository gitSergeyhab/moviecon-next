"use client";
import { FC } from "react";
import { TableRecords } from "./RecordTable";
import { recordsTableCount } from "./const";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { PrimaryText, SecondaryHeader } from "@/shared/components/ui/text";
import { useFetchRecords } from "@/shared/hooks/useFetchRecords";

export const MainTableSection: FC = () => {
  const { status, records } = useFetchRecords(recordsTableCount);

  if (status === "loading") {
    return <ContentLoader className="min-h-96" />;
  }

  if (!records || records.length === 0) return null;

  return (
    <section className="rounded-lg mt-8 md:mt-16">
      <div className="bg-neutral-200/70 dark:bg-neutral-900/70 py-4 rounded-lg sm:py-8">
        <SecondaryHeader className="text-center text-3xl md:text-5xl">
          Наши рекордсмены
        </SecondaryHeader>
        <div className="grid mt-4 lg:grid-cols-2 grid-cols-1 gap-4  ">
          {records.map((record) => (
            <TableRecords
              key={`${record.params.category}-${record.params.duration} `}
              result={record}
            />
          ))}
        </div>
      </div>
      <PrimaryText className="text-center font-bold mt-8 md:mt-12">
        Начни игру, чтоб оказаться в их числе
      </PrimaryText>
    </section>
  );
};
