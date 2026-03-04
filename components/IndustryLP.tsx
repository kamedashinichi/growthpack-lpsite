import { RetailLP } from "./industry/RetailLP"

export function IndustryLP({ industry }: { industry: string }) {
  switch (industry) {
    case "retail":
      return <RetailLP />
    default:
      return null
  }
}
