import React from "react";
import { Separator } from "./ui/separator";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="relative w-full flex flex-col justify-start items-center px-4 sm:px-10 md:px-16 lg:px-20 bg-background">
      <Separator className="h-0.5 bg-primary" />
      <div className="w-full flex flex-row justify-between items-start py-6 sm:py-10">
        <span className="font-black tracking-tight text-primary text-sm sm:text-base">
          SNGKR
        </span>
        <span className="text-xs text-primary">© 2024 SNGKR</span>
      </div>
    </footer>
  );
};

export default Footer;
