export interface Category {
  id: string
  name: string
  tagline: string
  lead_copy: string
  sub_copy: string
}

export interface BacklogCount {
  base: number
  custom: number
}

export interface Feature {
  id: string
  name: string
  catchcopy: string
  description: string
  points: [string, string, string]
  maturity: 'L1' | 'L2' | 'L3' | 'L4'
  backlog_count: BacklogCount
  category_id: string
  demo_url: string | null
  detail_path: string | null
  industries: string[]
  updated_at: string
}

export interface UseCase {
  id: string
  category_id: string
  challenge: string
  feature_ids: string[]
  combination_reason: string
  industries: string[]
}

export interface FeaturesData {
  version: string
  updated_at: string
  categories: Category[]
  features: Feature[]
  use_cases: UseCase[]
}
