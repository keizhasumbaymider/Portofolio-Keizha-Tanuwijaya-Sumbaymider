import type { SkillLevel } from "./project";

export interface Skill {
  name: string;
  level: SkillLevel;
  projectSlugs?: string[];
  note?: string;
}

export interface SkillGroup {
  label: string;
  skills: Skill[];
}
