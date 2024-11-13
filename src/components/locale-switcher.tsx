"use client";
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

const availableLocales = ["en", "fr", "de", "nl"];

const LocalSwitcher = () => {
  const [isPending, startTransitioon] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const onSelectChange = (nextLocale: string) => {
    startTransitioon(() => {
      router.replace(`/${nextLocale}`);
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
          className="flex w-[100px] ring-offset-transparent focus:ring-transparent items-center
            text-base capitalize"
        >
          <div className="flex gap-2">
            <Image
              src={`/flags/${localActive}.svg`}
              alt={localActive}
              width={16}
              height={26}
            />
            <SelectValue placeholder="Select language" className="">
              {localActive}
            </SelectValue>
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
