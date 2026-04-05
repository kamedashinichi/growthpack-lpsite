import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export type MetricsItem = {
  value: string
  unit: string
  label: string
}

export type TroubleItem = {
  icon: LucideIcon
  title: string
  problem: string
  detail: string
}

export type CaseStudyItem = {
  company: string
  industry: string
  scale?: string
  timeline?: string
  metrics: MetricsItem[]
}

export type ComparisonItem = {
  label: string
  official: boolean | "partial"
  saas: boolean | "partial"
  mini: boolean
  highlight?: boolean
}

export type StepData = {
  id: number
  color: string
  colorLight: string
  title: string
  subtitle: string
  description: string
  features: string[]
  icon: LucideIcon
}

export type FeatureItem = {
  image: string
  name: string
  description: string
  url?: string
}

export type StepColorInfo = {
  step: number
  color: string
  label: string
}

export type SecurityItem = {
  icon: LucideIcon
  title: string
  description: string
}

export type FlowStep = {
  icon: LucideIcon
  step: string
  title: string
  period: string
  desc: string
}

export type ProblemSectionProps = {
  heading: string
  subtitle: string
  items: TroubleItem[]
  bottomMessage?: ReactNode
}

export type IndustryLPData = {
  industryKey: string
  label: string
  hero: {
    headline: ReactNode
    subheadline: ReactNode
  }
  metrics?: MetricsItem[]
  problem: ProblemSectionProps
  caseStudies: CaseStudyItem[]
  comparison?: ComparisonItem[]
  comparisonHighlight?: { title: ReactNode; description: string }
  steps?: StepData[]
  featureSection: {
    heading: string
    subtitle: string
    items: FeatureItem[]
    stepColorMap?: Record<string, StepColorInfo>
  }
}
