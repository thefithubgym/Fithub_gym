export default function StandardOfExcellence() {
  return (
    <section className="py-16 bg-surface-container-lowest" id="training">
      <div className="max-w-7xl px-container-margin mx-auto space-y-2xl">
        <div className="text-center space-y-sm max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-background uppercase tracking-tight">
            The Standard of Excellence
          </h2>
          <p className="font-body-md text-body-md text-secondary">
            We don't do basic. Every square foot is optimized for peak performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          {/* Premium Equipment (Large) */}
          <div className="col-span-1 md:col-span-8 bg-surface-container border border-outline-variant rounded-xl overflow-hidden group relative min-h-[400px]">
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center opacity-100 md:opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundImage: "url('/assets/gallery/gallery1.jpeg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/80 to-transparent"></div>
            </div>
            <div className="relative z-10 p-xl h-full flex flex-col justify-end">
              <div className="w-12 h-12 rounded-lg bg-surface border border-outline-variant flex items-center justify-center mb-md text-primary-container">
                <span className="material-symbols-outlined">fitness_center</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-sm">Premium Equipment</h3>
              <p className="font-body-md text-body-md text-secondary max-w-lg">
                Competition-grade Eleiko bars, custom plate-loaded machines, and advanced biomechanical rigs. No compromises.
              </p>
            </div>
          </div>

          {/* Expert Coaches (Small) */}
          <div className="col-span-1 md:col-span-4 bg-surface-container border border-outline-variant rounded-xl p-xl flex flex-col justify-between hover:border-outline transition-colors group min-h-[250px]">
            <div className="w-12 h-12 rounded-lg bg-surface border border-outline-variant flex items-center justify-center text-primary-container self-start">
              <span className="material-symbols-outlined">sports</span>
            </div>
            <div className="mt-xl">
              <h3 className="font-headline-md text-[20px] font-semibold text-on-background mb-xs">Expert Coaches</h3>
              <p className="font-body-md text-body-md text-secondary text-sm">
                Former collegiate athletes and certified strength specialists dedicated to optimizing your form and programming.
              </p>
            </div>
          </div>

          {/* 24/7 Access (Small) */}
          <div className="col-span-1 md:col-span-5 bg-surface-container border border-outline-variant rounded-xl p-xl flex flex-col justify-between hover:border-outline transition-colors group min-h-[250px]">
            <div className="w-12 h-12 rounded-lg bg-surface border border-outline-variant flex items-center justify-center text-primary-container self-start">
              <span className="material-symbols-outlined">key</span>
            </div>
            <div className="mt-xl">
              <h3 className="font-headline-md text-[20px] font-semibold text-on-background mb-xs">24/7 Elite Access</h3>
              <p className="font-body-md text-body-md text-secondary text-sm">
                Secure, biometric entry systems. Train on your schedule, day or night, without restriction.
              </p>
            </div>
          </div>

          {/* Luxury Amenities (Medium) */}
          <div className="col-span-1 md:col-span-7 bg-surface-container border border-outline-variant rounded-xl overflow-hidden group relative min-h-[250px]">
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center opacity-100 md:opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundImage: "url('/assets/gallery/gallery2.jpeg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container via-surface-container/90 to-transparent"></div>
            </div>
            <div className="relative z-10 p-xl h-full flex flex-col justify-center w-full md:w-2/3">
              <div className="w-12 h-12 rounded-lg bg-surface border border-outline-variant flex items-center justify-center mb-md text-primary-container self-start">
                <span className="material-symbols-outlined">spa</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-sm">Recovery &amp; Amenities</h3>
              <p className="font-body-md text-body-md text-secondary">
                Infrared saunas, cold plunge therapy, and executive locker rooms stocked with premium grooming products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
