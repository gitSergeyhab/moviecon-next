"use client";
import { FC } from "react";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { AppLink } from "@/shared/components/ui/AppLink";
import { useSelector } from "react-redux";
import { userSelectors } from "@/shared/store/user";
import { Spinner } from "@/shared/components/Spinner";

export const StartLink: FC = () => {
  const user = useSelector(userSelectors.getUser);
  const loading = useSelector(userSelectors.getUserStatus) === "loading";

  const buttonText = user ? "Играть" : "Зарегистрироваться";
  return (
    <AppLink
      to={user ? appRoutes.gameSelection : appRoutes.auth.register}
      className="border-neutral-800 dark:border-neutral-200 flex justify-center items-center text-xl border-2 w-full h-12"
      aria-label={buttonText}
    >
      {loading ? <Spinner size="2xs" /> : buttonText}
    </AppLink>
  );
};
