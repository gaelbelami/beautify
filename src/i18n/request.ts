import {getRequestConfig} from 'next-intl/server';
import {Locale, routing} from './routing';
import { getUserLocale } from '@/services/locale';
 
// export default getRequestConfig(async ({requestLocale}) => {
//   // This typically corresponds to the `[locale]` segment
//   let locale = await requestLocale;
 
//   // Ensure that a valid locale is used
//   if (!locale || !routing.locales.includes(locale as Locale)) {
//     locale = routing.defaultLocale;
//   }  
 
//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default
//   };
// });

 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});