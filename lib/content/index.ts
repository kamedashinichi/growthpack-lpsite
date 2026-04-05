import { generic } from "./generic"
import { apparel } from "./apparel"
import { food } from "./food"
import { drugstore } from "./drugstore"
import { department } from "./department"
import { supermarket } from "./supermarket"
import { ec } from "./ec"
import { sports } from "./sports"
import type { IndustryContent, IndustryId } from "./types"

const contentMap: Record<IndustryId, IndustryContent> = {
  generic,
  apparel,
  food,
  drugstore,
  department,
  supermarket,
  ec,
  sports,
}

export function getIndustryContent(industry?: string): IndustryContent {
  if (industry && industry in contentMap) {
    return contentMap[industry as IndustryId]
  }
  return contentMap.generic
}

export type { IndustryContent, IndustryId } from "./types"
