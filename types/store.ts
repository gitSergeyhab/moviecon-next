import { AppDispatch, RootState } from "@/shared/store/index";

export type ThunkFn = (
  dispatch: AppDispatch,
  getStore: () => RootState
) => Promise<void>;
