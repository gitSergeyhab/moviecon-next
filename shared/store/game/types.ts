import { AnswerStatus, GameStatus, Level, LevelResult } from "@/types/game";
import { TestDict } from "@/types/test";
import { LoadingStatus } from "@/types/ui";

export interface GameState {
  gameId: string | null;
  levelsCount: number;
  levelInfo: Level | null;
  prevLevelResult: LevelResult | null;
  totalScore: number;
  levelScore: number;
  levelSkipped: number;
  levelErrors: number;
  answerStatuses: AnswerStatus[] | null;
  gameStatus: GameStatus;
  levelTestsDict: TestDict | null;
  levelTestsIds: string[];
  currentTestIndex: number;
  correctAnswerId: string | null | number;
  infoLoadingStatus: LoadingStatus;
  loadingStatus: LoadingStatus;
  isTransition: boolean;
  isImagePreloading: boolean;
}
