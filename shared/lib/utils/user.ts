import { store } from "@/shared/store";
import { userActions, userSelectors } from "@/shared/store/user";
import { UserRole } from "@/types/user";
import { logout as logoutAction } from "@/app/actions/auth/logout";

export const logout = () => {
  store.dispatch(userActions.clearUser());
  logoutAction();
};

export const checkAccess = (allowedRoles?: UserRole[] | UserRole): boolean => {
  const user = userSelectors.getUser(store.getState());
  if (!allowedRoles || !allowedRoles.length) return true;
  if (typeof allowedRoles === "string") return user?.role === allowedRoles;
  return !!user?.role && (!allowedRoles || allowedRoles.includes(user?.role));
};
