export type ProjectStatus =
  "Live" | "Not deployed" | "In progress" | "Archived";
export type ProjectType = "academic" | "personal" | "team" | "individual";
export type ProjectVisibility = "published" | "draft" | "hidden";
export type SkillLevel = "comfortable" | "used-in-projects" | "learning";

export interface ProjectLink {
  label: string;
  url: string;
  type: "live" | "repository" | "figma" | "writeup";
}

export interface ProjectMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectTechnology {
  name: string;
  verified: boolean;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  year: number | string;
  role?: string;
  teamSize?: number;
  technologies: ProjectTechnology[];
  links?: ProjectLink[];
  media?: ProjectMedia[];
  order: number;
  featured: boolean;
  visibility: ProjectVisibility;
  verified: boolean;
}
