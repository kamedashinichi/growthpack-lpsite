import type { Metadata } from "next"
import { getIndustryContent } from "@/lib/content"
import { LPHeader } from "@/components/lp/header"
import { HeroSection } from "@/components/lp/hero-section"
import { TrustSignalSection } from "@/components/lp/trust-signal-section"
import { ProblemSection } from "@/components/lp/problem-section"
import { SolutionSection } from "@/components/lp/solution-section"
import { SolutionStorySection } from "@/components/lp/solution-story-section"
import { FeatureHighlightSection } from "@/components/lp/feature-highlight-section"
import { ComparisonSection } from "@/components/lp/comparison-section"
import { StrengthSection } from "@/components/lp/strength-section"
import { FeaturesSection } from "@/components/lp/features-section"
import { CaseStudySection } from "@/components/lp/case-study-section"
import { FAQSection } from "@/components/lp/faq-section"
import { InlineCTA } from "@/components/lp/inline-cta"
import { FinalCTASection } from "@/components/lp/final-cta-section"
import { LPFooter } from "@/components/lp/footer"
import { MobileFABButtons } from "@/components/lp/mobile-fab-buttons"

type Props = {
  searchParams: Promise<{ industry?: string }>
}

const canonicalPaths: Record<string, string> = {
  generic: "https://lp.growthpackforline.classmethod.net",
  apparel: "https://lp.growthpackforline.classmethod.net/apparel",
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const content = getIndustryContent(params?.industry)

  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: canonicalPaths[content.id] ?? canonicalPaths.generic,
    },
    openGraph: {
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      siteName: "グロースパック for LINE",
      locale: "ja_JP",
      type: "website",
      images: [
        {
          url: "https://lp.growthpackforline.classmethod.net/images/ogp-v2.jpg",
          width: 1200,
          height: 630,
          alt: content.seo.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.ogTitle,
      description: content.seo.ogDescription,
      images: ["https://lp.growthpackforline.classmethod.net/images/ogp-v2.jpg"],
    },
  }
}

export default async function LandingPage({ searchParams }: Props) {
  const params = await searchParams
  const content = getIndustryContent(params?.industry)
  const industry = content.id
  const isIndustry = industry !== "generic"

  if (isIndustry) {
    return (
      <div className="min-h-screen bg-white">
        <LPHeader />
        <main className="pb-20 md:pb-0">
          {/* 1. Hero */}
          <HeroSection content={content.hero} industry={industry} />

          {/* 2. 信頼シグナル帯 */}
          <TrustSignalSection />

          {/* 3. Problem */}
          <ProblemSection problems={content.problems} industry={industry} />

          {/* 4. Case Study（繰り上げ） */}
          <CaseStudySection caseStudies={content.caseStudies} industry={industry} />

          {/* 5. インラインCTA① */}
          <InlineCTA text="PAL CLOSETの導入プロセスを資料で詳しく見る" location="after_casestudy" />

          {/* 6. Solution Story */}
          {content.solutionStory && (
            <SolutionStorySection story={content.solutionStory} />
          )}

          {/* 7. Feature Highlight */}
          {content.featureHighlights.length > 0 && (
            <FeatureHighlightSection highlights={content.featureHighlights} />
          )}

          {/* 8. Comparison */}
          <ComparisonSection />

          {/* 9. インラインCTA② */}
          <InlineCTA text="料金・導入プロセスの詳細を資料で確認する" location="after_comparison" />

          {/* 10. All Features */}
          <FeaturesSection
            highlightIds={content.featureHighlights.map((h) => h.featureId)}
          />

          {/* 11. FAQ */}
          <FAQSection />

          {/* 12. Final CTA */}
          <FinalCTASection content={content.cta} />
        </main>
        <LPFooter />
        <MobileFABButtons />
      </div>
    )
  }

  // ジェネリックLP（既存と同一構造）
  return (
    <div className="min-h-screen bg-white">
      <LPHeader />
      <main className="pb-20 md:pb-0">
        <HeroSection content={content.hero} industry={industry} />
        <ProblemSection industry={industry} />
        <SolutionSection />
        <StrengthSection />
        <FeaturesSection />
        <CaseStudySection industry={industry} />
        <FinalCTASection />
      </main>
      <LPFooter />
      <MobileFABButtons />
    </div>
  )
}
