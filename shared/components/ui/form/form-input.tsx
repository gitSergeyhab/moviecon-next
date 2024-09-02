import { UseFormReturn, Path } from "react-hook-form";
import { Input } from "../input";
import { cn } from "@/shared/lib/utils/styles";
import { AnyDict } from "@/types/dict";

type InputType = "text" | "email" | "password";
export interface FormInputProps<T extends AnyDict> {
  form: UseFormReturn<T>;
  field: Path<T>;
  label?: string;
  className?: string;
  type?: InputType;
  placeholder?: string;
}

export const FormInput = <T extends AnyDict>({
  field,
  form,
  label,
  className,
  ...restProps
}: FormInputProps<T>) => {
  const { formState, register } = form;
  const error = formState.errors[field];

  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label
          htmlFor={field as string}
          className="block font-bold text-sm mb-1"
        >
          {label}
        </label>
      ) : null}
      <Input
        {...restProps}
        {...register(field)}
        disabled={formState.isSubmitting}
      />
      <div className="text-red-800 font-bold text-sm mt-1 min-h-5">
        {error?.message as string}
      </div>
    </div>
  );
};
