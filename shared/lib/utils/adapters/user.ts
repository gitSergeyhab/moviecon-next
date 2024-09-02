import { UserDTO } from "@/types/user";
import { UserTypeWithId } from "../../db/models/user";

export const toUserDTO = (user: UserTypeWithId): UserDTO => ({
  id: user._id.toString(),
  name: user.name,
  role: user.role,
  email: user.email,
  points: user.points,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
