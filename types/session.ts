import { UserRole } from "./user";

export interface SessionPayload {
  userId: string;
  role: UserRole;
}
