import React from "react";
import Projects from "@/db/projects.json";
import ProjectTemplate from "./project-template";

const ProjectSection = () => {
  return (
    <div className="w-full z-10 bg-background pb-16">
      <h2 className="mb-8 md:mb-10 xl:mb-14 text-5xl sm:text-4xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-wrap text-primary">
        PROJECTS
      </h2>
      <div className="flex flex-col gap-10 md:gap-16 w-full justify-start items-center">
        {Projects &&
          Projects.map((project, index) => {
            return <ProjectTemplate key={index} project={project} />;
          })}
      </div>
    </div>
  );
};

export default ProjectSection;
