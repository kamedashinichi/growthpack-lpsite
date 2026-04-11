import type { UseCase, Feature } from '@/types/features-catalog'

interface UseCaseSectionProps {
  useCases: UseCase[]
  features: Feature[]
}

const CATEGORY_LABEL: Record<string, string> = {
  'CAT-A': '顧客を知る',
  'CAT-B': '来店を促す',
  'CAT-C': '体験を変える',
  'CAT-D': 'つながりを広げる',
}

export function UseCaseSection({ useCases, features }: UseCaseSectionProps) {
  const featureMap = Object.fromEntries(features.map((f) => [f.id, f]))

  const grouped = useCases.reduce<Record<string, UseCase[]>>((acc, uc) => {
    if (!acc[uc.category_id]) acc[uc.category_id] = []
    acc[uc.category_id].push(uc)
    return acc
  }, {})

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            「こんな課題がある」から、必要な機能を探す
          </h2>
          <p className="text-gray-500 text-sm">
            課題の言葉から、対応する機能の組み合わせを逆引きできます
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([catId, cases]) => (
            <div key={catId}>
              <h3 className="text-sm font-bold text-[#05A847] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#06C755] rounded-full inline-block" />
                {CATEGORY_LABEL[catId] ?? catId}
              </h3>

              <div className="flex flex-col gap-3">
                {cases.map((uc) => (
                  <div
                    key={uc.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        「{uc.challenge}」
                      </p>
                      <p className="text-xs text-gray-400">{uc.combination_reason}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
                      {uc.feature_ids.map((fid) => {
                        const feat = featureMap[fid]
                        return feat ? (
                          <span
                            key={fid}
                            className="text-xs bg-[#E8F8F0] text-[#05A847] font-medium px-3 py-1 rounded-full border border-green-100"
                          >
                            {feat.name}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://classmethod.jp/services/line/line-apps/#iframe-form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#06C755] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#05A847] transition-colors text-sm"
          >
            どの機能が合うか相談する →
          </a>
        </div>
      </div>
    </section>
  )
}
