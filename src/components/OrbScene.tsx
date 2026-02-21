import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

function CoreOrb() {
  const meshRef = useRef<Mesh | null>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.35, 6]} />
      <MeshDistortMaterial
        color="#16e0d9"
        roughness={0.1}
        metalness={0.55}
        distort={0.35}
        speed={1.8}
      />
    </mesh>
  );
}

function OrbitRings() {
  const groupRef = useRef<Group | null>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.18;
    groupRef.current.rotation.x += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.25, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ff7a18" emissive="#ff7a18" emissiveIntensity={0.45} />
      </mesh>
      <mesh rotation={[0.2, 1.2, 1]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshStandardMaterial color="#9be8ff" emissive="#9be8ff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default function OrbScene() {
  return (
    <div className="h-[360px] w-full rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-xl sm:h-[460px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#020306"]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 4, 4]} intensity={2} color="#ff7a18" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#16e0d9" />
        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
          <CoreOrb />
        </Float>
        <OrbitRings />
      </Canvas>
    </div>
  );
}
