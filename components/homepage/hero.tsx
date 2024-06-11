"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animatedText";
import { Separator } from "@/components/ui/separator";

const HeroSection = () => {
  return (
    <div className="fixed left-0 right-0 px-4 sm:px-10 md:px-16 lg:px-20 w-full h-[80vh] z-0">
      <div className="w-full text-primary">
        <motion.h1
          className="my-10 md:my-14 xl:my-20 text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-black uppercase tracking-tight text-wrap break-words text-primary leading-[2.5rem] sm:leading-[3rem] md:leading-[4.7rem] xl:leading-[6.5rem]"
          initial={{ scale: 1.5, x: "30%", y: 20 }}
          animate={{ scale: 1, x: 0, y: 0 }}
          transition={{ delay: 1, type: "tween" }}
        >
          Welcome
          <br />
          to my
          <br />
          portfolio.
        </motion.h1>
        <AnimatedText
          text={[
            "Hi, I'm Sangkara, a passionate and dedicated Next.js developer with 3 years of professional experience. I specialize in building fast, scalable, and user-friendly web applications.",
          ]}
          className="text-xl md:text-3xl lg:text-4xl md:text-justify my-5 md:my-8"
          repeatDelay={20000}
          animation={{
            hidden: { opacity: 0, y: -8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.01,
                duration: 0.01,
              },
            },
          }}
        />
        <Separator className="my-5 md:my-8 h-0.5 bg-primary" />
        <div className="w-full grid md:grid-cols-3 gap-3 md:gap-12 text-base md:text-xl lg:text-2xl font-medium">
          <div className="">
            <span>Send me messages, make sure there are a lot of them to </span>
            <a
              href="https://gmail.com"
              rel="noopener noreferrer"
              target="_blank"
              className="underline hover:no-underline"
            >
              myemail@gmail.com
            </a>
          </div>
          <div className="">
            <span>Visit my full profile on </span>
            <a
              href="https://linkedin.com"
              rel="noopener noreferrer"
              target="_blank"
              className="underline hover:no-underline"
            >
              LinkedIn
            </a>
          </div>
          <div className="">
            <span>Or you can check out my other hobbies on </span>
            <a
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
              className="underline hover:no-underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
