"use client";

import { useFormState } from "react-dom";
import { FormInput } from "@/shared/components/ui/form/form-input";
import { SubmitButton } from "@/shared/components/ui/form/SubmitButton";
import { login } from "@/app/actions/auth/login";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  return (
    <form action={action} className="w-full flex flex-col gap-2">
      <FormInput
        field="email"
        label="Email"
        errors={state?.errors?.email}
        type="email"
      />
      <FormInput
        field="password"
        label="Пароль"
        errors={state?.errors?.password}
        type="password"
      />
      <SubmitButton title="Войти" />
    </form>
  );
}
