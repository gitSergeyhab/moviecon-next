import { GameCategory, GameDuration, GameType } from "@/types/game";
import { GameResult, GameResultServer, Sort } from "@/types/gameResult";
import { GameResultModel } from "../models/gameResult";
import dbConnect from "../dbConnect";

interface Params {
  duration: string;
  type: string;
  category: string;
}
interface AggregatedUserRecord {
  _id: Params;
  bestResult: GameResultServer;
}

interface AggregatedRecord {
  _id: Params;
  bestResult: GameResultServer[];
}
interface FindUserResults {
  userId: string;
  limit: number;
  sort: Sort;
  offset: number;
  category: GameCategory;
  type: GameType;
  duration: GameDuration;
}

interface ScoreList {
  _id: Params;
  scores: number[];
}

export class GameResultService {
  static async create(result: GameResult): Promise<GameResultServer> {
    const cratedResult = await GameResultModel.create(result);
    return cratedResult.toObject();
  }

  static async findById(id: string): Promise<GameResultServer | null> {
    return await GameResultModel.findById(id);
  }

  static async finsBestResultsByUserId(
    userId: string
  ): Promise<AggregatedUserRecord[]> {
    return await GameResultModel.aggregate([
      { $match: { userId } },
      {
        $sort: { score: -1 },
      },
      {
        $group: {
          _id: {
            duration: "$duration",
            type: "$type",
            category: "$category",
          },
          bestResult: { $first: "$$ROOT" },
        },
      },
      {
        $sort: { "bestResult.score": -1 },
      },
    ]);
  }
  static async findUserResults(
    data: FindUserResults
  ): Promise<{ results: GameResultServer[]; totalCount: number }> {
    const { category, type, duration, userId, limit, offset, sort } = data;

    const filter: Record<string, string> = { userId };

    if (category) filter.category = category;
    if (duration) filter.duration = duration;
    if (type) filter.type = type;

    const pipeline = [
      { $match: filter },
      { $sort: { createdAt: sort } },
      {
        $facet: {
          results: [{ $skip: offset }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await GameResultModel.aggregate(pipeline);

    const results = result[0].results;
    const totalCount = result[0].totalCount[0]?.count || 0;

    return { results, totalCount };
  }

  static async getScoreList(): Promise<ScoreList[]> {
    dbConnect(); // без этого почему-то MongooseError: Operation `gameresults.aggregate()` buffering timed out after 10000ms
    return await GameResultModel.aggregate([
      {
        $group: {
          _id: {
            duration: "$duration",
            type: "$type",
            category: "$category",
          },
          scores: { $push: "$score" },
        },
      },
      {
        $project: {
          _id: 1,
          scores: {
            $sortArray: { input: "$scores", sortBy: 1 }, // Сортировка массива по возрастанию
          },
        },
      },
    ]);
  }

  static async findRecords(limit = 10): Promise<AggregatedRecord[]> {
    return await GameResultModel.aggregate([
      {
        $sort: { score: -1 },
      },
      {
        $group: {
          _id: {
            duration: "$duration",
            type: "$type",
            category: "$category",
          },
          bestResult: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 1,
          bestResult: { $slice: ["$bestResult", limit] },
        },
      },
    ]);
  }
}
