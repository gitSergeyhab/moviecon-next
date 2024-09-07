"use client";

import { useFormState } from "react-dom";
import { register } from "@/app/actions/auth/register";
import { FormInput } from "@/shared/components/ui/form/form-input";
import { SubmitButton } from "@/shared/components/ui/form/SubmitButton";

export function RegisterForm() {
  const [state, action] = useFormState(register, undefined);
  return (
    <form action={action} className="w-full flex flex-col gap-2">
      <FormInput
        field="name"
        label="Имя"
        errors={state?.errors?.name}
        type="text"
      />
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
      <FormInput
        field="repeatPassword"
        label="Повторите пароль"
        errors={state?.errors?.repeatPassword}
        type="password"
      />
      <SubmitButton title="Зарегистрироваться" />
    </form>
  );
}
