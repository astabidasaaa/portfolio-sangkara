"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import MobileNav from "./mobileNav";

type Props = {};

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

const Navbar = (props: Props) => {
  const { setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex flex-row justify-between items-center px-4 sm:px-10 md:px-16 lg:px-20 bg-primary z-50">
      <div className="w-full flex flex-row justify-between items-center py-2 sm:py-4">
        <span className="font-black tracking-tight text-secondary text-sm sm:text-base">
          SNGKR
        </span>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:bg-primary/5 focus:text-primary hover:bg-primary/5 hover:text-primary"
                        href="/"
                      >
                        <span className="font-black tracking-tight">SNGKR</span>
                        <p className=" mt-4 text-sm leading-tight text-muted-foreground">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Illo, cumque.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/to-do-list" title="To Do List">
                    To do list function for you.
                  </ListItem>
                  <ListItem href="#" title="On Progress">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                  </ListItem>
                  <ListItem href="#" title="Other Tool">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eum!
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="relative">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-secondary" />
                  <Moon className="absolute top-0 left-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-secondary" />
                  <span className="sr-only">Toggle theme</span>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col gap-2 p-6 md:w-[160px] lg:w-[160px]">
                  <li>
                    <Button
                      className=" w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary"
                      variant="ghost"
                      onClick={() => setTheme("light")}
                    >
                      Light
                    </Button>
                  </li>
                  <li>
                    <Button
                      className=" w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary"
                      variant="ghost"
                      onClick={() => setTheme("dark")}
                    >
                      Dark
                    </Button>
                  </li>
                  <li>
                    <Button
                      className=" w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary"
                      variant="ghost"
                      onClick={() => setTheme("system")}
                    >
                      System
                    </Button>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
