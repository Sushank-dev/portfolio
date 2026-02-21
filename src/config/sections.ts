export type SectionConfig = {
  id: string;
  label: string;
  href: string;
  shortcut: string;
};

export const sectionConfigs: SectionConfig[] = [
  { id: "about", label: "About", href: "#about", shortcut: "1" },
  { id: "projects", label: "Work", href: "#projects", shortcut: "2" },
  { id: "skills", label: "Skills", href: "#skills", shortcut: "3" },
  { id: "experience", label: "Journey", href: "#experience", shortcut: "4" },
  { id: "contact", label: "Contact", href: "#contact", shortcut: "5" },
];
