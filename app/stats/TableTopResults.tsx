"use client";
import { Table, TableD, TableH, TableRow } from "@/shared/components/ui/table";
import { TextData } from "@/shared/const/textCategories";
import { toDayMonthYear } from "@/shared/lib/utils/date";
import { cn } from "@/shared/lib/utils/styles";
import { userSelectors } from "@/shared/store/user";
import { GameAggregateRecordClient } from "@/types/gameResult";
import { FC } from "react";
import { useSelector } from "react-redux";

const classesTableD = "py-0 px-1 sm:px-4";

export interface TableTopResultsProps {
  result: GameAggregateRecordClient;
}
export const TableTopResults: FC<TableTopResultsProps> = ({ result }) => {
  const { bestResult } = result;
  const user = useSelector(userSelectors.getUser);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-h-[520px] overflow-auto px-2 sm:px-4 sm:max-h-[720px]">
        <Table className="w-full ">
          <thead>
            <TableRow type="header">
              {["#", "игрок", "дата", "статус", "счет"].map((item) => (
                <TableH
                  className={cn(
                    (item === "дата" || item === "статус") &&
                      "hidden sm:table-cell"
                  )}
                  key={item}
                >
                  {item}
                </TableH>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {bestResult
              .sort((a, b) => b.score - a.score)
              .map(({ id, score, userName, createdAt, status, userId }, i) => (
                <TableRow
                  key={id}
                  type="body"
                  className={cn(
                    userId === user?.id ? "font-bold text-orange-500" : ""
                  )}
                >
                  <TableD className={classesTableD}>{i + 1}</TableD>
                  <TableD className={classesTableD}>{userName}</TableD>
                  <TableD className={cn(classesTableD, "hidden sm:table-cell")}>
                    {toDayMonthYear(createdAt)}
                  </TableD>
                  <TableD className={cn(classesTableD, "hidden sm:table-cell")}>
                    {TextData.status[status]}
                  </TableD>
                  <TableD className={classesTableD}>{score}</TableD>
                </TableRow>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
