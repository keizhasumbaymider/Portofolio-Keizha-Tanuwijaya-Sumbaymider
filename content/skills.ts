import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  {
    label: "Programming",
    skills: [
      { name: "Python", level: "comfortable" },
      { name: "C++", level: "comfortable" },
      { name: "Java", level: "comfortable" },
      { name: "JavaScript", level: "comfortable" },
    ],
  },
  {
    label: "Web Development",
    skills: [
      { name: "HTML", level: "comfortable" },
      { name: "CSS", level: "comfortable" },
      { name: "React", level: "comfortable" },
      { name: "Next.js", level: "comfortable" },
    ],
  },
  {
    label: "Database",
    skills: [
      { name: "MySQL", level: "comfortable" },
    ],
  },
  {
    label: "ML / Computer Vision",
    skills: [
      { name: "MobileNetV2", level: "used-in-projects", projectSlugs: ["deepfruit"] },
      { name: "Transfer Learning", level: "used-in-projects", projectSlugs: ["deepfruit"] },
      { name: "OpenCV", level: "used-in-projects", projectSlugs: ["deepfruit"] },
      { name: "MediaPipe", level: "used-in-projects", projectSlugs: ["deepfruit"] },
    ],
  },
  {
    label: "UI / UX",
    skills: [
      { name: "Figma", level: "comfortable", projectSlugs: ["fontdale-mall"] },
      { name: "UI/UX Design", level: "comfortable" },
      { name: "Prototyping", level: "comfortable" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", level: "comfortable" },
      { name: "GitHub", level: "comfortable" },
      { name: "VS Code", level: "comfortable" },
      { name: "Vercel", level: "comfortable" },
      { name: "Figma", level: "comfortable" },
      { name: "Antigravity", level: "comfortable" },
    ],
  },
];
