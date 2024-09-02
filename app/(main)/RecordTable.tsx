import { FC } from "react";
import { Table, TableD, TableH, TableRow } from "@/shared/components/ui/table";
import { cn } from "@/shared/lib/utils/styles";
import { classPosition } from "./const";
import { ItemHeader } from "@/shared/components/ui/text";
import { GameAggregateRecordClient } from "@/types/gameResult";
import { TextData } from "@/shared/const/textData";

export interface TableResultsProps {
  result: GameAggregateRecordClient;
}
export const TableRecords: FC<TableResultsProps> = ({ result }) => {
  const { bestResult, params } = result;
  const { category, duration } = params;
  return (
    <div className="w-full flex flex-col items-center">
      <ItemHeader className="my-2">
        {TextData.duration[duration]} игра / {TextData.category[category]}
      </ItemHeader>
      <div className="px-2 w-full max-h-[520px] overflow-auto sm:max-h-[720px] sm:px-4">
        <Table className="w-full ">
          <thead>
            <TableRow type="header">
              {["место", "игрок", "счет"].map((item) => (
                <TableH key={item}>{item}</TableH>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {bestResult
              .sort((a, b) => b.score - a.score)
              .map(({ id, score, userName }, i) => (
                <TableRow key={id} type="body">
                  <TableD>
                    <div
                      className={cn(
                        "flex items-center justify-center  w-6 h-6 font-bold rounded-full",
                        classPosition[String(i + 1) as "1" | "2" | "3"]
                      )}
                    >
                      {i + 1}
                    </div>
                  </TableD>
                  <TableD className="font-bold">{userName}</TableD>
                  <TableD>{score}</TableD>
                </TableRow>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
