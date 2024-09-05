import { LoadingStatus } from "@/types/ui";
import { UserInfoClient } from "@/types/user";

export interface UserState {
  user: UserInfoClient | null;
  status: LoadingStatus;
  error: null | string;
}
