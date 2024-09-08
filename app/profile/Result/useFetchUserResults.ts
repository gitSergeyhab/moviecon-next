import { useEffect, useState } from "react";
import {
  requestUserResults$,
  UserResultParams,
} from "@/shared/clientApi/gameResult";
import { GameResultClient } from "@/types/gameResult";
import { LoadingStatus } from "@/types/ui";
import { defaultQuery } from "../const";

export const useFetchUserResults = () => {
  const [results, setResults] = useState<GameResultClient[]>([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<LoadingStatus>("idle");
  const [query, setQuery] = useState<UserResultParams>(defaultQuery);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setStatus("loading");
        const response = await requestUserResults$(query);
        setResults((prev) => [
          ...prev.slice(0, query.offset),
          ...response.results,
        ]);
        setCount(response.totalCount);
        setStatus("success");
      } catch (error) {
        setStatus("failed");
        console.error({ error });
      }
    };

    fetchResults();
  }, [query]);

  return { query, setQuery, results, status, count };
};
