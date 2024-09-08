import { Table, TableD, TableH, TableRow } from "@/shared/components/ui/table";
import { ItemHeader } from "@/shared/components/ui/text";
import { TextData } from "@/shared/const/textCategories";
import { toDayMonthYearTime } from "@/shared/lib/utils/date";
import { GameDuration } from "@/types/game";
import { GameResultClient } from "@/types/gameResult";
import { FC } from "react";

export interface TableResultsProps {
  results: GameResultClient[];
  duration: GameDuration;
}
export const TableRecords: FC<TableResultsProps> = ({ results, duration }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <ItemHeader className="my-2">
        {TextData.duration[duration]} Игра
      </ItemHeader>
      <div className="w-full max-h-[520px] overflow-auto px-2 sm:px-4 sm:max-h-[720px]">
        <Table className="w-full">
          <thead>
            <TableRow type="header">
              {["дата", "счет", "категория", "статус"].map((item) => (
                <TableH key={item}>{item}</TableH>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {results.map(({ category, createdAt, id, status, score }) => (
              <TableRow key={id} type="body">
                <TableD>{toDayMonthYearTime(createdAt)}</TableD>
                <TableD>{score}</TableD>
                <TableD>{TextData.category[category] || category}</TableD>
                <TableD>{TextData.status[status] || status}</TableD>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
