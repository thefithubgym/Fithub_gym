export default function PerformanceFramework() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl px-container-margin mx-auto flex flex-col lg:flex-row gap-2xl items-center">
        <div className="flex-1 space-y-xl">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-background mb-md uppercase tracking-tight">
              The Elite Performance Framework
            </h2>
            <p className="font-body-lg text-body-lg text-secondary">
              Our methodology is rooted in sports science and adapted for the everyday athlete. We focus on four core pillars to build resilient, powerful bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
            {/* Pillar 1 */}
            <div className="flex gap-md">
              <div className="mt-1">
                <span className="material-symbols-outlined text-primary-container text-[28px]">directions_run</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-background mb-xs uppercase tracking-wider">Biomechanics</h4>
                <p className="font-body-md text-sm text-secondary">Mastering movement patterns before adding load to prevent injury.</p>
              </div>
            </div>
            {/* Pillar 2 */}
            <div className="flex gap-md">
              <div className="mt-1">
                <span className="material-symbols-outlined text-primary-container text-[28px]">bolt</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-background mb-xs uppercase tracking-wider">Power Output</h4>
                <p className="font-body-md text-sm text-secondary">Developing explosive strength through Olympic lifts and plyometrics.</p>
              </div>
            </div>
            {/* Pillar 3 */}
            <div className="flex gap-md">
              <div className="mt-1">
                <span className="material-symbols-outlined text-primary-container text-[28px]">monitor_heart</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-background mb-xs uppercase tracking-wider">Conditioning</h4>
                <p className="font-body-md text-sm text-secondary">Targeted energy system development for sustained endurance.</p>
              </div>
            </div>
            {/* Pillar 4 */}
            <div className="flex gap-md">
              <div className="mt-1">
                <span className="material-symbols-outlined text-primary-container text-[28px]">self_improvement</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-background mb-xs uppercase tracking-wider">Recovery</h4>
                <p className="font-body-md text-sm text-secondary">Active regeneration protocols to optimize adaptation and growth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spinning decorative frame surrounding gallery3.jpeg */}
        <div className="flex-1 w-full relative">
          <div className="aspect-square w-full max-w-md mx-auto rounded-full border border-outline-variant flex items-center justify-center relative overflow-hidden p-lg">
            <div className="absolute inset-0 border border-primary-container/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute inset-xl border border-outline-variant rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>
            <div
              className="w-full h-full rounded-full bg-cover bg-center grayscale contrast-125 mix-blend-luminosity opacity-80"
              style={{ backgroundImage: "url('/assets/gallery/gallery3.jpeg')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-surface/80 to-transparent rounded-full mix-blend-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
