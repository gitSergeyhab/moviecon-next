"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { requestRegister$ } from "@/shared/clientApi/auth";
import { AppLink } from "@/shared/components/ui/AppLink";
import { Form } from "@/shared/components/ui/form/form";
import { FormInput } from "@/shared/components/ui/form/form-input";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppForm } from "@/shared/hooks/useAppForm";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { setFormErrors } from "@/shared/lib/utils/errors";
import TokenService from "@/shared/lib/utils/storageServices/tokenService";
import { RegisterSchema, RegisterSchemaType } from "@/shared/schemas/register";
import { userActions } from "@/shared/store/user";
import { ApiError } from "@/types/api";
import { AnyDict } from "@/types/dict";

const RegisterPage: FC = () => {
  const form = useAppForm(RegisterSchema);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: AnyDict) => {
    try {
      const response = await requestRegister$(data as RegisterSchemaType);
      const { tokens, ...user } = response;
      dispatch(userActions.setUser(user));
      TokenService.accessToken = tokens.access;
      TokenService.refreshToken = tokens.refresh;
      router.push(appRoutes.main);
    } catch (e) {
      setFormErrors(e as ApiError, form.setError);
    }
  };

  return (
    <>
      <Form
        form={form}
        onSubmit={onSubmit}
        name="Регистрация"
        submitTitle="Регистрация"
      >
        <FormInput field="email" form={form} label="Email" type="email" />
        <FormInput field="name" form={form} label="Имя" />
        <FormInput
          field="password"
          form={form}
          label="Пароль"
          type="password"
        />
        <FormInput
          field="repeatPassword"
          form={form}
          label="Повторите пароль"
          type="password"
        />
      </Form>
      <AppLink to={appRoutes.auth.login}>уже есть аккаунт</AppLink>
    </>
  );
};
export default RegisterPage;
