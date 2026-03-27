export type IndustryId = "generic" | "apparel"

export interface HeroContent {
  h1: string
  subCopy: string
  /** "phone-mockup" = 既存ジェネリック, "typography" = タイポグラフィ主導 */
  visualVariant: "phone-mockup" | "typography"
  /** typography variant用の大きな数字キャッチ */
  displayStats?: { value: string; label: string }[]
}

export interface Problem {
  title: string
  description: string
  image?: string
  stat?: { value: string; label: string }
}

export interface SolutionStep {
  label: string
  description: string
  featureId: string
}

export interface SolutionStory {
  headline: string
  subheadline: string
  steps: SolutionStep[]
}

export interface FeatureHighlight {
  featureId: string
  name: string
  industryContext: string
  proof?: string
}

export interface CaseStudy {
  company: string
  industry: string
  quote: string
  metrics: { value: string; unit: string; label: string }[]
  details?: string
}

export interface CTAContent {
  headline: string
  subtext: string
}

export interface SEOContent {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
}

export interface IndustryContent {
  id: IndustryId
  seo: SEOContent
  hero: HeroContent
  problems: Problem[]
  solutionStory?: SolutionStory
  featureHighlights: FeatureHighlight[]
  caseStudies: CaseStudy[]
  cta: CTAContent
}
