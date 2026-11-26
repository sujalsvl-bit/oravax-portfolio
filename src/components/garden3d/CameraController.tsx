import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  reducedMotion: boolean;
}

// Spline path traversing from Gate (start) through garden areas down to Shed (end)
const curvePoints = [
  new THREE.Vector3(0, 2.2, 6.5),     // Gate (entrance)
  new THREE.Vector3(0.5, 2.6, 1.0),   // Transition into beds
  new THREE.Vector3(-1.2, 2.8, -5.0), // Paid advertising area
  new THREE.Vector3(1.2, 2.8, -11.0), // AI creative area
  new THREE.Vector3(-0.8, 2.7, -17.0),// Other channels area
  new THREE.Vector3(0.6, 2.6, -23.0), // Pricing signboard wall
  new THREE.Vector3(-0.5, 2.6, -29.0),// How we work greenhouse
  new THREE.Vector3(0.5, 2.5, -35.0), // Policies fence
  new THREE.Vector3(1.2, 2.6, -41.0), // Gallery meadow
  new THREE.Vector3(-1.0, 2.6, -47.0),// Review tree
  new THREE.Vector3(0, 2.4, -53.0),   // Contact shed
];

const cameraCurve = new THREE.CatmullRomCurve3(curvePoints);

export function CameraController({ reducedMotion }: CameraControllerProps) {
  const { camera } = useThree();
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        targetProgress.current = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        isTouch.current = true;
        return;
      }
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useFrame((_, delta) => {
    // Smooth damping (approx 1.2 to 1.6s easing between areas)
    const dampingSpeed = reducedMotion ? 8 : 2.2;
    currentProgress.current = THREE.MathUtils.damp(
      currentProgress.current,
      targetProgress.current,
      dampingSpeed,
      delta
    );

    const point = cameraCurve.getPointAt(currentProgress.current);
    const lookAtPoint = cameraCurve.getPointAt(
      Math.min(1, currentProgress.current + 0.04)
    );

    // Subtle parallax on desktop only
    const parallaxX = (!reducedMotion && !isTouch.current) ? mouse.current.x * 0.25 : 0;
    const parallaxY = (!reducedMotion && !isTouch.current) ? mouse.current.y * 0.15 : 0;

    camera.position.set(
      point.x + parallaxX,
      point.y + parallaxY,
      point.z
    );

    camera.lookAt(lookAtPoint.x, lookAtPoint.y - 0.2, lookAtPoint.z);
  });

  return null;
}
