import React from "react";
import { motion } from "framer-motion";
import { AlertTriangleIcon } from "lucide-react";

const marqueeVariants = {
  animate: {
    x: [-60, -2600],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 36,
        ease: "linear",
      },
    },
  },
};

const HomeMarquee = () => {
  return (
    <div className="relative w-full  pb-16 mt-24 -md:pb-24 overflow-x-hidden bg-background">
      <motion.div
        className="text-nowrap flex flex-row gap-6 font-bold uppercase py-4 bg-secondary text-primary w-max"
        variants={marqueeVariants}
        animate="animate"
      >
        <span>But truth be told, anyone can do it</span>
        <span>
          <AlertTriangleIcon />
        </span>
        <span>Please ignore this message</span>
        <span>
          <AlertTriangleIcon />
        </span>
        <span>
          It&lsquo;s simply to showcase that I can create dynamic running text
          like this
        </span>
        <span>—</span>
        <span>But truth be told</span>
        <span>—</span>
        <span>anyone can do it</span>
        <span>
          <AlertTriangleIcon />
        </span>
        <span>Please ignore this message</span>
        <span>
          <AlertTriangleIcon />
        </span>
        <span>
          It&lsquo;s simply to showcase that I can create dynamic running text
          like this
        </span>
        <span>—</span>
        <span>But truth be told, anyone can do it</span>
        <span>
          <AlertTriangleIcon />
        </span>
        <span>Please ignore this message</span>
        <span>
          <AlertTriangleIcon />
        </span>
        <span>
          It&lsquo;s simply to showcase that I can create dynamic running text
          like this
        </span>
        <span>—</span>
        <span>But truth be told, anyone can do it</span>
        <span>—</span>
      </motion.div>
    </div>
  );
};

export default HomeMarquee;
