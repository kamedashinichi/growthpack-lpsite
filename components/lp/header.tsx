"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, Menu, X, ChevronDown } from "lucide-react"

const INDUSTRY_ITEMS = [
  { href: "/?industry=apparel", label: "アパレル" },
  { href: "/?industry=drugstore", label: "ドラッグストア" },
  { href: "/?industry=department", label: "百貨店" },
  { href: "/?industry=food", label: "飲食チェーン" },
  { href: "/?industry=supermarket", label: "スーパー・HC" },
  { href: "/?industry=ec", label: "EC・通販" },
  { href: "/?industry=sports", label: "スポーツ・エンタメ" },
  { href: "/?industry=hotel", label: "ホテル・宿泊" },
]

export function LPHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled || isMenuOpen ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 md:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-end gap-0.5 sm:gap-1">
          <span className="text-base sm:text-lg md:text-xl font-bold text-[#1F2937]">グロースパック</span>
          <span className="text-base sm:text-lg md:text-xl text-[#64748b]"> for </span>
          <span className="text-base sm:text-lg md:text-xl font-bold text-[#00C300]">LINE</span>
        </a>

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
            <a href="/" className="text-sm text-[#4B5563] hover:text-[#06C755] transition-colors">
              トップ
            </a>

            {/* Industry Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-sm text-[#4B5563] hover:text-[#06C755] transition-colors"
              >
                業界別LP
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#E5E7EB] overflow-hidden">
                  {INDUSTRY_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-[#4B5563] hover:text-[#06C755] hover:bg-[#F0FDF4] transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
            <a
              href="/"
              className="py-3 text-sm text-[#4B5563] hover:text-[#06C755] border-b border-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              トップ
            </a>

            {/* Mobile: Industry label */}
            <p className="pt-3 pb-1 text-xs text-[#9CA3AF] font-medium uppercase tracking-wider">業界別LP</p>
            {INDUSTRY_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2.5 pl-2 text-sm text-[#4B5563] hover:text-[#06C755] border-b border-gray-50 last:border-b-0"
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
