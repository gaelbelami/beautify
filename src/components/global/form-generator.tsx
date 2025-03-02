import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

type FormGeneratorProps = {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea" | "radio";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  icon?: React.ReactNode;
};

export const FormGenerator = ({
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  type,
  lines,
  icon,
}: FormGeneratorProps) => {
  const translate = useTranslations("");
  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col gap-2 font-medium"
          htmlFor={`input-${label}`}
        >
          {icon && icon}
          {label && translate(label)}
          <Input
            id={`input-{label}`}
            type={type}
            placeholder={translate(placeholder)}
            className="h-12 text-base"
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : translate(message)}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      return (
        <Label htmlFor={`select-${label}`} className="flex flexcol gap-2">
          {label && label}
          <select
            id={`select-${label}`}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            {...register(name)}
          >
            {options?.length &&
              options.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                  className="dark:bg-muted"
                >
                  {translate(option.label)}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : translate(message)}
              </p>
            )}
          />
        </Label>
      );

    case "textarea":
      return (
        <Label htmlFor={`input-${label}`} className="flex flex-col gap-2">
          {label && label}
          <Textarea
            className="bg-primary border-primary text-primary-foreground"
            id={`input-${label}`}
            placeholder={translate(placeholder)}
            {...register(name)}
            rows={lines}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : translate(message)}
              </p>
            )}
          />
        </Label>
      );

    default:
      return <></>;
  }
};
