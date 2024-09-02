import { ITestFromDB, TestDTO } from "@/types/test";
import { TestModel } from "../models/test";
import { toTestDTO } from "../../utils/adapters/test";
import { GameCategory, Level } from "@/types/game";
// import { TEST_CATEGORIES } from "@/shared/const/test";

export class TestService {
  static async getById(id: string) {
    return await TestModel.findById(id);
  }

  static getTestDictDTO(
    tests: Record<string, ITestFromDB>
  ): Record<string, TestDTO> {
    return Object.keys(tests).reduce((acc, item) => {
      acc[item] = toTestDTO(tests[item]);
      return acc;
    }, {} as Record<string, TestDTO>);
  }

  static getTestLevels(levels: Level[], tests: ITestFromDB[]) {
    const levelTests: Record<string, ITestFromDB>[] = [];
    let last = 0;
    levels.forEach((lvl) => {
      const lvlTests = tests.slice(last, lvl.questions + last);
      last += lvl.questions;
      const dict = lvlTests.reduce((acc, item) => {
        acc[item._id.toString()] = item;
        return acc;
      }, {} as Record<string, ITestFromDB>);
      levelTests.push(dict);
    });
    return levelTests;
  }

  static async getTestByLevels(levels: Level[], category: GameCategory) {
    const count = levels.reduce((acc, el) => acc + el.questions, 0);
    const tests = await TestService.readRandomTests(category, count);
    const levelTests = TestService.getTestLevels(levels, tests);
    return levelTests;
  }

  static async readRandomTests(category: GameCategory, count: number) {
    // if (![...TEST_CATEGORIES, "all"].includes(category)) {
    //   throw new HttpError(400, "Некорректная категория", [
    //     { message: "Некорректная категория", name: "category" },
    //   ]);
    // }
    if (category === "all") {
      return (await TestModel.aggregate([
        { $sample: { size: count } },
      ])) as ITestFromDB[];
    }
    return (await TestModel.aggregate([
      { $match: { category } },
      { $sample: { size: count } },
    ])) as ITestFromDB[];
  }
}
