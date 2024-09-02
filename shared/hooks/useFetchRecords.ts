import { requestRecords$ } from "@/shared/clientApi/gameResult";
import { useEffect, useState } from "react";
import { LoadingStatus } from "@/types/ui";
import { GameAggregateRecordClient } from "@/types/gameResult";

export const useFetchRecords = (limit: number) => {
  const [records, setRecords] = useState<GameAggregateRecordClient[]>([]);
  const [status, setStatus] = useState<LoadingStatus>("idle");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setStatus("loading");
        const response = await requestRecords$(limit);
        setRecords(response);
        setStatus("success");
      } catch (error) {
        setStatus("failed");
        console.error({ error });
      }
    };

    fetchResults();
  }, []);

  return { status, records };
};
