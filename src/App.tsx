import { useState, useEffect, lazy, Suspense } from 'react';
import { SkipToContent } from './components/SkipToContent';
import { Header } from './components/Header';
import { GateSection } from './components/GateSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { FAQSection } from './components/FAQSection';
import { PoliciesSection } from './components/PoliciesSection';
import { GallerySection } from './components/GallerySection';
import { ReviewTreeSection } from './components/ReviewTreeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { JsonLd } from './components/JsonLd';
import { GardenSkeleton } from './components/garden3d/GardenSkeleton';

// Lazy-load 3D Canvas
const GardenCanvas = lazy(() => import('./components/garden3d/GardenCanvas'));

function hasWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function App() {
  const [isSimpleView, setIsSimpleView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('oravax_simple_view');
      if (stored !== null) {
        return stored === 'true';
      }
      return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        (navigator.hardwareConcurrency !== undefined &&
          navigator.hardwareConcurrency <= 2)
      );
    }
    return false;
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [webGLAvailable, setWebGLAvailable] = useState<boolean>(true);

  const [expandedPolicyId, setExpandedPolicyId] = useState<string | null>(
    'policy-billing'
  );

  useEffect(() => {
    setWebGLAvailable(hasWebGLSupport());

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  // Handle hash scrolling on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.slice(1);
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      };
      // Immediate and short timeout to allow DOM and 3D canvas mount
      scrollToHash();
      const timer = setTimeout(scrollToHash, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleSimpleView = () => {
    setIsSimpleView((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('oravax_simple_view', String(next));
      }
      return next;
    });
  };

  const show3D = !isSimpleView && !reducedMotion && webGLAvailable;

  return (
    <div className="min-h-screen bg-cream text-ink font-sans selection:bg-leaf-light selection:text-ink relative">
      <JsonLd />
      <SkipToContent />
      <Header
        isSimpleView={isSimpleView}
        onToggleSimpleView={toggleSimpleView}
      />

      {/* 3D Scene Background (rendered when enabled) */}
      {show3D && (
        <Suspense fallback={<GardenSkeleton />}>
          <GardenCanvas reducedMotion={reducedMotion} />
        </Suspense>
      )}

      {/* Main Content Layer */}
      <main
        id="main-content"
        className={`relative z-10 transition-opacity duration-500 ${
          show3D ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 divide-y divide-leaf-mid/10">
          <div className="pointer-events-auto">
            <GateSection />
          </div>
          <div className="pointer-events-auto">
            <ServicesSection
              onSelectPolicy={(policyId) => setExpandedPolicyId(policyId)}
            />
          </div>
          <div className="pointer-events-auto">
            <PricingSection />
          </div>
          <div className="pointer-events-auto">
            <HowWeWorkSection />
          </div>
          <div className="pointer-events-auto">
            <FAQSection />
          </div>
          <div className="pointer-events-auto">
            <PoliciesSection
              expandedPolicyId={expandedPolicyId}
              onTogglePolicy={(id) =>
                setExpandedPolicyId((prev) => (prev === id ? null : id))
              }
            />
          </div>
          <div className="pointer-events-auto">
            <GallerySection />
          </div>
          <div className="pointer-events-auto">
            <ReviewTreeSection />
          </div>
          <div className="pointer-events-auto">
            <ContactSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
