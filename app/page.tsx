import type { Metadata } from "next"
import { getIndustryContent } from "@/lib/content"
import { LPHeader } from "@/components/lp/header"
import { HeroSection } from "@/components/lp/hero-section"
import { ProblemSection } from "@/components/lp/problem-section"
import { SolutionSection } from "@/components/lp/solution-section"
import { StrengthSection } from "@/components/lp/strength-section"
import { FeaturesSection } from "@/components/lp/features-section"
import { CaseStudySection } from "@/components/lp/case-study-section"
import { FinalCTASection } from "@/components/lp/final-cta-section"
import { LPFooter } from "@/components/lp/footer"
import { MobileFABButtons } from "@/components/lp/mobile-fab-buttons"
import { IndustryLP } from "@/components/IndustryLP"

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

  if (params.industry) {
    return <IndustryLP industry={params.industry} />
  }

  const content = getIndustryContent(undefined)

  // ジェネリックLP
  return (
    <div className="min-h-screen bg-white">
      <LPHeader />
      <main className="pb-20 md:pb-0">
        <HeroSection content={content.hero} industry="generic" />
        <ProblemSection />
        <SolutionSection />
        <StrengthSection />
        <FeaturesSection />
        <CaseStudySection industry="generic" />
        <FinalCTASection />
      </main>
      <LPFooter />
      <MobileFABButtons />
    </div>
  )
}
