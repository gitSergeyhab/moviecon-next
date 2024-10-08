import { Document, Schema, models, model } from "mongoose";
import { UserInfo } from "@/types/user";

export interface UserType extends UserInfo, Document {
  createdAt: Date;
  updatedAt: Date;
  password: string;
}

export interface UserTypeWithId extends UserType {
  _id: string;
}

const UserSchema: Schema = new Schema<UserType>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, trim: true },
    points: { type: Number, default: 0, min: 0 },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      required: true,
      default: "USER",
    },
  },
  { timestamps: true }
);

export const UserModel = models.User || model<UserType>("User", UserSchema);
