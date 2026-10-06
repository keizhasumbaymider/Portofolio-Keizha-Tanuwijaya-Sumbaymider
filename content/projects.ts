import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "deepfruit",
    title: "DeepFruit",
    summary: "ML model that classifies fruit images as fresh or rotten.",
    description:
      "An academic machine learning project that uses transfer learning (MobileNetV2) to classify fruit images into Fresh or Rotten categories across Apple, Banana, and Orange. Built with TensorFlow and Keras, including data augmentation.",
    type: "team",
    media: [
      {
        src: "/images/projects/deepfruit/Deepfruit.png",
        alt: "DeepFruit freshness detection product interface",
        width: 1892,
        height: 902,
      },
    ],
    // TBD-06: individual role unknown — not included per honesty rule
    // role: undefined,
    // TBD-06: team size unknown
    // teamSize: undefined,
    status: "Live",
    year: 2024,
    technologies: [
      { name: "Python", verified: true },
      { name: "TensorFlow", verified: true },
      { name: "Keras", verified: true },
      { name: "MobileNetV2", verified: true },
      { name: "Transfer Learning", verified: true },
      { name: "Data Augmentation", verified: true },
      { name: "Computer Vision", verified: true },
    ],
    links: [
      {
        label: "Live site",
        url: "https://deepfruit-v717.vercel.app",
        type: "live",
      },
    ],
    order: 1,
    featured: true,
    visibility: "published",
    verified: false,
  },
  {
    slug: "fontdale-mall",
    title: "FontDale Mall",
    summary: "Mall information website with tenant directory and events.",
    description:
      "An academic web and UI/UX project presenting a modern mall experience: tenant directory, events, and facilities. Designed in Figma, then implemented as a website.",
    type: "academic",
    status: "Not deployed",
    year: 2024,
    media: [
      {
        src: "/images/projects/fontdale-mall/Fontdale.png",
        alt: "FontDale Mall project website preview",
        width: 1900,
        height: 902,
      },
    ],
    technologies: [
      { name: "Figma", verified: true },
      { name: "HTML", verified: true },
      { name: "CSS", verified: true },
      { name: "JavaScript", verified: true },
    ],
    order: 2,
    featured: true,
    visibility: "published",
    verified: false,
  },
  {
    slug: "well-desk",
    title: "Well-Desk",
    summary: "Academic project — details to be confirmed.",
    description: "",
    type: "academic",
    status: "Archived",
    year: 2024,
    technologies: [],
    order: 3,
    featured: false,
    visibility: "draft",
    verified: false,
  },
];

export function getPublishedProjects(): Project[] {
  return projects
    .filter((p) => p.visibility === "published")
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.visibility === "published");
}

export function getPublishedSlugs(): string[] {
  return projects
    .filter((p) => p.visibility === "published")
    .map((p) => p.slug);
}
