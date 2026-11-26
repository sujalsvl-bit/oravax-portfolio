import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { services } from '../../data/services';

interface ServiceObjectsProps {
  reducedMotion: boolean;
}

interface ServiceMetadata {
  id: string;
  pos: [number, number, number];
  markerY: number;
  label: string;
}

export function ServiceObjects({ reducedMotion }: ServiceObjectsProps) {
  const swayGroupRef = useRef<THREE.Group>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const [nearestIndex, setNearestIndex] = useState<number | null>(null);

  // Accurate 3D positions along the stone path
  const serviceItems: ServiceMetadata[] = [
    { id: 'audit-30-day', pos: [-2.8, 0, -4.0], markerY: 1.45, label: services[0]?.brassLabel || 'Potting bench: Account audit' },
    { id: 'core-ad-management', pos: [2.8, 0, -4.5], markerY: 2.7, label: services[1]?.brassLabel || 'Greenhouse: Core ad management' },
    { id: 'second-advertising-platform', pos: [4.8, 0, -5.5], markerY: 0.95, label: services[2]?.brassLabel || 'Raised bed: Second platform' },
    { id: 'tracking-implementation', pos: [-4.8, 0, -6.0], markerY: 1.35, label: services[3]?.brassLabel || 'Irrigation pipes: Tracking implementation' },
    { id: 'ai-creative-pack', pos: [-2.6, 0, -10.5], markerY: 0.95, label: services[4]?.brassLabel || 'Lavender cold-frame: AI creative pack' },
    { id: 'management-creative', pos: [2.8, 0, -11.0], markerY: 1.45, label: services[5]?.brassLabel || 'Greenhouse annex: Management + creative' },
    { id: 'youtube-ads', pos: [-3.2, 0, -15.5], markerY: 2.75, label: services[6]?.brassLabel || 'Tall sunflower: YouTube ads' },
    { id: 'linkedin-ads', pos: [3.2, 0, -16.0], markerY: 2.35, label: services[7]?.brassLabel || 'Trellis & vine: LinkedIn ads' },
    { id: 'reddit-ads', pos: [-3.2, 0, -18.5], markerY: 0.95, label: services[8]?.brassLabel || 'Stone bench & pond: Reddit ads' },
    { id: 'x-ads', pos: [3.0, 0, -19.0], markerY: 2.1, label: services[9]?.brassLabel || 'Bird feeder: X ads' },
    { id: 'seo', pos: [-2.8, 0, -21.5], markerY: 1.25, label: services[10]?.brassLabel || 'Herb spiral: SEO' },
    { id: 'aeo', pos: [2.8, 0, -22.0], markerY: 1.45, label: services[11]?.brassLabel || 'Beehive: AEO' },
    { id: 'geo', pos: [0, 0, -24.5], markerY: 2.4, label: services[12]?.brassLabel || 'Lantern window: GEO' },
  ];

  const scrollToCard = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Find the single nearest object to camera on each frame
  useFrame(({ camera, clock }) => {
    let minDistance = Infinity;
    let closest: number | null = null;

    const camPos = camera.position;

    for (let i = 0; i < serviceItems.length; i++) {
      const item = serviceItems[i];
      const dx = camPos.x - item.pos[0];
      const dy = camPos.y - item.pos[1];
      const dz = camPos.z - item.pos[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < minDistance) {
        minDistance = dist;
        closest = i;
      }
    }

    // Only display label when within 10 units range of the nearest object
    if (minDistance <= 10.5) {
      if (nearestIndex !== closest) {
        setNearestIndex(closest);
      }
    } else {
      if (nearestIndex !== null) {
        setNearestIndex(null);
      }
    }

    // Subtle natural sway and lantern flame flicker
    if (!reducedMotion) {
      const t = clock.getElapsedTime();
      if (swayGroupRef.current) {
        swayGroupRef.current.rotation.z = Math.sin(t * 1.0) * 0.008;
      }
      if (lanternLightRef.current) {
        lanternLightRef.current.intensity = 1.4 + Math.sin(t * 7) * 0.15;
      }
    }
  });

  const activeItem = nearestIndex !== null ? serviceItems[nearestIndex] : null;

  return (
    <group ref={swayGroupRef}>
      {/* 1. Potting Bench: Account audit */}
      <group position={serviceItems[0].pos} onClick={() => scrollToCard('audit-30-day')}>
        {/* Slatted bottom shelf with compost sacks */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.04, 0.8]} />
          <meshStandardMaterial color="#4A3728" roughness={0.88} />
        </mesh>
        <mesh position={[-0.4, 0.35, 0]} castShadow>
          <boxGeometry args={[0.5, 0.16, 0.4]} />
          <meshStandardMaterial color="#2E241A" roughness={0.92} />
        </mesh>

        {/* 4 Sturdy timber legs */}
        {[-0.78, 0.78].map((lx, i) =>
          [-0.34, 0.34].map((lz, j) => (
            <mesh key={`pbench-leg-${i}-${j}`} position={[lx, 0.45, lz]} castShadow>
              <boxGeometry args={[0.08, 0.9, 0.08]} />
              <meshStandardMaterial color="#3E2D20" roughness={0.88} />
            </mesh>
          ))
        )}

        {/* Galvanized Zinc Worktop with Timber Edging */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.9]} />
          <meshStandardMaterial color="#7D8385" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.96, -0.42]} castShadow>
          <boxGeometry args={[1.8, 0.08, 0.04]} />
          <meshStandardMaterial color="#4A3728" roughness={0.85} />
        </mesh>

        {/* Terracotta garden pots with rolled rims & potting soil */}
        <mesh position={[-0.45, 1.05, 0.1]} castShadow>
          <cylinderGeometry args={[0.13, 0.09, 0.22, 12]} />
          <meshStandardMaterial color="#B85635" roughness={0.8} />
        </mesh>
        <mesh position={[-0.45, 1.15, 0.1]}>
          <circleGeometry args={[0.11, 10]} />
          <meshStandardMaterial color="#35251A" roughness={0.9} />
        </mesh>

        <mesh position={[0.3, 1.02, -0.15]} castShadow>
          <cylinderGeometry args={[0.1, 0.07, 0.18, 12]} />
          <meshStandardMaterial color="#B85635" roughness={0.8} />
        </mesh>

        {/* Wooden Seed Germination Tray with Seedlings */}
        <mesh position={[0.2, 0.98, 0.18]} castShadow>
          <boxGeometry args={[0.5, 0.08, 0.35]} />
          <meshStandardMaterial color="#4E3B2C" roughness={0.85} />
        </mesh>
        <mesh position={[0.2, 1.03, 0.18]}>
          <boxGeometry args={[0.46, 0.02, 0.31]} />
          <meshStandardMaterial color="#3E5C2A" roughness={0.7} />
        </mesh>

        {/* Brass Garden Hand Trowel */}
        <mesh position={[-0.1, 0.96, 0.2]} rotation={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.22, 0.02, 0.05]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* 2. Greenhouse: Core ad management */}
      <group position={serviceItems[1].pos} onClick={() => scrollToCard('core-ad-management')}>
        {/* Red Brick Dwarf Wall Foundation */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.6, 2.2]} />
          <meshStandardMaterial color="#784435" roughness={0.9} />
        </mesh>

        {/* Dark Forest-Green Structural Frame */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[2.42, 1.4, 2.22]} />
          <meshStandardMaterial
            color="#203622"
            wireframe
          />
        </mesh>

        {/* Realistic Clear Glass Panes */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[2.38, 1.38, 2.18]} />
          <meshStandardMaterial
            color="#D8EAF2"
            transparent
            opacity={0.22}
            roughness={0.08}
            metalness={0.1}
          />
        </mesh>

        {/* Pitched Gable Glass Roof */}
        <mesh position={[0, 2.35, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[1.7, 1.7, 2.2]} />
          <meshStandardMaterial
            color="#D8EAF2"
            transparent
            opacity={0.25}
            roughness={0.08}
          />
        </mesh>
        {/* Ridge vent opener bar */}
        <mesh position={[0, 3.15, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 2.22]} />
          <meshStandardMaterial color="#203622" roughness={0.8} />
        </mesh>

        {/* Lush potted citrus / tomato plants visible inside greenhouse */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.65, 8, 8]} />
          <meshStandardMaterial color="#355823" roughness={0.8} />
        </mesh>
        <mesh position={[0.5, 0.65, 0.3]} castShadow>
          <sphereGeometry args={[0.45, 8, 8]} />
          <meshStandardMaterial color="#4A7530" roughness={0.8} />
        </mesh>
      </group>

      {/* 3. Second raised bed: Second platform */}
      <group position={serviceItems[2].pos} onClick={() => scrollToCard('second-advertising-platform')}>
        {/* Heavy Cedar Timber Raised Bed */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.44, 1.2]} />
          <meshStandardMaterial color="#553E2D" roughness={0.88} />
        </mesh>
        {/* Rich Mounded Soil */}
        <mesh position={[0, 0.44, 0]} receiveShadow>
          <boxGeometry args={[2.05, 0.05, 1.05]} />
          <meshStandardMaterial color="#35261B" roughness={0.92} />
        </mesh>
        {/* Rows of Leafy Crops (Cabbage & Herb Heads) */}
        {[-0.6, -0.2, 0.2, 0.6].map((cx, idx) => (
          <group key={`crop-${idx}`}>
            <mesh position={[cx, 0.54, -0.25]} castShadow>
              <sphereGeometry args={[0.15, 6, 6]} />
              <meshStandardMaterial color="#456B2D" roughness={0.8} />
            </mesh>
            <mesh position={[cx, 0.54, 0.25]} castShadow>
              <sphereGeometry args={[0.14, 6, 6]} />
              <meshStandardMaterial color="#558037" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 4. Irrigation pipes: Tracking implementation */}
      <group position={serviceItems[3].pos} onClick={() => scrollToCard('tracking-implementation')}>
        {/* Timber Mounting Post */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.14, 1.2, 0.14]} />
          <meshStandardMaterial color="#4A3728" roughness={0.88} />
        </mesh>
        {/* Polished Copper Manifold Header */}
        <mesh position={[0.15, 0.85, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.1, 10]} />
          <meshStandardMaterial color="#B87333" metalness={0.75} roughness={0.35} />
        </mesh>
        {/* Brass Quarter-Turn Ball Valves with Red Handles */}
        {[-0.3, 0.3].map((vx, idx) => (
          <group key={`valve-${idx}`} position={[0.15, 0.85 + vx, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0.04, 0.04, 0]} castShadow>
              <boxGeometry args={[0.08, 0.02, 0.02]} />
              <meshStandardMaterial color="#B22222" roughness={0.5} />
            </mesh>
          </group>
        ))}
        {/* Brass Pressure Gauge with Glass Face */}
        <mesh position={[0.15, 1.25, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.04, 14]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.15, 1.25, 0.022]}>
          <circleGeometry args={[0.075, 14]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* 5. Lavender area with glass cold-frame: AI creative pack */}
      <group position={serviceItems[4].pos} onClick={() => scrollToCard('ai-creative-pack')}>
        {/* Low Cedar Sloping Cold-Frame */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.44, 1.1]} />
          <meshStandardMaterial color="#553E2D" roughness={0.88} />
        </mesh>
        {/* Propped-open Glazed Glass Lid */}
        <mesh position={[0, 0.54, 0.1]} rotation={[-0.35, 0, 0]} castShadow>
          <boxGeometry args={[1.52, 0.04, 1.12]} />
          <meshStandardMaterial
            color="#D8EAF2"
            transparent
            opacity={0.28}
            roughness={0.1}
          />
        </mesh>
        {/* Timber Stay Prop */}
        <mesh position={[0.65, 0.45, 0.35]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.03, 0.35, 0.03]} />
          <meshStandardMaterial color="#4A3728" roughness={0.85} />
        </mesh>
        {/* Dense English Lavender Bushes */}
        {[
          { x: -1.2, z: -0.4 },
          { x: -1.2, z: 0.4 },
          { x: 1.2, z: -0.4 },
          { x: 1.2, z: 0.4 },
        ].map((lp, idx) => (
          <group key={`lavender-${idx}`} position={[lp.x, 0, lp.z]}>
            <mesh position={[0, 0.28, 0]} castShadow>
              <sphereGeometry args={[0.32, 6, 6]} />
              <meshStandardMaterial color="#4E6D38" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.52, 0]} castShadow>
              <coneGeometry args={[0.22, 0.35, 6]} />
              <meshStandardMaterial color="#68568F" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 6. Greenhouse annex: Management + creative */}
      <group position={serviceItems[5].pos} onClick={() => scrollToCard('management-creative')}>
        {/* Lean-to Glazed Cold-Frame Annex */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#D8EAF2"
            transparent
            opacity={0.25}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[1.82, 1.22, 1.22]} />
          <meshStandardMaterial color="#203622" wireframe />
        </mesh>
        {/* Sloping Glass Roof */}
        <mesh position={[0, 1.45, 0]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[1.82, 0.04, 1.35]} />
          <meshStandardMaterial
            color="#D8EAF2"
            transparent
            opacity={0.3}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 7. Tall sunflower: YouTube ads */}
      <group position={serviceItems[6].pos} onClick={() => scrollToCard('youtube-ads')}>
        {/* Botanical Thick Stalk */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.08, 2.4, 8]} />
          <meshStandardMaterial color="#426628" roughness={0.8} />
        </mesh>
        {/* Broad Alternating Heart-shaped Leaves */}
        {[-0.6, 0.0, 0.6].map((ly, idx) => (
          <group key={`sunleaf-${idx}`} position={[0, 1.0 + ly, 0]}>
            <mesh
              position={[idx % 2 === 0 ? 0.35 : -0.35, 0, 0]}
              rotation={[0, 0, idx % 2 === 0 ? -0.4 : 0.4]}
              castShadow
            >
              <coneGeometry args={[0.18, 0.45, 4]} />
              <meshStandardMaterial color="#3B5D23" roughness={0.78} />
            </mesh>
          </group>
        ))}
        {/* Large Golden Sunflower Head Tilted to Morning Sun */}
        <group position={[0, 2.4, 0]} rotation={[0.4, 0.2, 0]}>
          {/* Dark Chocolate Seed Disc */}
          <mesh position={[0, 0, 0.04]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.08, 16]} />
            <meshStandardMaterial color="#2C1B10" roughness={0.92} />
          </mesh>
          {/* Radiating Golden Yellow Petals */}
          <mesh castShadow>
            <cylinderGeometry args={[0.62, 0.62, 0.04, 18]} />
            <meshStandardMaterial color="#F2AC1B" roughness={0.65} />
          </mesh>
        </group>
      </group>

      {/* 8. Trellis with climbing vine: LinkedIn ads */}
      <group position={serviceItems[7].pos} onClick={() => scrollToCard('linkedin-ads')}>
        {/* Two Cedar Trellis Posts */}
        <mesh position={[-0.8, 1.2, 0]} castShadow>
          <boxGeometry args={[0.1, 2.4, 0.1]} />
          <meshStandardMaterial color="#4A3728" roughness={0.88} />
        </mesh>
        <mesh position={[0.8, 1.2, 0]} castShadow>
          <boxGeometry args={[0.1, 2.4, 0.1]} />
          <meshStandardMaterial color="#4A3728" roughness={0.88} />
        </mesh>
        {/* Diamond Lattice Trellis Screen */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.5, 2.0, 0.03]} />
          <meshStandardMaterial color="#553E2D" wireframe />
        </mesh>
        {/* Intertwined Grapevine Foliage & Tendrils */}
        {[
          { x: -0.3, y: 1.6, z: 0.04 },
          { x: 0.2, y: 1.2, z: 0.04 },
          { x: -0.1, y: 0.8, z: 0.04 },
          { x: 0.4, y: 1.8, z: 0.04 },
        ].map((vp, idx) => (
          <mesh key={`vine-${idx}`} position={[vp.x, vp.y, vp.z]} castShadow>
            <sphereGeometry args={[0.22, 6, 6]} />
            <meshStandardMaterial color="#355822" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 9. Stone bench by the pond: Reddit ads */}
      <group position={serviceItems[8].pos} onClick={() => scrollToCard('reddit-ads')}>
        {/* Carved Architectural Sandstone Bench */}
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.09, 0.48]} />
          <meshStandardMaterial color="#8E8679" roughness={0.82} />
        </mesh>
        {/* Two Classical Pedestal Bench Legs */}
        {[-0.55, 0.55].map((bx, idx) => (
          <mesh key={`bleg-${idx}`} position={[bx, 0.22, 0]} castShadow>
            <boxGeometry args={[0.18, 0.44, 0.38]} />
            <meshStandardMaterial color="#827B6E" roughness={0.85} />
          </mesh>
        ))}
        {/* Stone-Rimmed Reflection Pond */}
        <group position={[0, 0, 1.4]}>
          <mesh position={[0, 0.02, 0]} receiveShadow>
            <cylinderGeometry args={[1.2, 1.25, 0.04, 16]} />
            <meshStandardMaterial color="#1C3532" metalness={0.2} roughness={0.08} />
          </mesh>
          <mesh position={[0, 0.04, 0]} receiveShadow>
            <torusGeometry args={[1.2, 0.08, 6, 16]} />
            <meshStandardMaterial color="#6B6458" roughness={0.88} />
          </mesh>
          {/* Water Lily Pad */}
          <mesh position={[0.3, 0.045, 0.2]}>
            <circleGeometry args={[0.18, 8]} />
            <meshStandardMaterial color="#385826" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 10. Bird feeder: X ads */}
      <group position={serviceItems[9].pos} onClick={() => scrollToCard('x-ads')}>
        {/* Turned Rustic Oak Post */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 1.6, 8]} />
          <meshStandardMaterial color="#4A3728" roughness={0.88} />
        </mesh>
        {/* Hexagonal Feeding Table Platform */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.36, 0.36, 0.05, 6]} />
          <meshStandardMaterial color="#553E2D" roughness={0.85} />
        </mesh>
        {/* Hexagonal Corner Pillars */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = (i * Math.PI) / 3;
          return (
            <mesh
              key={`bpillar-${i}`}
              position={[Math.cos(ang) * 0.28, 1.8, Math.sin(ang) * 0.28]}
              castShadow
            >
              <cylinderGeometry args={[0.02, 0.02, 0.35, 6]} />
              <meshStandardMaterial color="#4A3728" roughness={0.85} />
            </mesh>
          );
        })}
        {/* Pitched Cedar Shake Roof & Finial */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <coneGeometry args={[0.42, 0.32, 6]} />
          <meshStandardMaterial color="#3E2C1E" roughness={0.8} />
        </mesh>
      </group>

      {/* 11. Herb spiral: SEO */}
      <group position={serviceItems[10].pos} onClick={() => scrollToCard('seo')}>
        {/* Ascending Dry-Stone Spiral Retaining Wall */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.3, 1.5, 0.5, 14]} />
          <meshStandardMaterial color="#7D7568" roughness={0.9} />
        </mesh>
        <mesh position={[0.2, 0.55, -0.1]} castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 1.0, 0.45, 12]} />
          <meshStandardMaterial color="#726B5E" roughness={0.9} />
        </mesh>
        <mesh position={[0.3, 0.82, -0.2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.45, 0.55, 0.38, 10]} />
          <meshStandardMaterial color="#686155" roughness={0.9} />
        </mesh>
        {/* Mediterranean Herbs (Rosemary, Thyme, Sage) */}
        {[
          { x: 0.3, y: 1.05, z: -0.2, c: '#2E4A28' }, // Top: Rosemary
          { x: -0.2, y: 0.75, z: 0.2, c: '#486835' }, // Mid: Sage
          { x: -0.6, y: 0.48, z: -0.3, c: '#3D5A2B' },// Low: Thyme
        ].map((hb, idx) => (
          <mesh key={`herb-${idx}`} position={[hb.x, hb.y, hb.z]} castShadow>
            <sphereGeometry args={[0.2, 6, 6]} />
            <meshStandardMaterial color={hb.c} roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 12. Beehive: AEO */}
      <group position={serviceItems[11].pos} onClick={() => scrollToCard('aeo')}>
        {/* Timber Splayed Stand */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.4, 0.7]} />
          <meshStandardMaterial color="#4A3728" roughness={0.88} />
        </mesh>
        {/* Cedar Brood Box */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.65, 0.32, 0.65]} />
          <meshStandardMaterial color="#553E2D" roughness={0.85} />
        </mesh>
        {/* Two Shallow Honey Supers */}
        <mesh position={[0, 0.82, 0]} castShadow>
          <boxGeometry args={[0.63, 0.22, 0.63]} />
          <meshStandardMaterial color="#5C4533" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.02, 0]} castShadow>
          <boxGeometry args={[0.63, 0.18, 0.63]} />
          <meshStandardMaterial color="#5C4533" roughness={0.85} />
        </mesh>
        {/* Pitched Gabled Roof with Copper Ridge Flashing */}
        <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[0.55, 0.55, 0.7]} />
          <meshStandardMaterial color="#443224" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.55, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.72]} />
          <meshStandardMaterial color="#B87333" metalness={0.7} roughness={0.35} />
        </mesh>
      </group>

      {/* 13. Greenhouse window with glowing lantern: GEO */}
      <group position={serviceItems[12].pos} onClick={() => scrollToCard('geo')}>
        {/* Weathered Brick Wall Section with Stone Coping */}
        <mesh position={[0, 1.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.2, 2.6, 0.4]} />
          <meshStandardMaterial color="#784435" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.65, 0]} receiveShadow>
          <boxGeometry args={[3.3, 0.12, 0.48]} />
          <meshStandardMaterial color="#948C7F" roughness={0.82} />
        </mesh>
        {/* Arched Multi-Pane Greenhouse Window */}
        <mesh position={[0, 1.5, 0.21]}>
          <planeGeometry args={[1.2, 1.4]} />
          <meshBasicMaterial color="#3A4E58" />
        </mesh>
        {/* Wrought Iron Wall Scroll Bracket */}
        <mesh position={[0, 1.7, 0.35]} castShadow>
          <boxGeometry args={[0.04, 0.3, 0.28]} />
          <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Vintage Hexagonal Brass Lantern */}
        <mesh position={[0, 1.55, 0.52]} castShadow>
          <cylinderGeometry args={[0.1, 0.14, 0.28, 6]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.3} />
        </mesh>
        {/* Glowing Amber Lantern Glass & Point Light */}
        <mesh position={[0, 1.55, 0.52]}>
          <cylinderGeometry args={[0.08, 0.11, 0.22, 6]} />
          <meshBasicMaterial color="#FFAE42" />
        </mesh>
        <pointLight
          ref={lanternLightRef}
          position={[0, 1.55, 0.65]}
          color="#FFB347"
          intensity={1.5}
          distance={4}
        />
      </group>

      {/* 
        Single Nearest Object Brass Plant Marker
        Requirement 5: Show a label only for the object nearest the camera.
        Minimum 16px readable font, zero overlap, styled as authentic engraved brass stake.
      */}
      {activeItem && (
        <group position={activeItem.pos}>
          {/* Authentic Brass Stake Stand */}
          <mesh position={[0, activeItem.markerY - 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
            <meshStandardMaterial color="#2B1E12" roughness={0.9} />
          </mesh>
          <mesh position={[0, activeItem.markerY, 0]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[1.4, 0.35, 0.03]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* HTML Overlay: Single nearest brass marker at 16px minimum */}
          <Html position={[0, activeItem.markerY + 0.15, 0]} center distanceFactor={10} zIndexRange={[50, 0]}>
            <button
              type="button"
              onClick={() => scrollToCard(activeItem.id)}
              className="px-4 py-2 rounded bg-[#E5D3B3] text-[#2A1E14] border-2 border-[#9C7A3C] text-[16px] leading-tight font-serif font-medium shadow-md whitespace-nowrap cursor-pointer hover:bg-[#F3E3C6] hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-deep"
              aria-label={`View details for ${activeItem.label}`}
            >
              {activeItem.label}
            </button>
          </Html>
        </group>
      )}
    </group>
  );
}
