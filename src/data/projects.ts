export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Project Alpha",
    description:
      "A full-stack web application with real-time collaboration features, built with modern technologies and deployed on cloud infrastructure.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "WebSocket"],
    liveUrl: "#",
    githubUrl: "#",
    color: "from-accent to-accent-secondary",
  },
  {
    id: 2,
    title: "Project Beta",
    description:
      "An interactive data visualization dashboard that transforms complex datasets into intuitive, animated charts and graphs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["React", "D3.js", "Python", "REST API"],
    liveUrl: "#",
    githubUrl: "#",
    color: "from-accent-secondary to-accent",
  },
  {
    id: 3,
    title: "Project Gamma",
    description:
      "A 3D immersive portfolio experience featuring interactive models, particle effects, and scroll-driven animations.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    tags: ["Three.js", "React", "Framer Motion", "GLSL"],
    liveUrl: "#",
    githubUrl: "#",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    title: "Project Delta",
    description:
      "A cloud-native microservices platform with automated CI/CD pipelines, monitoring, and containerized deployment.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
    tags: ["Docker", "AWS", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 5,
    title: "Project Epsilon",
    description:
      "An AI-powered content management system with intelligent categorization, search, and recommendation engine.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    tags: ["Python", "React", "TensorFlow", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    color: "from-amber-500 to-orange-600",
  },
];
