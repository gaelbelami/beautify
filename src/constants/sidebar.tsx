import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export const MenuItems = [
  {
    label: "sidebar.home",
    href: "/dashboard",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
    ),
  },
  {
    label: "sidebar.profile",
    href: "/dashboard/profile",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
    ),
  },
  {
    label: "sidebar.settings",
    href: "/dashboard/settings",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
    ),
  },
  {
    label: "sidebar.logout",
    href: "/login", // Or handle via onClick
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />
    ),
  },
];
