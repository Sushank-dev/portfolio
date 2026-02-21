export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Software Developer",
    company: "Your Company",
    description:
      "Building and shipping production-grade web applications with modern frontend and backend technologies. Leading development of interactive user experiences.",
    technologies: ["React", "Node.js", "AWS", "MongoDB"],
  },
  {
    period: "2023 — 2024",
    role: "Full Stack Developer",
    company: "Previous Company",
    description:
      "Developed scalable web applications and RESTful APIs. Collaborated with cross-functional teams to deliver features from conception to deployment.",
    technologies: ["React", "Python", "Docker", "PostgreSQL"],
  },
  {
    period: "2022 — 2023",
    role: "Frontend Developer",
    company: "Startup Name",
    description:
      "Created responsive, accessible user interfaces and implemented complex animations. Optimized web performance and improved user engagement metrics.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    period: "2020 — 2022",
    role: "Computer Science Student",
    company: "University Name",
    description:
      "Studied computer science fundamentals, data structures, algorithms, and software engineering. Built academic and personal projects.",
    technologies: ["Python", "Java", "C++", "Git"],
  },
];
