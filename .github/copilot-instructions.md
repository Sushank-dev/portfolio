# Copilot Instructions — Sushank's Portfolio

## Project Overview
Interactive portfolio website for **Thatipelly Sushank** (Software Developer).
Built with React + TypeScript + Vite + Tailwind CSS + Three.js (React Three Fiber) + Framer Motion.

## Design System

### Color Palette (Warm Editorial — NOT neon/cyan/black)
| Token | Hex | Usage |
|---|---|---|
| `accent` | `#d4622b` | Burnt orange — primary accent, CTAs, highlights |
| `accent-secondary` | `#c9a96e` | Warm gold — secondary accent, subtle highlights |
| `surface-dark` | `#111010` | Warm black — dark mode background |
| `surface-dark-elevated` | `#1a1918` | Card/section backgrounds in dark |
| `surface-light` | `#f5f2ed` | Warm paper — light mode background |
| `foreground-dark` | `#ede9e3` | Warm off-white — body text in dark mode |
| `foreground-dark-muted` | `#8a8279` | Muted text, labels, borders |

### Typography
- **Display/Serif**: `Playfair Display` — hero headlines, section titles (italic for emphasis)
- **Headings**: `Syne` — navbar, subheadings, UI elements
- **Body**: `Inter` — paragraphs, descriptions
- **Mono**: `JetBrains Mono` — labels, tags, code-like elements

### Design Principles
1. **Editorial layout** — left-aligned, generous whitespace, typographic hierarchy
2. **Warm & organic** — no cold/neon colors, no generic developer portfolio aesthetic
3. **Subtle interactions** — magnetic cursor, smooth scroll, gentle hover states
4. **Section pattern**: accent line + mono label + Playfair Display italic heading

## Architecture

### Key Directories
```
src/
├── components/     # All UI components
├── context/        # ThemeContext (dark/light toggle)
├── hooks/          # useSmoothScroll, useMagneticEffect
├── utils/          # Framer Motion animation variants
├── data/           # Skills, projects, experience, social links
public/
├── models/         # 3D models (if any)
```

### Section Order
Preloader → Navbar → Hero → About → Skills → Projects → Experience → Contact → Footer

### Tech Stack
- **React 18** + TypeScript
- **Vite** build tool
- **Tailwind CSS** with custom design tokens
- **Framer Motion** for animations
- **@react-three/fiber** + **@react-three/drei** for 3D
- **Lenis** for smooth scrolling
- **Lucide React** for icons

## Coding Conventions
- Use Tailwind utility classes, NOT inline styles (except for dynamic values like Three.js)
- Animation variants are shared in `src/utils/animations.ts`
- Section headers follow pattern: accent line → mono label → display heading
- All section components are wrapped in `<SectionWrapper>` for scroll-triggered animations
- Dark mode via `darkMode: "class"` — use `dark:` prefix when needed
- Prefer `text-foreground-dark-muted` over `text-slate-*` or `text-gray-*`
- Use `border-foreground-dark-muted/10` for subtle borders, NOT `border-white/10`

## Important Notes
- PowerShell 6+ (pwsh) is NOT available — use `cmd /c` or ask user to run commands
- Projects and Experience data are templates — user fills in real data later
- 3D particle background uses warm gold (#c9a96e) particles + burnt orange wireframe
- Preloader has 2.2s delay; all subsequent animations are timed relative to this
