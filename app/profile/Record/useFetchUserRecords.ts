import { requestUserRecords$ } from "@/shared/clientApi/gameResult";
import { UserAggregateRecords } from "@/types/gameResult";
import { LoadingStatus } from "@/types/ui";
import { useEffect, useState } from "react";

export const useFetchUserRecords = () => {
  const [records, setRecords] = useState<UserAggregateRecords[]>([]);
  const [status, setStatus] = useState<LoadingStatus>("idle");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setStatus("loading");
        const response = await requestUserRecords$();
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
