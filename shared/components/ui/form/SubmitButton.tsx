"use client";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../button";
export interface SubmitButtonProps {
  title?: string;
}
export const SubmitButton: FC<SubmitButtonProps> = ({ title }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full font-bold"
      variant={"outline"}
    >
      {title || "Отправить"}
    </Button>
  );
};
