import React, { useEffect, useRef } from "react";
import { useAnimation, useInView, motion, Variant } from "framer-motion";

type AnimatedTextProps = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.05,
    },
  },
};

const AnimatedText = ({
  text,
  el: Wrapper = "div",
  className,
  once,
  repeatDelay,
  animation = defaultAnimations,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      controls.start("visible");
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { delayChildren: 2, staggerChildren: 1 } },
          hidden: {},
        }}
        // transition={{ }}
        aria-hidden
        className="relative w-full flex flex-wrap justify-start items-start"
      >
        {textArray.map((line, lineIndex) => (
          <motion.span
            className="flex flex-wrap justify-start items-start"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
            key={`${line}-${lineIndex}`}
          >
            {line.split(" ").map((word, wordIndex) => (
              <span
                className="flex flex-wrap justify-start items-start"
                key={`${word}-${wordIndex}`}
              >
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="flex flex-wrap justify-start items-start"
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="flex flex-wrap justify-start items-start">
                  &nbsp;
                </span>
              </span>
            ))}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
