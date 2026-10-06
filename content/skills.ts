import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  {
    label: "Comfortable",
    skills: [
      { name: "Python", level: "comfortable", projectSlugs: ["deepfruit"] },
      { name: "C++", level: "comfortable" },
      { name: "Java", level: "comfortable" },
      { name: "MySQL", level: "comfortable" },
      { name: "Figma", level: "comfortable", projectSlugs: ["fontdale-mall"] },
    ],
  },
  {
    label: "Used in projects",
    skills: [
      {
        name: "TensorFlow",
        level: "used-in-projects",
        projectSlugs: ["deepfruit"],
      },
      {
        name: "Keras",
        level: "used-in-projects",
        projectSlugs: ["deepfruit"],
      },
      {
        name: "MobileNetV2",
        level: "used-in-projects",
        projectSlugs: ["deepfruit"],
      },
      {
        name: "Transfer Learning",
        level: "used-in-projects",
        projectSlugs: ["deepfruit"],
      },
      {
        name: "Data Augmentation",
        level: "used-in-projects",
        projectSlugs: ["deepfruit"],
      },
      {
        name: "Computer Vision",
        level: "used-in-projects",
        projectSlugs: ["deepfruit"],
      },
    ],
  },
  {
    label: "Learning",
    skills: [{ name: "Next.js", level: "learning" }],
  },
];
