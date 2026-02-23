export type Project = {
  title: string;
  summary: string;
  stack: string[];
  url: string;
  color: string;
};

export type TimelineItem = {
  period: string;
  role: string;
  details: string;
};

export const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Craft", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

export const projects: Project[] = [
  {
    title: "Velocity Commerce",
    summary:
      "Headless storefront with a cinematic product reveal and GPU-accelerated transitions.",
    stack: ["React", "TypeScript", "Framer Motion", "Node.js"],
    url: "#",
    color: "from-[#888888] to-[#444444]"
  },
  {
    title: "Pulse Analytics",
    summary:
      "Realtime observability dashboard that blends charts with narrative UI and live incident overlays.",
    stack: ["Next.js", "Tailwind", "WebSocket", "Prisma"],
    url: "#",
    color: "from-[#aaaaaa] to-[#555555]"
  },
  {
    title: "Orbit Studio",
    summary:
      "Interactive agency landing page using 3D objects, smooth camera choreography, and scroll-linked scenes.",
    stack: ["Three.js", "@react-three/fiber", "GSAP", "Vercel"],
    url: "#",
    color: "from-[#cccccc] to-[#666666]"
  }
];

export const timeline: TimelineItem[] = [
  {
    period: "2024 - Present",
    role: "Lead Frontend Engineer - Independent",
    details:
      "Shipped brand sites and product interfaces with strong motion systems and maintainable design architecture."
  },
  {
    period: "2022 - 2024",
    role: "Senior UI Engineer - Product Studio",
    details:
      "Led the component platform and animation framework used by four teams and 30+ client projects."
  },
  {
    period: "2020 - 2022",
    role: "Full-Stack Developer - SaaS Startup",
    details:
      "Built customer onboarding experiences and dashboard tooling with a Node.js API and React frontend."
  }
];

export const skillGroups = [
  "React.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "Figma to Code",
  "Performance Optimization",
  "Design Systems"
];
