"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Script from "next/script"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "費用はどのくらいかかりますか？",
    answer:
      "機能アセット（開発済みコンポーネント）をベースにするため、フルスクラッチと比較してコストを抑えられます。必要な機能の組み合わせによって変動するため、詳しくは資料をご確認ください。",
  },
  {
    question: "既存のECシステム（Shopify、futureshop等）と連携できますか？",
    answer:
      "はい、EC基盤を問わず連携可能です。Shopify、futureshop、自社開発ECなど、APIを提供しているシステムであれば会員データ・購買データの連携ができます。PAL CLOSETでは既存EC基盤との連携により、EC売上5倍を実現しています。",
  },
  {
    question: "導入までの期間はどのくらいですか？",
    answer:
      "機能アセットベースの開発で最短3ヶ月です。会員証単体であれば3ヶ月、1to1やギフト機能を追加する場合は段階的に機能を拡張していくアプローチも可能です。",
  },
  {
    question: "月額制SaaSの会員証ツールとの違いは何ですか？",
    answer:
      "月額制SaaSは単一ブランド・標準機能での利用を前提としており、マルチブランド横断の会員管理、既存ECシステムとの連携、大規模トラフィックへの対応が困難です。50ブランド以上を展開する企業や、独自のCRM設計が必要な場合は、ハーフスクラッチでの開発が適しています。",
  },
  {
    question: "LINEミニアプリとネイティブアプリの違いは？",
    answer:
      "LINEミニアプリはアプリのダウンロードが不要で、LINEから5秒で会員登録が完了します。PAL CLOSETでは、ネイティブアプリではリーチできなかったライトユーザー層の会員化に成功し、新規会員数が3倍に増加しました。ネイティブアプリとの併用も可能です。",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

export function FAQSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <p className="text-xs sm:text-sm tracking-[0.15em] uppercase text-neutral-400 mb-3 sm:mb-4">
          FAQ
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#1F2937] leading-tight mb-10 sm:mb-14">
          よくあるご質問
        </h2>

        <div className="divide-y divide-neutral-100">
          {faqs.map((faq, index) => (
            <FAQItemComponent key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItemComponent({ faq }: { faq: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-5 sm:py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1F2937] leading-snug">
          {faq.question}
        </h3>
        <ChevronDown
          size={20}
          className={`shrink-0 text-neutral-400 transition-transform duration-200 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm sm:text-base text-neutral-500 leading-[1.8] pr-8">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}
