import { GameResultClient, GameResultServer } from "@/types/gameResult";

export const toGameResultClient = ({
  _id,
  ...gameResult
}: GameResultServer): GameResultClient => ({
  ...gameResult,
  id: _id,
});
