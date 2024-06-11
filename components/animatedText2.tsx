import React, { useEffect, useRef } from "react";
import { useAnimation, useInView, motion } from "framer-motion";

const AnimatedText2 = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      controls.start("visible");
      timeout = setTimeout(async () => {
        await controls.start("hidden");
        controls.start("visible");
      }, 20000);
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <motion.div
      className="flex flex-col justify-end items-end text-primary mb-10 sm:mb-0"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { transition: { delayChildren: 1, staggerChildren: 0.4 } },
        hidden: {},
      }}
      aria-hidden
    >
      <motion.span
        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[30px] sm:leading-[48px] md:leading-[72px]"
        key="first-row"
        variants={{
          hidden: {
            opacity: 0,
            y: 12,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.04,
            },
          },
        }}
      >
        SANGKARA
      </motion.span>
      <motion.span
        className="flex flex-row justify-end items-end gap-2 sm:gap-4"
        key="second-row"
        variants={{
          hidden: {
            opacity: 0,
            y: 12,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.04,
            },
          },
        }}
      >
        <span className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[30px] sm:leading-[48px] md:leading-[72px]">
          ASTABIDASA
        </span>
        <span className="flex flex-col text-xs sm:text-sm md:text-base font-bold h-full tracking-tight leading-3 sm:leading-3 md:leading-4">
          <span className="hidden sm:block">Website</span>
          <span className="hidden sm:block">Developer</span>
          <span>Portfolio</span>
        </span>
      </motion.span>
    </motion.div>
  );
};

export default AnimatedText2;
