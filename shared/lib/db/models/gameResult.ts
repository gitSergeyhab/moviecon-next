import { model, Schema, models } from "mongoose";
import {
  GAME_DURATIONS,
  GAME_RESULT_STATUSES,
  GAME_TYPES,
} from "@/shared/const/game";
import { TEST_CATEGORIES_WITH_ALL } from "@/shared/const/test";
import { GameResultType } from "@/types/gameResult";

const GameResultSchema = new Schema<GameResultType>(
  {
    category: { type: String, enum: TEST_CATEGORIES_WITH_ALL, required: true },
    score: { type: Number, required: true },
    type: { type: String, enum: GAME_TYPES, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    status: { type: String, enum: GAME_RESULT_STATUSES, required: true },
    duration: { type: String, enum: GAME_DURATIONS, required: true },
  },
  { timestamps: true }
);

GameResultSchema.index({ score: 1 });
GameResultSchema.index({ category: 1, type: 1, duration: 1 });

export const GameResultModel =
  models.GameResult || model("GameResult", GameResultSchema);
