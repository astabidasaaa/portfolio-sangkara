import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Variants, motion } from "framer-motion";

interface IProject {
  id: string;
  title: string;
  description: string;
  key_features: string[];
  skills: string[];
  link: {
    label: string;
    thumbnail_image: string;
    url: string;
  };
}

const titleVariants: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const cardVariants: Variants = {
  offscreen: {
    y: 160,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const ProjectTemplate = ({ project }: { project: IProject }) => {
  const [isExpandDescription, setExpandDescription] = useState<boolean>(false);

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={titleVariants}
      className="flex flex-col justify-start items-start w-full p-4 md:p-8 border-4 lg:border-8 border-primary rounded-2xl"
    >
      <motion.h3
        variants={titleVariants}
        className="mb-4 md:mb-8 xl:mb-10 text-2xl md:text-4xl xl:text-5xl font-bold uppercase tracking-tight text-wrap text-primary"
      >
        {project.title}
      </motion.h3>
      <motion.div
        variants={cardVariants}
        className=" w-full flex flex-col md:flex-row justify-start items-start gap-8 lg:gap-16"
      >
        <div className="flex flex-col md:max-w-[50%] gap-8 md:gap-12">
          <a
            href={project.link.url}
            className="flex flex-col justify-start items-start text-primary gap-4 group"
          >
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                src={`/static/projects/${project.link.thumbnail_image}`}
                alt={`Thumbnail of ${project.title}`}
                width={480}
                height={240}
                className="w-full group-hover:scale-105 transition-all ease-in-out duration-500 delay-200"
              />
              <div className="absolute top-0 w-full h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-all z-20 flex justify-center items-center">
                <span className="bg-background opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 size-24 rounded-full flex justify-center items-center font-bold">
                  Visit <ArrowTopRightIcon className="size-4" />
                </span>
              </div>
            </div>
          </a>
          <div className="flex flex-row flex-wrap justify-start gap-x-1 gap-y-1 w-full">
            {project.skills.map((skill, index) => {
              return (
                <div
                  key={`${project.id}-skill-${index}`}
                  className="text-sm md:text-sm xl:text-lg inline-flex items-center rounded-full px-4 md:px-6 py-1 md:py-2 font-semibold transition-colors focus:outline-none focus:bg-primary/80 bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col md:max-w-[60%]">
          <div
            className={`project-description mb-2 ${
              isExpandDescription ? "line-clamp-none" : "line-clamp-6"
            }`}
          >
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: project.description }}
            ></div>
            <p className="!font-medium">Key Features</p>
            <ul className="project-keyFeatures-list ml-5 sm:ml-8 list-disc list-outside">
              {project.key_features.map((feature, index) => {
                return (
                  <li key={`${project.id}-features-${index}`}>{feature}</li>
                );
              })}
            </ul>
          </div>
          <Button
            variant="link"
            className="w-max p-0 text-xl md:text-2xl xl:text-3xl font-regular xl:mb-10 leading-relaxed md:leading-relaxed xl:leading-relaxed"
            onClick={() => setExpandDescription((prev) => !prev)}
          >
            {isExpandDescription ? "See less" : "See more"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectTemplate;
