import type { Feature } from '@/types/features-catalog'

const MATURITY_LABEL: Record<string, { label: string; color: string }> = {
  L1: { label: '企画中', color: 'bg-gray-100 text-gray-500' },
  L2: { label: '開発中', color: 'bg-orange-100 text-orange-600' },
  L3: { label: 'リリース済', color: 'bg-[#E8F8F0] text-[#05A847]' },
  L4: { label: '実績多数', color: 'bg-[#06C755] text-white' },
}

interface FeatureCatalogCardProps {
  feature: Feature
}

export function FeatureCatalogCard({ feature }: FeatureCatalogCardProps) {
  const maturity = MATURITY_LABEL[feature.maturity] ?? MATURITY_LABEL['L1']

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-gray-900">{feature.name}</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${maturity.color}`}>
          {maturity.label}
        </span>
      </div>

      <p className="text-sm font-medium text-[#05A847] leading-snug">
        {feature.catchcopy}
      </p>

      <ul className="flex flex-col gap-2">
        {feature.points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#06C755] flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400">
        ベース {feature.backlog_count.base}件 + カスタム {feature.backlog_count.custom}件
      </p>

      <div className="mt-auto pt-2">
        {feature.demo_url ? (
          <a
            href={feature.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#06C755] hover:text-[#05A847]"
          >
            デモを見る →
          </a>
        ) : (
          <span className="text-sm text-gray-400">デモ準備中 — まずはお問い合わせください</span>
        )}
      </div>
    </div>
  )
}
