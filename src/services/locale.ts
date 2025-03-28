'use server'

import  { cookies } from 'next/headers';
// import { Locale, routing } from '@/i18n/routing'


// In this example the locale is read from a cookie. You could alternatively 
// also read it from a database, backend service, or any other source.
export type Locale = 'en' | 'de' | 'fr' | 'nl' | 'zh';
const defaultLocale = "en"

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
    return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
    (await cookies()).set(COOKIE_NAME, locale);
}