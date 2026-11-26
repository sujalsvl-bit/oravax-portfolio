import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { galleryItems } from '../../data/gallery';

export function GalleryMeadow3D() {
  const [isNear, setIsNear] = useState(false);
  const verifiedItems = galleryItems.filter((i) => i.verified);

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useFrame(({ camera }) => {
    const dx = camera.position.x - 2.8;
    const dy = camera.position.y - 0;
    const dz = camera.position.z - (-41.0);
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const near = dist < 9.5;
    if (near !== isNear) {
      setIsNear(near);
    }
  });

  return (
    <group position={[2.8, 0, -41.0]} onClick={scrollToGallery}>
      {/* Wildflower Meadow Mound */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.6, 3.2, 0.44, 16]} />
        <meshStandardMaterial color="#3E5B2B" roughness={0.88} />
      </mesh>

      {/* Wildflower & Grass Tuft Clumps */}
      {[
        { x: -0.9, z: 0.7, c: '#C49A45' },
        { x: 0.8, z: 0.6, c: '#A65340' },
        { x: -0.6, z: -0.8, c: '#7B6DA8' },
        { x: 1.1, z: -0.5, c: '#C49A45' },
      ].map((tuft, idx) => (
        <mesh key={`tuft-${idx}`} position={[tuft.x, 0.48, tuft.z]} castShadow>
          <sphereGeometry args={[0.22, 6, 6]} />
          <meshStandardMaterial color={tuft.c} roughness={0.85} />
        </mesh>
      ))}

      {/* Dressed Stone Memorial Plinth */}
      <mesh position={[0, 0.4, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.8, 0.45]} />
        <meshStandardMaterial color="#888073" roughness={0.85} />
      </mesh>

      {/* Engraved Cast-Brass Plaque */}
      <mesh position={[0, 0.78, 0.63]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.4, 0.04]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Render HTML label only when camera is nearby */}
      {isNear && (
        <Html position={[0, 0.85, 0.65]} center distanceFactor={10}>
          <button
            type="button"
            onClick={scrollToGallery}
            className="px-4 py-2 rounded bg-[#E5D3B3] text-[#2A1E14] border-2 border-[#9C7A3C] text-[16px] leading-tight font-serif font-medium shadow-md whitespace-nowrap cursor-pointer hover:bg-[#F3E3C6] hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-deep"
          >
            {verifiedItems.length === 0
              ? 'Creative samples will appear here.'
              : `${verifiedItems.length} verified creative samples`}
          </button>
        </Html>
      )}
    </group>
  );
}
