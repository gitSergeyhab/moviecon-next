import { UserAggregateRecords } from "@/types/gameResult";
import { LoadingStatus } from "@/types/ui";

export interface RecordState {
  records: UserAggregateRecords[] | null;
  status: LoadingStatus;
}
