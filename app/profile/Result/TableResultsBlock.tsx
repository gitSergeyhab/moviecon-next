import { FC } from "react";
import { TableResults } from "./TableResults";
import { PrimaryText } from "@/shared/components/ui/text";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { GameResultClient } from "@/types/gameResult";
import { LoadingStatus } from "@/types/ui";

export interface TableResultsBlockProps {
  results: GameResultClient[];
  status: LoadingStatus;
  count: number;
}
export const TableResultsBlock: FC<TableResultsBlockProps> = ({
  count,
  results,
  status,
}) => {
  if ((status === "loading" || status === "idle") && !results.length) {
    return <ContentLoader />;
  }

  if (!count || !results.length) {
    return (
      <PrimaryText className="mt-8 text-center font-bold">
        У вас пока нет игр в выбранных категориях
      </PrimaryText>
    );
  }
  return <TableResults results={results} />;
};
