"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { requestLogin$ } from "@/shared/clientApi/auth";
import { AppLink } from "@/shared/components/ui/AppLink";
import { Form } from "@/shared/components/ui/form/form";
import { FormInput } from "@/shared/components/ui/form/form-input";
// import { redirectQueryKey } from "@/shared/const/redirectQueryKey";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppForm } from "@/shared/hooks/useAppForm";
import appRoutes from "@/shared/lib/configs/routes/routes";
import { setFormErrors } from "@/shared/lib/utils/errors";
import TokenService from "@/shared/lib/utils/storageServices/tokenService";
import { LoginSchema, LoginSchemaType } from "@/shared/schemas/login";
import { userActions } from "@/shared/store/user";
import { ApiError } from "@/types/api";
import { AnyDict } from "@/types/dict";

const LoginPage: FC = () => {
  const form = useAppForm(LoginSchema);
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const searchParams = useSearchParams();

  const onSubmit = async (data: AnyDict) => {
    try {
      // const redirectPath = searchParams.get(redirectQueryKey)
      //   ? `${appRoutes.main}${searchParams.get(redirectQueryKey)}`
      //   : appRoutes.main;
      const response = await requestLogin$(data as LoginSchemaType);
      const { tokens, ...user } = response;
      dispatch(userActions.setUser(user));
      TokenService.accessToken = tokens.access;
      TokenService.refreshToken = tokens.refresh;
      // router.push(redirectPath);
    } catch (e) {
      setFormErrors(e as ApiError, form.setError);
    }
  };

  return (
    <>
      <Form form={form} onSubmit={onSubmit} name="Вход" submitTitle="Войти">
        <FormInput field="email" form={form} label="Email" type="email" />
        <FormInput
          field="password"
          form={form}
          label="Пароль"
          type="password"
        />
      </Form>
      <AppLink to={appRoutes.auth.register}>еще нет аккаунта</AppLink>
    </>
  );
};

export default LoginPage;
