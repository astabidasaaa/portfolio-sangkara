import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden outline-none hover:bg-accent/10 text-secondary hover:text-accent-foreground focus:outline-none focus-visible:bg-accent/10"
        >
          <Menu className="text-secondary h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="flex flex-col gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center w-max gap-4 px-2.5 focus-visible:bg-accent/80 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <span className="font-black tracking-tight text-primary text-sm sm:text-base">
              SNGKR
            </span>
            <span className="sr-only">
              Sangkara Astabidasa Portfolio Website
            </span>
          </Link>
          <Link
            href="/to-do-list"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus-visible:bg-accent/80 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <div className="text-sm font-semibold leading-none">To Do List</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              To do list function for you.
            </p>
          </Link>
          <Link
            href="#"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus-visible:bg-accent/80 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <div className="text-sm font-semibold leading-none">
              On Progress
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </Link>
          <Link
            href="#"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus-visible:bg-accent/80 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            <div className="text-sm font-semibold leading-none">Other Tool</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum!
            </p>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
