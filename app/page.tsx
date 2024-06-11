"use client";

import React from "react";
import HomeMarquee from "@/components/homeMarquee";
import HeroSection from "@/components/homepage/hero";
import ProjectSection from "@/components/homepage/projects";

const HomePage = () => {
  return (
    <>
      <div className="relative flex flex-col items-start justify-start w-full bg-background">
        <HeroSection />
        <div className="w-full h-[80vh]"></div>
        <HomeMarquee />
        <ProjectSection />
      </div>
    </>
  );
};

export default HomePage;
