import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export type Locale = 'en' | 'de' | 'fr' | 'nl' | 'zh';

// Define routing configuration
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', 'fr', 'nl', 'zh'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing); 