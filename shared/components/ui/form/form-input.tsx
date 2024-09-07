import { UseFormReturn, Path } from "react-hook-form";
import { Input } from "../input";
import { cn } from "@/shared/lib/utils/styles";
import { AnyDict } from "@/types/dict";
import { useFormStatus } from "react-dom";

type InputType = "text" | "email" | "password";
export interface FormInputProps {
  field: string;
  label?: string;
  className?: string;
  type?: InputType;
  placeholder?: string;
  errors?: string[];
}

export const FormInput = ({
  field,
  label,
  className,
  errors,
  ...restProps
}: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <label htmlFor={field} className="block font-bold text-sm mb-1">
          {label}
        </label>
      ) : null}
      <Input {...restProps} name={field} disabled={pending} />
      <div className="text-red-800 font-bold text-sm mt-1 min-h-5">
        {errors?.join(", ")}
      </div>
    </div>
  );
};
