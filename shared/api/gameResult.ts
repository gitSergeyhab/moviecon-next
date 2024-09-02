import { GameCategory, GameDuration, GameType } from "@/types/game";
import { request } from ".";
import {
  GameAggregateRecordClient,
  GameAggregateScores,
  GameResult,
  UserAggregateRecords,
} from "@/types/gameResult";
import { createQueryString } from "../lib/utils/query";

const url = "/gameResults/";

const getUrl = (path: string) => `${url}${path}`;

export interface UserResultParams {
  limit: number;
  sort: "1" | "-1";
  offset: number;
  category: GameCategory | "none";
  type: GameType;
  duration: GameDuration | "none";
}

export const requestUserResults$ = (
  query: Partial<UserResultParams>
): Promise<{ results: GameResult[]; totalCount: number }> =>
  request.get(getUrl(`user-top?${createQueryString(query)}`));

export const requestUserRecords$ = (): Promise<UserAggregateRecords[]> =>
  request.get(getUrl("user-best/"));

export const requestRecords$ = (
  limit: number
): Promise<GameAggregateRecordClient[]> =>
  request.get(getUrl(`records?limit=${limit}`));

export const requestScores$ = (): Promise<GameAggregateScores[]> =>
  request.get(getUrl(`scores`));
