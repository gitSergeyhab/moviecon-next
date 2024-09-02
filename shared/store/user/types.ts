import { LoadingStatus } from "@/types/ui";
import { UserInfo } from "@/types/user";

export interface UserState {
  user: UserInfo | null;
  status: LoadingStatus;
  error: null | string;
}
