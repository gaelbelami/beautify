import Image from "next/image";
import { GrapeIcon, Menu, MenuSquareIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { EnhancedToggles } from "@/components/enhanced-toggles";

export const Header = () => {
  const translate = useTranslations("Header");
  const platformLinks = [
    { name: translate("nav.features"), href: "/features" },
    { name: translate("nav.docs"), href: "#docs" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-sm z-20">
      <div className="container mx-auto py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-9 w-10 border dark:border-primary/90 rounded-br-xl rounded-tr-sm rounded-tl-xl
                rounded-bl-sm shrink-0 flex justify-center items-center"
            >
              <GrapeIcon className="w-5 h-5 text-primary" />
            </div>
            {/* <span className="text-primary font-bold text-2xl">
              NAME
            </span> */}
          </div>
          <MenuSquareIcon className="h-5 w-5 md:hidden" />
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-4">
              {platformLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "text-sm font-medium text-foreground/60 transition-colors",
                        "hover:text-foreground/80 focus:text-foreground/80",
                        "hover:bg-accent/50 px-3 py-2 rounded-md",
                      )}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              /* Add mobile menu toggle logic */
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>
          {/* Theme Toggles and Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            <EnhancedToggles />
            <div className="h-6 w-px bg-border" />
            <Link href={"/login"} className="text-foreground/60 font-bold">
              {translate("login")}
            </Link>
            <Link href={"/dashboard"}>
              <Button className="rounded-md px-4 py-1 text-sm font-bold">
                {translate("getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* <MenuIcon className="w-5 h-5 md:hidden" /> */}
    </header>
  );
};
