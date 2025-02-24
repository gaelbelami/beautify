import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import LocalSwitcher from "@/components/locale-switcher";
import { useTranslations } from "next-intl";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

export const iframeHeight = "1112px";

export const containerClassName = "w-full h-full";

export default function Dashboard() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col">
        <aside
          className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-accent
            bg-background sm:flex"
        >
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full
                bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8
                md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground
                    transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent
                    text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground
                    transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground
                    transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground
                    transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground
                    transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header
            className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4
              sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full
                      bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Breadcrumbs />
            <SearchBar />

            <LocalSwitcher />

            <ThemeColorToggle />
          </header>
          <main
            className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3
              xl:grid-cols-3"
          >
            <OrderCard />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

const Breadcrumbs = () => {
  const translate = useTranslations("Breadcrumbs");
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">{translate("dashboard")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">{translate("orders")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{translate("recentOrders")}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const SearchBar = () => {
  const translate = useTranslations("SearchBar");
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={translate("placeholder")}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
};

const OrderCard = () => {
  const translate = useTranslations("FirstCard");
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>{translate("title")}</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              {translate("description")}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>{translate("button")}</Button>
          </CardFooter>
        </Card>
        <SecondCard />
        <ThirdCard />
      </div>
    </div>
  );
};

const SecondCard = () => {
  const translate = useTranslations("SecondCard");
  return (
    <Card x-chunk="dashboard-05-chunk-1">
      <CardHeader className="pb-2">
        <CardDescription>{translate("title")}</CardDescription>
        <CardTitle className="text-4xl">{translate("money")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {translate("description")}
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
};

const ThirdCard = () => {
  const translate = useTranslations("ThirdCard");
  return (
    <Card x-chunk="dashboard-05-chunk-2">
      <CardHeader className="pb-2">
        <CardDescription>{translate("title")}</CardDescription>
        <CardTitle className="text-4xl">{translate("money")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {translate("description")}
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={60} aria-label="60% increase" />
      </CardFooter>
    </Card>
  );
};
