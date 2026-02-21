export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "devops";
}

export const skills: Skill[] = [
  { name: "React", icon: "react", category: "frontend" },
  { name: "Three.js", icon: "threejs", category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend" },
  { name: "TypeScript", icon: "typescript", category: "frontend" },
  { name: "Framer Motion", icon: "framer", category: "frontend" },
  { name: "Node.js", icon: "nodejs", category: "backend" },
  { name: "Python", icon: "python", category: "backend" },
  { name: "MongoDB", icon: "mongodb", category: "backend" },
  { name: "Express", icon: "express", category: "backend" },
  { name: "Git", icon: "git", category: "devops" },
  { name: "Docker", icon: "docker", category: "devops" },
  { name: "AWS", icon: "aws", category: "devops" },
];

export const skillCategories = [
  { key: "frontend" as const, label: "Frontend" },
  { key: "backend" as const, label: "Backend" },
  { key: "devops" as const, label: "DevOps & Tools" },
];
