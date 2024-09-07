import { useEffect, useState } from "react";
import { requestScores$ } from "@/shared/clientApi/gameResult";
import { GameAggregateScores } from "@/types/gameResult";
import { LoadingStatus } from "@/types/ui";

export const useFetchScores = () => {
  const [scores, setScores] = useState<GameAggregateScores[]>([]);
  const [status, setStatus] = useState<LoadingStatus>("idle");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setStatus("loading");
        const response = await requestScores$();
        setScores(response);
        setStatus("success");
      } catch (error) {
        setStatus("failed");
        console.error({ error });
      }
    };

    fetchScores();
  }, []);

  return { status, scores };
};
