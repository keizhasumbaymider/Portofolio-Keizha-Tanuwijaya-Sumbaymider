export interface EducationEntry {
  institution: string;
  degree: string | null;
  field: string;
  period: string | null;
  expectedGraduation: string | null;
  gpa: string | null;
  relevantCoursework?: string[];
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  period: string;
  description: string;
  type:
    "internship" | "organization" | "competition" | "certificate" | "volunteer";
}

export const education: EducationEntry = {
  institution: "BINUS University",
  degree: null,
  field: "Software Engineering",
  period: null,
  expectedGraduation: null,
  gpa: null,
};

export const experienceEntries: ExperienceEntry[] = [];
