import { getSettings } from "@/features/settings/actions";

const excellenceCards = [
  {
    colSpan: "col-span-1 md:col-span-8",
    minHeight: "min-h-[400px]",
    icon: "fitness_center",
    title: "MODERN TRAINING EQUIPMENT",
    description: "Train with a complete range of modern strength machines, benches, cable stations, free weights, and squat racks designed for safe and effective workouts.",
    bgImage: "/assets/gallery/gallery1.webp",
    overlayClass: "bg-gradient-to-t from-surface-container via-surface-container/80 to-transparent",
    contentClass: "justify-end",
  },
  {
    colSpan: "col-span-1 md:col-span-4",
    minHeight: "min-h-[400px]",
    icon: "schedule",
    title: "CONVENIENT TIMINGS",
    description: "Flexible morning and evening sessions to suit your busy schedule, with separate batches dedicated for ladies.",
    bgImage: null,
    overlayClass: "",
    contentClass: "justify-start",
  },
  {
    colSpan: "col-span-1 md:col-span-4",
    minHeight: "min-h-[400px]",
    icon: "stars",
    title: "EXPERT TRAINING GUIDANCE",
    description: "Our certified gym trainers are always on the floor to guide you on form, posture, and technique to prevent injuries.",
    bgImage: null,
    overlayClass: "",
    contentClass: "justify-start",
  },
  {
    colSpan: "col-span-1 md:col-span-8",
    minHeight: "min-h-[400px]",
    icon: "groups",
    title: "SUPPORTIVE COMMUNITY",
    description: "Train alongside consistent and motivating members in an encouraging environment where fitness goals are taken seriously.",
    bgImage: "/assets/gallery/gallery3.webp",
    overlayClass: "bg-gradient-to-t from-surface-container via-surface-container/80 to-transparent",
    contentClass: "justify-end",
  },
];

export default async function StandardOfExcellence() {
  const settings = await getSettings();
  return (
    <section className="py-16 bg-surface-container-lowest bg-linear-to-b from-surface-container-lowest to-surface-container" id="training">
      <div className="max-w-7xl px-container-margin mx-auto space-y-lg">
        <div className="text-center space-y-sm max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-on-background uppercase tracking-tight">
            WHY CHOOSE {settings.gymName.toUpperCase()}
          </h2>
          <p className="font-body-md text-sm md:text-base text-secondary">
            Everything you need to achieve your fitness goals in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          {excellenceCards.map((card, idx) => {
            const hasBg = !!card.bgImage;
            return (
              <div
                key={idx}
                className={`${card.colSpan} ${card.minHeight} bg-surface-container border border-outline-variant rounded-xl group relative ${hasBg ? "overflow-hidden" : "p-xl flex flex-col hover:border-outline transition-colors"
                  }`}
              >
                {hasBg && (
                  <div className="absolute inset-0 z-0">
                    <div
                      className="w-full h-full bg-cover bg-center opacity-100 md:opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundImage: `url('${card.bgImage}')` }}
                    ></div>
                    <div className={`absolute inset-0 ${card.overlayClass}`}></div>
                  </div>
                )}

                <div
                  className={`relative z-10 p-xl h-full flex flex-col ${card.contentClass || ""
                    }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-surface border border-outline-variant flex items-center justify-center text-primary-container ${hasBg ? "mb-md" : "self-start"
                      }`}
                  >
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>

                  <div className={hasBg ? "" : "mt-xl"}>
                    <h3
                      className={`font-headline-md text-on-background ${hasBg ? "mb-sm text-headline-md" : "mb-xs text-[20px] font-semibold"
                        }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`font-body-md text-secondary ${hasBg ? "max-w-lg text-body-md" : "text-sm text-body-md"
                        }`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
