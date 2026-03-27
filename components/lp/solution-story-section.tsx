import type { SolutionStory } from "@/lib/content"

interface SolutionStorySectionProps {
  story: SolutionStory
}

export function SolutionStorySection({ story }: SolutionStorySectionProps) {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#0a0a0a] text-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <p className="text-xs sm:text-sm tracking-[0.15em] uppercase text-[#06C755] mb-3 sm:mb-4">
          Solution
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight mb-3 sm:mb-4">
          {story.headline}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-12 sm:mb-16 md:mb-20 max-w-[640px]">
          {story.subheadline}
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-neutral-800" />

          <div className="space-y-10 sm:space-y-14 md:space-y-16">
            {story.steps.map((step, index) => (
              <div key={index} className="relative pl-12 sm:pl-14">
                {/* Step number dot */}
                <div className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#06C755] flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-bold text-white font-['Roboto']">
                    {index + 1}
                  </span>
                </div>

                {/* Connecting line highlight */}
                {index < story.steps.length - 1 && (
                  <div className="absolute left-4 sm:left-5 top-8 sm:top-10 w-px h-full bg-gradient-to-b from-[#06C755]/40 to-transparent" />
                )}

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-snug">
                  {step.label}
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 leading-[1.8]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
