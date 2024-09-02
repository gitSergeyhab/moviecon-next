import { UserInfo, UserInfoClient, UserRole } from "@/types/user";
import { FC, PropsWithChildren } from "react";
// import { checkAccess } from "../lib/utils/user";
// import { redirectQueryKey } from "../const/redirectQueryKey";
// import appRoutes from "../lib/configs/routes/routes";
// !! TODO DELETE

export interface ProtectedRolesRouteProps extends PropsWithChildren {
  roles?: UserRole[] | UserRole;
  user: UserInfoClient | null;
}

export const ProtectedRolesRoute: FC<ProtectedRolesRouteProps> = ({
  children,
  roles,
  user,
}) => {
  // if (checkAccess(roles)) return children;
  // if (!user) {
  //   const searchParams = new URLSearchParams(location.search);
  //   const backQuery =
  //     searchParams.get(redirectQueryKey) || location.pathname.slice(1);

  //   const redirect = backQuery
  //     ? `${appRoutes.auth.login}?${redirectQueryKey}=${backQuery}`
  //     : `${appRoutes.auth.login}`;

  //   return <Navigate to={redirect} replace />;
  // }
  // return <Navigate to={appRoutes.notFound} replace />;
  return null;
};
