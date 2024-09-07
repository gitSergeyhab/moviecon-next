import { FC } from "react";
import { AppLink } from "@/shared/components/ui/AppLink";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { PrimaryHeader } from "@/shared/components/ui/text";
import { LoginForm } from "./LoginForm";

const RegisterPage: FC = () => {
  return (
    <>
      <PrimaryHeader className="mb-8"> Вход </PrimaryHeader>
      <LoginForm />
      <AppLink to={appRoutes.auth.login}>еще нет аккаунта</AppLink>
    </>
  );
};
export default RegisterPage;
