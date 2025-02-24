"use client";
import { Globe, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { cn } from "@/lib/utils";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/i18n/routing";

const availableLocales = ["en", "fr", "de", "nl", "zh"] as const;

const LocalSwitcher = ({ className }: { className: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const onSelectChange = (localActive: Locale) => {
    startTransition(() => {
      setUserLocale(localActive);
    });
  };
  return (
    <div>
      <Select
        defaultValue={localActive}
        onValueChange={onSelectChange}
        disabled={isPending}
      >
        <SelectTrigger
          className={cn(
            `"flex w-[] ring-offset-transparent focus:ring-transparent items-center text-base
            capitalize rounded-md"`,
            className,
          )}
        >
          <div className="flex">
            <Image
              src={`/flags/${localActive}.svg`}
              alt={localActive}
              width={16}
              height={26}
              className="mr-2"
            />
            <SelectValue placeholder="Select language" className="gap-2">
              {localActive}
            </SelectValue>
            {/* <Globe className="mr-2 h-5 w-5" /> */}
          </div>
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            {/* <div className="p-2">Language</div> */}
            {availableLocales.map((locale) => (
              <SelectItem
                className="justify-items-center py-1 px-2"
                key={locale}
                value={locale}
              >
                <div className="flex space-x-2">
                  <div className="mr-2">
                    <Image
                      src={`/flags/${locale}.svg`}
                      alt={locale}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="text-base capitalize">{locale}</div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocalSwitcher;
