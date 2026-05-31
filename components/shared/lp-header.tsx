import Link from 'next/link';
import Image from 'next/image';

export interface LpHeaderNavItem {
  href: string;
  label: string;
}

interface LpHeaderProps {
  /** ページ内アンカーナビ（ページ固有）。モバイルでは非表示。 */
  navItems: LpHeaderNavItem[];
  /**
   * 右端の CTA。ページ側で計測リンク（TrackedExternalLink）を内包した
   * `<Button asChild>` を渡す。計測の page 次元がファミリーで異なるため、
   * 共有コンポーネントは計測を持たずレイアウトのみ担当する。
   */
  cta: React.ReactNode;
}

/**
 * 全 LP 共通のスティッキーヘッダー。ロゴ・サービス名・レイアウトを集約し、
 * ナビ項目と CTA だけをページから受け取る。
 * モバイルはロゴ＋CTA の構成（ナビは md 以上で表示）。
 */
export function LpHeader({ navItems, cta }: LpHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/logo_classmethod_black.png"
            alt="クラスメソッド"
            width={120}
            height={38}
            className="hidden md:block h-[34px] w-auto object-contain"
            priority
          />
          <Image
            src="/logo_classmethod_mobile.png"
            alt="クラスメソッド"
            width={32}
            height={32}
            className="md:hidden h-7 w-7 object-contain"
            priority
          />
          <div className="flex items-center gap-1">
            <span className="text-base md:text-lg font-bold text-foreground">グロースパック</span>
            <span className="text-sm md:text-base text-muted-foreground"> for </span>
            <span className="text-base md:text-lg font-bold text-line-green">LINE</span>
          </div>
        </Link>
        {navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-foreground">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-line-green-dark transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
        {cta}
      </div>
    </header>
  );
}
