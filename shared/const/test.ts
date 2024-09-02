import { GameCategory } from "@/types/game";
import { TestType } from "@/types/test";

export const TEST_CATEGORIES: GameCategory[] = ["rus", "ussr", "world"];

export const TEST_CATEGORIES_WITH_ALL: GameCategory[] = [
  "all",
  ...TEST_CATEGORIES,
];

export const TEST_TYPES: TestType[] = [
  "FrameByMovie",
  "MovieByBudget",
  "MovieByFrame",
  "MovieByPerson",
  "MovieBySlogan",
  "MovieByYear",
  "PersonByMovie",
  "PersonByPhoto",
  "PhotoByPerson",
  "SloganByMovie",
  "YearByMovie",
];
