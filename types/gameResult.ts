import { GameCategory, GameDuration, GameStatus, GameType } from "./game";

export type GameResultStatus = Extract<GameStatus, "ENDED" | "LOST" | "WON">;

export interface GameResult {
  category: GameCategory;
  score: number;
  type: GameType;
  duration: GameDuration;
  userId: string;
  userName: string;
  status: GameResultStatus;
}

export interface GameResultType extends GameResult, Document {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export interface GameResultDTO extends GameResult {
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export type Sort = 1 | -1;

export type ResultsAggregateDict = Record<
  GameCategory,
  Record<GameType, Record<GameDuration, GameResultType>>
>;

export type ResultsAggregateUserDict = Record<
  GameDuration,
  Record<GameType, Record<GameCategory, GameResultType>>
>;

export interface ResultParam {
  duration: GameDuration;
  type: GameType;
  category: GameCategory;
}

export interface UserAggregateRecords {
  params: ResultParam;
  bestResult: GameResult;
}

export interface GameAggregateRecord {
  params: ResultParam;
  bestResult: GameResult[];
}

export interface GameAggregateRecordClient {
  params: ResultParam;
  bestResult: GameResultDTO[];
}
export interface GameAggregateScores {
  params: ResultParam;
  scores: number[];
}
