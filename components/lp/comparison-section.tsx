export function ComparisonSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <p className="text-xs sm:text-sm tracking-[0.15em] uppercase text-neutral-400 mb-3 sm:mb-4">
          Comparison
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#1F2937] leading-tight mb-10 sm:mb-14">
          開発アプローチの比較
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* SaaS */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-neutral-200">
            <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] mb-2">月額制SaaS</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-['Roboto'] mb-6">
              1<span className="text-base sm:text-lg font-bold text-neutral-400">万円〜/月</span>
            </p>

            <div className="space-y-3 sm:space-y-4 text-sm">
              <div className="flex items-start gap-2.5">
                <span className="text-[#06C755] text-lg leading-none shrink-0">○</span>
                <span className="text-neutral-600">即日利用開始</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#EF4444] text-lg leading-none shrink-0">×</span>
                <span className="text-neutral-600">単一ブランドのみ対応</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#EF4444] text-lg leading-none shrink-0">×</span>
                <span className="text-neutral-600">既存ECシステム連携不可</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#EF4444] text-lg leading-none shrink-0">×</span>
                <span className="text-neutral-600">カスタマイズ不可</span>
              </div>
            </div>
          </div>

          {/* Half Scratch - Recommended */}
          <div className="bg-[#0a0a0a] rounded-2xl p-5 sm:p-6 md:p-8 text-white relative sm:scale-105 order-first sm:order-none shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#06C755] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full">
                推奨
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold mb-2">ハーフスクラッチ</h3>
            <p className="text-2xl sm:text-3xl font-extrabold font-['Roboto'] mb-1">
              500<span className="text-base sm:text-lg font-bold text-neutral-400">万円〜</span>
            </p>
            <p className="text-xs text-neutral-500 mb-6">会員証機能の場合 / 最短3ヶ月</p>

            <div className="space-y-3 sm:space-y-4 text-sm">
              <div className="flex items-start gap-2.5">
                <span className="text-[#06C755] text-lg leading-none shrink-0">◎</span>
                <span className="text-neutral-300">マルチブランド横断対応</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#06C755] text-lg leading-none shrink-0">◎</span>
                <span className="text-neutral-300">既存EC連携（Shopify等）</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#06C755] text-lg leading-none shrink-0">◎</span>
                <span className="text-neutral-300">50ブランド1,078店舗の実績</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#06C755] text-lg leading-none shrink-0">○</span>
                <span className="text-neutral-300">柔軟なカスタマイズ</span>
              </div>
            </div>
          </div>

          {/* Full Scratch */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-neutral-200">
            <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] mb-2">フルスクラッチ</h3>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-['Roboto'] mb-6">
              1,000<span className="text-base sm:text-lg font-bold text-neutral-400">万円〜</span>
            </p>

            <div className="space-y-3 sm:space-y-4 text-sm">
              <div className="flex items-start gap-2.5">
                <span className="text-[#06C755] text-lg leading-none shrink-0">○</span>
                <span className="text-neutral-600">完全自由設計</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#06C755] text-lg leading-none shrink-0">○</span>
                <span className="text-neutral-600">あらゆる要件に対応</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#FB923C] text-lg leading-none shrink-0">△</span>
                <span className="text-neutral-600">開発期間6ヶ月〜</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#FB923C] text-lg leading-none shrink-0">△</span>
                <span className="text-neutral-600">要件定義に時間がかかる</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
