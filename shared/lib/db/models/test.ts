import { Schema, model, models } from "mongoose";
import { TEST_CATEGORIES, TEST_TYPES } from "@/shared/const/test";
import { ITestWithCategory, IVariant } from "@/types/test";

const Variant = new Schema<IVariant>({
  id: { type: Schema.Types.Mixed },
  enName: { type: String },
  name: { type: String },
  year: { type: Number },
  imageUrl: { type: String },
  slogan: { type: String },
});

const Test = new Schema<ITestWithCategory>(
  {
    questionText: { type: String, required: true },
    question: { type: Variant, required: true },
    variants: { type: [Variant], required: true },
    answer: { type: Schema.Types.Mixed, required: true },
    category: { type: String, enum: TEST_CATEGORIES, required: true },
    testType: { type: String, enum: TEST_TYPES, required: true },
  },
  { timestamps: true }
);

export const TestModel = models.Test || model("Test", Test);
