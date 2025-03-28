import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";

export const DatePickerField = ({
  mode = "single",
  presets,
  label,
  description,
  dateFormat = "PPP",
  field,
  translate,
}: {
  mode?: "single" | "range";
  presets?: { label: string; value: string }[];
  label?: string;
  description?: string;
  dateFormat?: string;
  field: any;
  translate: (key: string) => string;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !field.value && "text-muted-foreground",
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {field.value ? (
          mode === "range" ? (
            field.value.from ? (
              field.value.to ? (
                <>
                  {format(field.value.from, dateFormat)} -{" "}
                  {format(field.value.to, dateFormat)}
                </>
              ) : (
                format(field.value.from, dateFormat)
              )
            ) : (
              <span>{translate("pickDate")}</span>
            )
          ) : (
            format(field.value, dateFormat)
          )
        ) : (
          <span>{translate("account.dobPlaceholder")}</span>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      {presets && (
        <div className="flex flex-col space-y-2 p-2">
          {presets.map((preset) => (
            <Button
              key={preset.value}
              variant="ghost"
              onClick={() =>
                field.onChange(addDays(new Date(), parseInt(preset.value)))
              }
            >
              {translate(preset.label)}
            </Button>
          ))}
        </div>
      )}
      <Calendar
        mode={mode}
        selected={field.value}
        onSelect={field.onChange}
        initialFocus
        numberOfMonths={mode === "range" ? 2 : 1}
      />
    </PopoverContent>
  </Popover>
);
