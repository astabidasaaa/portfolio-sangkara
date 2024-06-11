"use client";

import React, { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Navbar from "./navbar";
import AnimatedText2 from "./animatedText2";
import Footer from "./footer";

interface IChildren {
  children: React.ReactNode;
}

const InnerLayout = ({ children }: IChildren) => {
  const [isInitialRender, setInitialRender] = useState<boolean>(false);

  const pathName = usePathname();

  useLayoutEffect(() => {
    setInitialRender((prev) => true);
    const loadingTimeOut = setTimeout(
      () => setInitialRender((prev) => false),
      3000
    );

    return () => clearTimeout(loadingTimeOut);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isInitialRender ? (
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.1 }}
          key="loading"
        >
          <LoadingOnFirstLoad />
        </motion.div>
      ) : (
        <motion.div
          className="relative h-full w-full overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.5 }}
          key="main-body"
        >
          <Navbar />
          <PageTransition key={pathName}>{children}</PageTransition>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InnerLayout;

const PageTransition = ({ children }: IChildren) => {
  const pathName = usePathname();
  const [isPageLoading, setPageLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    const loadingTimeOut = setTimeout(() => {
      setPageLoading((prev) => false);
    }, 700);

    return () => clearTimeout(loadingTimeOut);
  }, [pathName]);

  return (
    <AnimatePresence mode="wait">
      {isPageLoading ? (
        <LoadingOnPageChange />
      ) : (
        <>
          <motion.main
            className="flex min-h-screen flex-col items-start justify-start px-4 sm:px-10 md:px-16 lg:px-20 pt-20 sm:pt-36"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.75 }}
          >
            {children}
          </motion.main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
};

const LoadingOnFirstLoad = () => {
  return (
    <div className="flex min-h-screen flex-col items-end justify-end px-4 sm:px-10 md:px-16 lg:px-20 py-20">
      <AnimatedText2 />
    </div>
  );
};

const LoadingOnPageChange = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <Loader2 className="size-32 animate-spin text-primary" />
    </motion.div>
  );
};
