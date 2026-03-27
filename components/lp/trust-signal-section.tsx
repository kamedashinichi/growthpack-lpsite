import { ShieldCheck, Cloud } from "lucide-react"

export function TrustSignalSection() {
  return (
    <section className="py-4 sm:py-5 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 text-xs sm:text-sm text-neutral-500">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck size={16} className="text-[#06C755] shrink-0" />
            <span>LINE Technology Partner 認定</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-neutral-200" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Cloud size={16} className="text-[#FB923C] shrink-0" />
            <span>AWS Premier Tier パートナー</span>
          </div>
        </div>
      </div>
    </section>
  )
}
