import { Icon, IconHome2, IconProps, IconSettings } from "@tabler/icons-react";
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
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Theming",
    href: "/dashboard/settings/theming",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Display",
    href: "/dashboard/settings/display",
  },
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
  // {
  //   label: "sidebar.logout",
  //   href: "/login", // Or handle via onClick
  //   icon: IconArrowLeft,
  // },
];
