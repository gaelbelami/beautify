import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { DatePickerField } from "./date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormGeneratorProps = {
  type?: "text" | "email" | "password" | "number" | "date";
  inputType:
    | "select"
    | "input"
    | "textarea"
    | "radio"
    | "date"
    | "date-range"
    | "date-preset";
  mode?: "single" | "range";
  presets?: { label: string; value: string }[];
  dateFormat?: string;
  control?: Control<any>;
  options?: { value: string; label: string }[];
  label?: string;
  placeholder: string;
  description?: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  icon?: React.ReactNode;
};

export const FormGenerator = ({
  inputType,
  presets,
  mode,
  dateFormat,
  control,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  type,
  lines,
  description,
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
            id={`input-${label}`}
            type={type}
            placeholder={translate(placeholder)}
            className="h-10 text-base bg-primary/5"
            {...register(name)}
          />
          {description && (
            <div className="my-1 text-xs text-muted-foreground">
              {translate(description)}
            </div>
          )}
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <p className="text-red-400 mb-2">
                {message === "Required" ? "" : translate(message)}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      return (
        <Label htmlFor={`select-${label}`} className="flex flex-col gap-2">
          {label && translate(label)}

          <Select
            // id={`select-${label}`}
            // className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            {...register(name)}
          >
            {options?.length &&
              options.map((option) => (
                <option
                  value={option.value}
                  key={option.label}
                  className="dark:bg-muted"
                >
                  {translate(option.label)}
                </option>
              ))}
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={translate(placeholder)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>{translate(label)}</SelectLabel> */}
                {options?.length &&
                  options.map((option) => (
                    <SelectItem
                      value={option.value}
                      key={option.label}
                      className="dark:bg-muted"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

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
          {label && translate(label)}
          <Textarea
            className="bg-primary/5 border-primary/20"
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
    case "date":
    case "date-range":
    case "date-preset":
      return (
        <Label className="flex flex-col gap-2 font-medium">
          {icon && icon}
          {label && translate(label)}
          <Controller
            name={name}
            control={control} // Pass control from useForm
            render={({ field }) => (
              <DatePickerField
                mode={inputType === "date-range" ? "range" : "single"}
                presets={inputType === "date-preset" ? presets : undefined}
                field={field}
                translate={translate}
                dateFormat={dateFormat}
              />
            )}
          />
          {description && (
            <div className="my-1 text-xs text-muted-foreground">
              {translate(description)}
            </div>
          )}
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mb-2">
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
