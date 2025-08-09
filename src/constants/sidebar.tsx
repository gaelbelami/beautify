import {
  Icon,
  IconBubble,
  IconHome2,
  IconProps,
  IconSettings,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type SidebarNavItemsProps = {
  title: string;
  href: string;
};

export type MenuItemsProps = {
  label: string;
  href: string;
  icon?: ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & RefAttributes<Icon>
  >;
};

export const SIDEBAR_NAV_ITEMS: SidebarNavItemsProps[] = [
  {
    title: "settings.navigation.profile",
    href: "/dashboard/settings",
  },
  {
    title: "settings.navigation.account",
    href: "/dashboard/settings/account",
  },
  {
    title: "settings.navigation.theming",
    href: "/dashboard/settings/theming",
  },
  {
    title: "settings.navigation.notifications",
    href: "/dashboard/settings/notifications",
  },
  // {
  //   title: "settings.navigation.display",
  //   href: "/dashboard/settings/display",
  // },
];

export const MENU_ITEMS: MenuItemsProps[] = [
  {
    label: "sidebar.home",
    href: "/dashboard",
    icon: IconHome2,
  },
  {
    label: "sidebar.settings",
    href: "/dashboard/settings",
    icon: IconSettings,
  },
  {
    label: "sidebar.chat",
    href: "/chat",
    icon: IconBubble,
  },
];
