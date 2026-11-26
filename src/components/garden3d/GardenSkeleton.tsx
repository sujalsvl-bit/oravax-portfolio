export function GardenSkeleton() {
  return (
    <div
      className="fixed inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-b from-sky-top to-sky-horizon pointer-events-none transition-opacity duration-700"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Animated Sprout Skeleton */}
        <div className="w-12 h-12 text-leaf-mid animate-pulse">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            {/* Mound */}
            <ellipse cx="24" cy="40" rx="14" ry="4" fill="#5B4636" fillOpacity="0.4" />
            {/* Stem */}
            <path
              d="M24 40V24"
              stroke="#5E8C4A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left Leaf */}
            <path
              d="M24 28C18 24 16 16 22 14C26 18 25 25 24 28Z"
              fill="#A9C77A"
            />
            {/* Right Leaf */}
            <path
              d="M24 24C30 20 32 12 26 10C22 14 23 21 24 24Z"
              fill="#5E8C4A"
            />
          </svg>
        </div>
        <span className="text-xs font-serif text-leaf-deep/60 tracking-wider">
          Preparing garden...
        </span>
      </div>
    </div>
  );
}
