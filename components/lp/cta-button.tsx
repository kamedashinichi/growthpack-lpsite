"use client"

import { track } from "@vercel/analytics"
import { Download, MessageCircle } from "lucide-react"

interface CTAButtonProps {
  variant: "download" | "contact"
  location: string
  className?: string
}

const config = {
  download: {
    href: "https://classmethod.jp/download/line-mini-app/",
    label: "資料ダウンロード（無料）",
    icon: Download,
    event: "cta_download",
  },
  contact: {
    href: "https://classmethod.jp/services/line/line-apps/#iframe-form",
    label: "お問い合わせ",
    icon: MessageCircle,
    event: "cta_contact",
  },
} as const

export function CTAButton({ variant, location, className }: CTAButtonProps) {
  const { href, label, icon: Icon, event } = config[variant]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        track(event, { location, industry: "apparel" })
      }}
    >
      <Icon size={18} strokeWidth={2.5} />
      {label}
    </a>
  )
}
