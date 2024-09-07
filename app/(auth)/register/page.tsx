import { FC } from "react";
import { AppLink } from "@/shared/components/ui/AppLink";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { RegisterForm } from "./RegisterForm";
import { PrimaryHeader } from "@/shared/components/ui/text";

const RegisterPage: FC = () => {
  return (
    <>
      <PrimaryHeader className="mb-8"> Регистрация </PrimaryHeader>
      <RegisterForm />
      <AppLink to={appRoutes.auth.login}>уже есть аккаунт</AppLink>
    </>
  );
};
export default RegisterPage;
