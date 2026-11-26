import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

export function GardenShed3D() {
  const [isNear, setIsNear] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useFrame(({ camera }) => {
    const dx = camera.position.x - 0;
    const dy = camera.position.y - 0;
    const dz = camera.position.z - (-53.0);
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const near = dist < 10;
    if (near !== isNear) {
      setIsNear(near);
    }
  });

  return (
    <group position={[0, 0, -53.0]} onClick={scrollToContact}>
      {/* Stone Foundation Plinth */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.24, 3.2]} />
        <meshStandardMaterial color="#888073" roughness={0.88} />
      </mesh>

      {/* Weathered Timber Weatherboard Shed Walls */}
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 2.2, 2.8]} />
        <meshStandardMaterial color="#4A3728" roughness={0.85} />
      </mesh>

      {/* Siding Planks Relief */}
      {[-0.6, -0.2, 0.2, 0.6, 1.0].map((py, idx) => (
        <mesh key={`plank-${idx}`} position={[0, 1.35 + py, 1.41]} castShadow>
          <boxGeometry args={[3.22, 0.04, 0.02]} />
          <meshStandardMaterial color="#3A2A1E" roughness={0.9} />
        </mesh>
      ))}

      {/* Slate Gabled Roof */}
      <mesh position={[0, 2.8, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[2.5, 2.5, 3.1]} />
        <meshStandardMaterial color="#2E4823" roughness={0.78} />
      </mesh>
      {/* Ridge Cap */}
      <mesh position={[0, 3.7, 0]} castShadow>
        <boxGeometry args={[0.15, 0.15, 3.14]} />
        <meshStandardMaterial color="#22361A" roughness={0.8} />
      </mesh>

      {/* Panelled Timber Door */}
      <mesh position={[-0.35, 1.15, 1.42]} castShadow>
        <boxGeometry args={[1.1, 1.9, 0.06]} />
        <meshStandardMaterial color="#5C4533" roughness={0.82} />
      </mesh>
      {/* Door Frame */}
      <mesh position={[-0.35, 1.15, 1.44]} castShadow>
        <boxGeometry args={[1.18, 1.98, 0.02]} />
        <meshStandardMaterial color="#3A2A1E" roughness={0.9} />
      </mesh>
      {/* Brass Door Knob */}
      <mesh position={[0.05, 1.15, 1.47]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} />
      </mesh>

      {/* Mullioned Window with Warm Interior Morning Glow */}
      <mesh position={[0.85, 1.45, 1.42]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.04]} />
        <meshStandardMaterial color="#1E1E1E" roughness={0.8} />
      </mesh>
      <mesh position={[0.85, 1.45, 1.43]}>
        <planeGeometry args={[0.62, 0.72]} />
        <meshBasicMaterial color="#FFE6B8" />
      </mesh>
      {/* Window Mullions */}
      <mesh position={[0.85, 1.45, 1.44]}>
        <boxGeometry args={[0.03, 0.72, 0.02]} />
        <meshStandardMaterial color="#3A2A1E" roughness={0.8} />
      </mesh>
      <mesh position={[0.85, 1.45, 1.44]}>
        <boxGeometry args={[0.62, 0.03, 0.02]} />
        <meshStandardMaterial color="#3A2A1E" roughness={0.8} />
      </mesh>

      {/* Exterior Garden Shelves with Terracotta Pots */}
      <mesh position={[-1.7, 0.75, 0.4]} castShadow>
        <boxGeometry args={[0.3, 0.05, 1.4]} />
        <meshStandardMaterial color="#4A3728" roughness={0.85} />
      </mesh>
      {[-0.35, 0.25].map((pz, idx) => (
        <mesh key={`shed-pot-${idx}`} position={[-1.7, 0.9, 0.4 + pz]} castShadow>
          <cylinderGeometry args={[0.1, 0.07, 0.18, 8]} />
          <meshStandardMaterial color="#B85635" roughness={0.82} />
        </mesh>
      ))}

      {/* Brass Plant Marker at Shed Entrance - visible only when nearby */}
      {isNear && (
        <group position={[0, 0, 2.0]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
            <meshStandardMaterial color="#2B1E12" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.88, 0]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[1.5, 0.35, 0.03]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
          </mesh>
          <Html position={[0, 0.95, 0]} center distanceFactor={11}>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-4 py-2 rounded bg-[#E5D3B3] text-[#2A1E14] border-2 border-[#9C7A3C] text-[16px] leading-tight font-serif font-medium shadow-md whitespace-nowrap cursor-pointer hover:bg-[#F3E3C6] hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-deep"
            >
              Garden shed: Contact
            </button>
          </Html>
        </group>
      )}
    </group>
  );
}
