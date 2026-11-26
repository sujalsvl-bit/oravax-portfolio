import { Component, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './CameraController';
import { GardenEnvironment } from './GardenEnvironment';
import { ServiceObjects } from './ServiceObjects';
import { GalleryMeadow3D } from './GalleryMeadow3D';
import { ReviewTree3D } from './ReviewTree3D';
import { GardenShed3D } from './GardenShed3D';

interface GardenCanvasProps {
  reducedMotion: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('WebGL initialization error caught, falling back to 2D garden:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function GardenCanvas({ reducedMotion }: GardenCanvasProps) {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-auto"
      aria-hidden="true"
    >
      <WebGLErrorBoundary fallback={<div className="hidden" />}>
        <Canvas
          dpr={[1, 2]}
          camera={{
            fov: 35,
            near: 0.1,
            far: 120,
            position: [0, 3.5, 9],
          }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
          }}
        >
          <CameraController reducedMotion={reducedMotion} />
          <GardenEnvironment reducedMotion={reducedMotion} />
          <ServiceObjects reducedMotion={reducedMotion} />
          <GalleryMeadow3D />
          <ReviewTree3D />
          <GardenShed3D />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
