'use client'

import { useState } from 'react'
import type { Category, Feature } from '@/types/features-catalog'
import { FeatureCatalogCard } from './feature-catalog-card'

interface CategoryTabsProps {
  categories: Category[]
  features: Feature[]
}

export function CategoryTabs({ categories, features }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? 'CAT-A')

  const currentCategory = categories.find((c) => c.id === activeCategory)
  const visibleFeatures = features.filter((f) => f.category_id === activeCategory)

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-[#06C755] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {currentCategory && (
        <div className="mb-8 p-6 bg-[#E8F8F0] rounded-2xl border border-green-100">
          <p className="text-lg font-bold text-gray-900 mb-2">{currentCategory.lead_copy}</p>
          <p className="text-sm text-gray-600">{currentCategory.sub_copy}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleFeatures.map((feature) => (
          <FeatureCatalogCard key={feature.id} feature={feature} />
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
  )
}
