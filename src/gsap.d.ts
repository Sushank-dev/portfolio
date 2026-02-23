declare module "gsap" {
  export const gsap: {
    registerPlugin: (...plugins: unknown[]) => void;
    to: (
      target: unknown,
      vars: Record<string, unknown>
    ) => { kill: () => void };
    fromTo: (
      target: unknown,
      fromVars: Record<string, unknown>,
      toVars: Record<string, unknown>
    ) => { kill: () => void };
    timeline: (config?: Record<string, unknown>) => {
      to: (target: unknown, vars: Record<string, unknown>, position?: number) => unknown;
      kill: () => void;
    };
  };
}

declare module "gsap/ScrollTrigger" {
  export const ScrollTrigger: {
    create: (config: Record<string, unknown>) => { kill: () => void };
    getAll: () => Array<{
      trigger: Element | null;
      kill: () => void;
    }>;
  };
}

declare module "@react-three/postprocessing" {
  import type { ReactNode } from "react";
  export function EffectComposer(props: {
    children?: ReactNode;
    multisampling?: number;
  }): JSX.Element;
  export function Bloom(props: {
    luminanceThreshold?: number;
    luminanceSmoothing?: number;
    intensity?: number;
  }): JSX.Element;
  export function Vignette(props: {
    darkness?: number;
    offset?: number;
  }): JSX.Element;
}
