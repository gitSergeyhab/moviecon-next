import TokenService from "@/shared/lib/utils/storageServices/tokenService";
import { userActions } from "./";
import { ThunkFn } from "@/types/store";
import { requestUser$ } from "@/shared/clientApi/auth";

export const fetchUser = (): ThunkFn => async (dispatch) => {
  const token = TokenService.accessToken;
  if (!token) return;
  try {
    dispatch(userActions.setLoadingStatus("loading"));
    const user = await requestUser$();
    dispatch(userActions.setUser(user));
    dispatch(userActions.setLoadingStatus("success"));
  } catch (e) {
    dispatch(userActions.setLoadingStatus("failed"));
  }
};
