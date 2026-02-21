import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

function Particles() {
  const { theme } = useTheme();
  const ref = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const count = isMobile ? 300 : 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.02;
    ref.current.rotation.y = time * 0.03;

    const { pointer } = state;
    mouseRef.current.x += (pointer.x * 0.3 - mouseRef.current.x) * 0.03;
    mouseRef.current.y += (pointer.y * 0.3 - mouseRef.current.y) * 0.03;
    ref.current.position.x = mouseRef.current.x;
    ref.current.position.y = mouseRef.current.y;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={theme === "dark" ? "#c9a96e" : "#a8612e"}
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingMesh() {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.06;
    meshRef.current.rotation.y = time * 0.09;
    meshRef.current.position.y = Math.sin(time * 0.4) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color={theme === "dark" ? "#d4622b" : "#c9a96e"}
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <Particles />
          <FloatingMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
