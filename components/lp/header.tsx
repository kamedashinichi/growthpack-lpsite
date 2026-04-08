"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { href: "/", label: "トップ" },
  { href: "/?industry=apparel", label: "アパレル" },
  { href: "/?industry=drugstore", label: "ドラッグストア" },
  { href: "/?industry=department", label: "百貨店" },
]

export function LPHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled || isMenuOpen ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 md:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-end gap-0.5 sm:gap-1">
          <span className="text-base sm:text-lg md:text-xl font-bold text-[#1F2937]">グロースパック</span>
          <span className="text-base sm:text-lg md:text-xl text-[#64748b]"> for </span>
          <span className="text-base sm:text-lg md:text-xl font-bold text-[#00C300]">LINE</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#4B5563]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav + CTAs */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-[#4B5563] hover:text-[#06C755] transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="https://classmethod.jp/services/line/line-apps/#iframe-form"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#06C755] text-white font-bold rounded-lg shadow-[0_2px_8px_rgba(6,199,85,0.25)] hover:bg-[#05A847] hover:shadow-[0_4px_12px_rgba(6,199,85,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            aria-label="お問い合わせフォームを開く"
          >
            <MessageCircle size={18} strokeWidth={2.5} />
            <span>お問い合わせ</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 text-sm text-[#4B5563] hover:text-[#06C755] border-b border-gray-50 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://classmethod.jp/services/line/line-apps/#iframe-form"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 px-6 py-3 bg-[#06C755] text-white font-bold rounded-lg text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              お問い合わせ
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
