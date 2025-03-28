import {getRequestConfig} from 'next-intl/server';
import { getUserLocale } from '@/services/locale';
import { cookies } from "next/headers"
 

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value || "en";
  const locale = await cookieLocale;
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});