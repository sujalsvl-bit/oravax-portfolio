interface GrowthStep {
  number: string;
  stageName: string;
  plantGrowthIcon: string;
  title: string;
  description: string;
}

const steps: GrowthStep[] = [
  {
    number: '01',
    stageName: 'Seed',
    plantGrowthIcon: 'Sprout',
    title: 'Talk',
    description: 'A short call about your business and goals.',
  },
  {
    number: '02',
    stageName: 'Seedling',
    plantGrowthIcon: 'Two leaves',
    title: 'Choose',
    description: 'Pick the service that fits. An audit is optional; you can go straight to management if you prefer.',
  },
  {
    number: '03',
    stageName: 'Bud',
    plantGrowthIcon: 'Stem and bud',
    title: 'Approve',
    description: 'You approve the scope, the quote and every ad before it launches.',
  },
  {
    number: '04',
    stageName: 'Bloom',
    plantGrowthIcon: 'Flower',
    title: 'Run and report',
    description: 'We manage the work and send a weekly report with a monthly review call for management clients.',
  },
];

export function HowWeWorkSection() {
  return (
    <section id="how-we-work" aria-labelledby="how-we-work-heading" className="py-20 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-3 p-6 sm:p-8 bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-leaf-light/30 text-leaf-deep border border-leaf-mid/30">
          Greenhouse Walk-Through
        </div>
        <h2 id="how-we-work-heading" className="text-3xl sm:text-4xl font-serif text-leaf-deep">
          How We Work
        </h2>
        <p className="text-base text-muted">
          Four natural plant-growth steps. Nothing is compulsory in order: you can start at whichever stage fits your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-[#FFFBF0] rounded-[16px] border border-leaf-mid/30 shadow-sm p-6 relative flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif font-bold text-leaf-mid/50">
                  {step.number}
                </span>
                <span className="text-xs font-sans text-muted bg-leaf-light/20 px-2 py-0.5 rounded-full border border-leaf-mid/20">
                  {step.stageName}
                </span>
              </div>

              <h3 className="text-xl font-serif text-leaf-deep font-semibold">
                {step.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-leaf-mid/20 flex items-center justify-between text-xs text-muted">
              <span>Flexible workflow</span>
              <span className="text-leaf-mid font-serif">Growth step</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
