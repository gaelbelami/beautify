"use client";

import { FormGenerator } from "@/components/global/form-generator";
import LocalSwitcher from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useAccountForm } from "@/hooks/settings";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

export function AccountForm() {
  const { form } = useAccountForm();

  //   function onSubmit(data: AccountFormValues) {
  //     toast({
  //       title: "You submitted the following values:",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //         </pre>
  //       ),
  //     })
  //   }
  const handleSubmit = (e: React.FormEvent) => {
    console.log("Pressed On");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {BEAUTIFY_CONSTANTS.userAccountForm.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          label={field.label}
          // options={languages}
          control={form.control}
          register={form.register}
          errors={form.formState.errors}
        />
      ))}
      <LocalSwitcher className="w-[180px]" />
      <Button className="semi-bold" type="submit">
        Update account
      </Button>
    </form>
  );
}
