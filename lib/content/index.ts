import { generic } from "./generic"
import { apparel } from "./apparel"
import type { IndustryContent, IndustryId } from "./types"

const contentMap: Record<IndustryId, IndustryContent> = { generic, apparel }

export function getIndustryContent(industry?: string): IndustryContent {
  if (industry && industry in contentMap) {
    return contentMap[industry as IndustryId]
  }
  return contentMap.generic
}

export type { IndustryContent, IndustryId } from "./types"
