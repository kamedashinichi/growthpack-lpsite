'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { TrackedExternalLink } from '@/components/shared/feature-page/tracking';

const FEATURE_ITEMS = [
  { href: '/memberscard', label: 'デジタル会員証' },
  { href: '/queue', label: '順番待ち' },
  { href: '/reservation', label: '予約' },
  { href: '/stampcard', label: 'スタンプカード' },
  { href: '/coupon', label: 'クーポン配信' },
  { href: '/ticket', label: 'チケット・パス' },
  { href: '/lottery', label: '抽選' },
  { href: '/segment', label: 'セグメント配信' },
  { href: '/1to1', label: '1to1コミュニケーション' },
  { href: '/gift', label: 'ギフト' },
];

const INDUSTRY_ITEMS = [
  { href: '/apparel', label: 'アパレル' },
  { href: '/drugstore', label: 'ドラッグストア' },
  { href: '/department', label: '百貨店' },
  { href: '/food', label: '飲食チェーン' },
  { href: '/supermarket', label: 'スーパー・HC' },
  { href: '/ec', label: 'EC・通販' },
  { href: '/sports', label: 'スポーツ・エンタメ' },
  { href: '/hotel', label: 'ホテル・宿泊' },
];

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-semibold text-[#1F2937] hover:text-[#05A847] transition-colors"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#E5E7EB] overflow-hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-[#4B5563] hover:text-[#06C755] hover:bg-[#E8F8F0] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold text-sm">
            G
          </div>
          <div className="flex items-center gap-1">
            <span className="text-base md:text-lg font-bold text-[#1F2937]">グロースパック</span>
            <span className="text-sm md:text-base text-[#6B7280]"> for </span>
            <span className="text-base md:text-lg font-bold text-[#06C755]">LINE</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#1F2937]">
          <a href="#problems" className="hover:text-[#05A847] transition-colors">課題</a>
          <a href="#positioning" className="hover:text-[#05A847] transition-colors">選ばれる理由</a>
          <NavDropdown label="機能" items={FEATURE_ITEMS} />
          <NavDropdown label="業界" items={INDUSTRY_ITEMS} />
          <a href="#steps" className="hover:text-[#05A847] transition-colors">導入ステップ</a>
          <a href="#faq" className="hover:text-[#05A847] transition-colors">FAQ</a>
        </nav>
        <Button variant="primary" size="sm" asChild>
          <TrackedExternalLink
            href="https://classmethod.jp/services/line/line-apps/#iframe-form"
            location="top_header"
            destination="contact"
          >
            お問い合わせ
          </TrackedExternalLink>
        </Button>
      </div>
    </header>
  );
}
