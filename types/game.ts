export interface Level {
  number: number;
  time: number; // ms
  errors: number;
  skips: number;
  questions: number;
}

export type GameStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "ENDED"
  | "WON"
  | "LOST"
  | "INFO_PAUSE";

export type GameDuration = "QUICK" | "COMMON" | "LONG";
export type GameCategory = "rus" | "ussr" | "world" | "all";
export type GameType = "SINGLE" | "MULTI";

export type EndGameStatus = Extract<GameStatus, "ENDED" | "WON" | "LOST">;

export type AnswerStatus = "correct" | "wrong" | "skipped" | "none";
export type NextGameAction = "NEXT_TEST" | "NEXT_LEVEL" | "GAME_OVER";

export interface LevelResult {
  answersScore: number;
  errorBonus: number;
  skipBonus: number;
  timeBonus: number;
  levelScore: number;
}
