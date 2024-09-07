import { userActions } from "./";
import { ThunkFn } from "@/types/store";
import { requestUser$ } from "@/shared/clientApi/auth";

export const fetchUser = (): ThunkFn => async (dispatch) => {
  try {
    dispatch(userActions.setLoadingStatus("loading"));
    const user = await requestUser$();
    dispatch(userActions.setUser(user));
    dispatch(userActions.setLoadingStatus("success"));
  } catch (e) {
    dispatch(userActions.setLoadingStatus("failed"));
  }
};
