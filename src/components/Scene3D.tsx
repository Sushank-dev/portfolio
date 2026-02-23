import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface Scene3DProps {
  theme: "dark" | "light";
}

/* ────────────────────────────────────────
   Scene background + fog
   ──────────────────────────────────────── */
function SceneSetup({ dark }: { dark: boolean }) {
  const { scene } = useThree();

  useEffect(() => {
    const color = dark ? "#0a0a0a" : "#fafafa";
    scene.background = new THREE.Color(color);
    scene.fog = new THREE.Fog(color, 18, 45);
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene, dark]);

  return null;
}

/* ── Gravity Wave — InstancedMesh grid with sine undulation + mouse ripple ── */
function GravityWave({ dark }: { dark: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const cols = typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 55;
  const rows = cols;
  const count = cols * rows;
  const spacing = 0.25;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const grid = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (i % cols - cols / 2) * spacing,
      z: (Math.floor(i / cols) - rows / 2) * spacing,
    }));
  }, [count, cols, rows, spacing]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mesh.current) return;
    grid.forEach((pos, i) => {
      dummy.position.set(pos.x, 0, pos.z);
      dummy.scale.setScalar(0.03);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [grid, dummy]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const halfSpan = (cols * spacing) / 2;
    const mouseX = mouse.current.x * halfSpan;
    const mouseZ = -mouse.current.y * halfSpan;
    const amp = 0.35 * (1 - s * 0.6);

    grid.forEach((pos, i) => {
      let y = Math.sin(t * 0.5 + pos.x * 0.6 + pos.z * 0.4) * amp
            + Math.sin(t * 0.3 + pos.x * 0.3 - pos.z * 0.7) * amp * 0.4;

      const dx = pos.x - mouseX;
      const dz = pos.z - mouseZ;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 2.5) {
        const force = Math.pow((2.5 - dist) / 2.5, 2);
        y += force * 1.2;
      }

      const centerDist = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
      const maxRadius = halfSpan * 1.2;
      const edgeFade = Math.max(0, 1 - centerDist / maxRadius);
      const scale = 0.028 * edgeFade;

      dummy.position.set(pos.x, y, pos.z);
      dummy.scale.setScalar(Math.max(scale, 0.001));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={dark ? "#ffffff" : "#1a1a1a"}
        transparent
        opacity={dark ? 0.5 : 0.25}
      />
    </instancedMesh>
  );
}

/* ── Camera — gentle mouse parallax ── */
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [isMobile]);

  useFrame((_, delta) => {
    if (isMobile) return;
    const tx = mouse.current.x * 0.5;
    const ty = 4 + mouse.current.y * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Main Scene export ── */


/* ── Main Scene export ── */
export default function Scene3D({ theme }: Scene3DProps) {
  const dark = theme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 4, 12], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <SceneSetup dark={dark} />
        <CameraController />
        <GravityWave dark={dark} />
      </Canvas>
    </div>
  );
}
