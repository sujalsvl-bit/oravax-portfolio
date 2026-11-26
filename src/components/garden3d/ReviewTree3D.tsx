import { useState, useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { reviews, type Review } from '../../data/reviews';

interface ReviewTree3DProps {
  reducedMotion?: boolean;
}

// Generate 50 natural leaf coordinates distributed organically through the tree canopy
function generateLeafPositions(count: number) {
  const leaves = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);

    // Vary radius between 1.15 and 1.85 for natural organic canopy volume
    const radius = 1.2 + (Math.sin(i * 3.7) * 0.5 + 0.5) * 0.65;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = 2.4 + radius * Math.cos(phi) * 0.75;
    const z = radius * Math.sin(phi) * Math.sin(theta);

    // Natural organic color variants (deep leaf green, mid green, light green)
    const colorVariant =
      i % 3 === 0 ? '#4A6B35' : i % 3 === 1 ? '#2E4C26' : '#638541';

    leaves.push({ x, y, z, color: colorVariant, phase: (i * 0.618) % (Math.PI * 2) });
  }
  return leaves;
}

export function ReviewTree3D({ reducedMotion = false }: ReviewTree3DProps) {
  const [activeReviewIndex, setActiveReviewIndex] = useState<number | null>(null);
  const [isNear, setIsNear] = useState(false);
  const leafRefs = useRef<Array<THREE.Group | null>>([]);
  const leafButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const canopyRef = useRef<THREE.Group>(null);

  const totalLeaves = 50;
  const leafData = useMemo(() => generateLeafPositions(totalLeaves), [totalLeaves]);

  // Keyboard navigation when a review card is open
  useEffect(() => {
    if (activeReviewIndex === null || reviews.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const closedIndex = activeReviewIndex;
        setActiveReviewIndex(null);
        setTimeout(() => {
          leafButtonRefs.current[closedIndex]?.focus();
        }, 50);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveReviewIndex((prev) =>
          prev !== null ? (prev + 1) % reviews.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveReviewIndex((prev) =>
          prev !== null ? (prev - 1 + reviews.length) % reviews.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReviewIndex]);

  // Gentle wind sway & distance proximity check
  useFrame(({ camera, clock }) => {
    const dx = camera.position.x - (-2.8);
    const dy = camera.position.y - 0;
    const dz = camera.position.z - (-47.0);
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const near = dist < 14.0;
    if (near !== isNear) {
      setIsNear(near);
    }

    if (reducedMotion) return;
    const t = clock.getElapsedTime();

    if (canopyRef.current) {
      canopyRef.current.rotation.y = Math.sin(t * 0.35) * 0.015;
    }

    leafRefs.current.forEach((ref, idx) => {
      if (ref) {
        const phase = leafData[idx]?.phase || 0;
        ref.rotation.z = Math.sin(t * 1.4 + phase) * 0.06;
        ref.rotation.x = Math.cos(t * 1.1 + phase) * 0.05;
      }
    });
  });

  const activeReview: Review | null =
    activeReviewIndex !== null && reviews[activeReviewIndex]
      ? reviews[activeReviewIndex]
      : null;

  const scrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <group position={[-2.8, 0, -47.0]}>
      {/* Root mound with rich soil */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.7, 0.4, 14]} />
        <meshStandardMaterial color="#4A3728" roughness={0.92} />
      </mesh>

      {/* Realistic mature oak/apple tree trunk */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.44, 2.6, 12]} />
        <meshStandardMaterial color="#503E2F" roughness={0.88} />
      </mesh>

      {/* Buttress root flares */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
        <mesh
          key={`root-${i}`}
          position={[Math.cos(angle) * 0.45, 0.3, Math.sin(angle) * 0.45]}
          rotation={[0.3 * Math.sin(angle), angle, 0.3 * Math.cos(angle)]}
          castShadow
        >
          <cylinderGeometry args={[0.08, 0.22, 0.8, 8]} />
          <meshStandardMaterial color="#443427" roughness={0.9} />
        </mesh>
      ))}

      {/* Sculpted realistic structural branches */}
      <group>
        <mesh position={[-0.55, 2.3, 0]} rotation={[0, 0, -0.6]} castShadow>
          <cylinderGeometry args={[0.12, 0.18, 1.5, 8]} />
          <meshStandardMaterial color="#503E2F" roughness={0.88} />
        </mesh>
        <mesh position={[0.55, 2.4, 0.1]} rotation={[0.1, 0, 0.58]} castShadow>
          <cylinderGeometry args={[0.11, 0.17, 1.4, 8]} />
          <meshStandardMaterial color="#503E2F" roughness={0.88} />
        </mesh>
        <mesh position={[0, 2.8, 0.3]} rotation={[0.5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.14, 1.3, 8]} />
          <meshStandardMaterial color="#503E2F" roughness={0.88} />
        </mesh>
        <mesh position={[-0.1, 2.7, -0.3]} rotation={[-0.48, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.09, 0.14, 1.3, 8]} />
          <meshStandardMaterial color="#503E2F" roughness={0.88} />
        </mesh>
      </group>

      {/* 50 Interactive Leaves Canopy */}
      <group ref={canopyRef}>
        {leafData.map((leaf, index) => {
          const review = reviews[index % reviews.length];
          const isSelected = activeReviewIndex === index % reviews.length;

          return (
            <group
              key={index}
              ref={(el) => {
                leafRefs.current[index] = el;
              }}
              position={[leaf.x, leaf.y, leaf.z]}
            >
              {/* 3D Leaf Mesh */}
              <mesh
                castShadow
                scale={isSelected ? [1.4, 1.4, 1.4] : [1, 1, 1]}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveReviewIndex(index % reviews.length);
                }}
              >
                <coneGeometry args={[0.12, 0.28, 5]} />
                <meshStandardMaterial
                  color={isSelected ? '#E8A33D' : leaf.color}
                  roughness={0.7}
                />
              </mesh>

              {/* Accessible HTML button anchor for keyboard focus */}
              <Html distanceFactor={14} center>
                <button
                  ref={(btn) => {
                    leafButtonRefs.current[index] = btn;
                  }}
                  type="button"
                  aria-label={`Open review from ${review?.company || 'client'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveReviewIndex(index % reviews.length);
                  }}
                  className="w-4 h-4 rounded-full cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:bg-[#E8A33D] focus-visible:ring-2 focus-visible:ring-leaf-deep"
                />
              </Html>
            </group>
          );
        })}
      </group>

      {/* Brass Plant Marker at Base of Tree */}
      {isNear && (
        <group position={[0, 0, 1.2]}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
            <meshStandardMaterial color="#2B1E12" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.95, 0]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[1.5, 0.35, 0.03]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
          </mesh>
          <Html position={[0, 1.05, 0]} center distanceFactor={11}>
            <button
              type="button"
              onClick={scrollToReviews}
              className="px-4 py-2 rounded bg-[#E5D3B3] text-[#2A1E14] border-2 border-[#9C7A3C] text-[16px] leading-tight font-serif font-medium shadow-md whitespace-nowrap cursor-pointer hover:bg-[#F3E3C6] hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-deep"
            >
              {`Review tree: ${reviews.length} endorsements`}
            </button>
          </Html>
        </group>
      )}

      {/* Open Review Card Modal when active */}
      {activeReview && (
        <Html position={[0, 2.6, 2.2]} center distanceFactor={9} zIndexRange={[100, 0]}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Review from ${activeReview.company}`}
            className="w-[340px] sm:w-[420px] max-w-[92vw] bg-[#FFFBF0] rounded-[16px] border-2 border-[#5E8C4A] shadow-2xl p-6 space-y-4 text-left text-[#1F2A1F] pointer-events-auto"
          >
            {/* Header: sourceLabel badge and Close button */}
            <div className="flex items-center justify-between gap-2 border-b border-leaf-mid/20 pb-2.5">
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-sans font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
                {activeReview.sourceLabel}
              </span>
              <button
                type="button"
                onClick={() => {
                  const idx = activeReviewIndex ?? 0;
                  setActiveReviewIndex(null);
                  setTimeout(() => leafButtonRefs.current[idx]?.focus(), 50);
                }}
                className="min-h-[36px] px-3 py-1 text-xs text-muted hover:text-leaf-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded font-medium cursor-pointer"
                aria-label="Close review card"
              >
                Close (Esc)
              </button>
            </div>

            {/* Quote with max 65ch width */}
            <blockquote className="text-xs sm:text-sm font-serif italic text-[#1F2A1F] leading-relaxed max-w-[65ch]">
              "{activeReview.quote}"
            </blockquote>

            {/* Author Attribution and Date */}
            <div className="pt-2.5 border-t border-leaf-mid/15 flex items-end justify-between text-xs">
              <div>
                {activeReview.personName ? (
                  <div className="font-serif font-semibold text-leaf-deep text-sm">
                    {activeReview.personName}
                  </div>
                ) : null}
                <div className="text-muted text-[11px]">
                  {activeReview.role ? `${activeReview.role}, ` : ''}
                  {activeReview.company}
                </div>
              </div>
              <span className="text-[11px] text-muted font-sans font-medium">
                {activeReview.date}
              </span>
            </div>

            {/* Keyboard Arrow Navigation Hints */}
            <div className="flex items-center justify-between pt-2 text-[11px] text-muted border-t border-leaf-mid/10">
              <button
                type="button"
                onClick={() =>
                  setActiveReviewIndex(
                    (prev) => (prev !== null ? (prev - 1 + reviews.length) % reviews.length : 0)
                  )
                }
                className="hover:text-leaf-deep p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded cursor-pointer"
              >
                ← Previous
              </button>
              <span className="font-sans">
                {(activeReviewIndex ?? 0) + 1} of {reviews.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveReviewIndex(
                    (prev) => (prev !== null ? (prev + 1) % reviews.length : 0)
                  )
                }
                className="hover:text-leaf-deep p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-mid rounded cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
