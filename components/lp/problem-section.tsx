import Image from "next/image"
import type { Problem, IndustryId } from "@/lib/content"

interface ProblemSectionProps {
  problems?: Problem[]
  industry: IndustryId
}

export function ProblemSection({ problems, industry }: ProblemSectionProps) {
  if (industry !== "generic" && problems && problems.length > 0) {
    return <IndustryProblems problems={problems} />
  }

  return <GenericProblems />
}

function IndustryProblems({ problems }: { problems: Problem[] }) {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <p className="text-xs sm:text-sm tracking-[0.15em] uppercase text-neutral-400 mb-3 sm:mb-4">
          The Problem
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#1F2937] leading-tight mb-12 sm:mb-16 md:mb-20">
          アパレルDXを阻む
          <br />
          3つの構造的課題
        </h2>

        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {problems.map((problem, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start">
              <div>
                <span className="text-xs text-neutral-400 mb-2 block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1F2937] mb-3 sm:mb-4 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-500 leading-[1.8]">
                  {problem.description}
                </p>
              </div>

              {problem.stat && (
                <div className="flex-shrink-0 bg-neutral-50 rounded-xl p-4 sm:p-6 md:min-w-[180px] text-center">
                  <span className="block text-[32px] sm:text-[40px] md:text-[48px] font-extrabold text-[#1F2937] leading-none font-['Roboto'] tracking-tight">
                    {problem.stat.value}
                  </span>
                  <span className="block text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-2">
                    {problem.stat.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericProblems() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-8 sm:mb-12 md:mb-16">
          こんなお悩みありませんか？
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#E5E7EB] flex flex-col">
            <div className="flex-1 flex items-center justify-center bg-white rounded-lg">
              <Image
                src="/images/kadai1.png"
                alt="LINE友だちは増えたが活用できていない"
                width={400}
                height={300}
                className="w-full h-auto mx-auto"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#E5E7EB] flex flex-col">
            <div className="flex-1 flex items-center justify-center bg-white rounded-lg">
              <Image
                src="/images/kadai2.png"
                alt="SaaSでは機能が足りない、スクラッチは高い"
                width={400}
                height={300}
                className="w-full h-auto mx-auto"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#E5E7EB] flex flex-col sm:col-span-2 md:col-span-1">
            <div className="flex-1 flex items-center justify-center bg-white rounded-lg">
              <Image
                src="/images/kadai3.png"
                alt="会員データが分散、一元管理できていない"
                width={400}
                height={300}
                className="w-full h-auto mx-auto max-w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
