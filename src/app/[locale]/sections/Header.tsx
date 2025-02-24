import Image from "next/image";
import { ArrowRight, GrapeIcon, Menu, MenuSquareIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const Header = () => {
  const translate = useTranslations("Header");
  const platformLinks = [
    { name: translate("nav.features"), href: "#features" },
    { name: translate("nav.docs"), href: "#docs" },
    { name: translate("nav.pricing"), href: "#pricing" },
    { name: translate("nav.blog"), href: "#blog" },
  ];
  return (
    <header className="backdrop-blur-sm z-20">
      {/* <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p className="">Get Started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div> */}
      <div className="container max-w-7xl mx-auto py-5">
        <div className="flex items-center justify-between">
          <div className="border p-1 rounded-xl border-primary">
            <GrapeIcon className="h-8 w-8 text-primary" />
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

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-foreground/60">
              {translate("login")}
            </Button>
            <Button className="rounded-full px-6">
              {translate("getStarted")}
            </Button>
          </div>
        </div>
      </div>
      {/* <MenuIcon className="w-5 h-5 md:hidden" /> */}
    </header>
  );
};
