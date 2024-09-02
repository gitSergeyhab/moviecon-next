import { store } from "@/shared/store";
import { userActions, userSelectors } from "@/shared/store/user";
import { UserDTO, UserRole, UserTokens } from "@/types/user";
import TokenService from "./storageServices/tokenService";
import { UserTypeWithId } from "../db/models/user";
import { getToken } from "./tokens";
import { toUserDTO } from "./adapters/user";

export const logout = () => {
  store.dispatch(userActions.clearUser());
  TokenService.logout();
};

export const checkAccess = (allowedRoles?: UserRole[] | UserRole): boolean => {
  const user = userSelectors.getUser(store.getState());
  if (!allowedRoles || !allowedRoles.length) return true;
  if (typeof allowedRoles === "string") return user?.role === allowedRoles;
  return !!user?.role && (!allowedRoles || allowedRoles.includes(user?.role));
};

export const getUserWithTokens = (
  user: UserTypeWithId
): UserDTO & { tokens: UserTokens } => {
  const access = getToken(user._id, user.role, "ACCESS");
  const refresh = getToken(user._id, user.role, "REFRESH");
  console.log({ access, refresh });
  return { ...toUserDTO(user), tokens: { access, refresh } };
};
