import Image from 'next/image';

export interface LpFooterColumn {
  /** 列見出し（例: SERVICE / RESOURCES / CONTACT）。 */
  heading: string;
  /**
   * 列内のリンク群。`<li>` 要素をページ側で渡す。
   * 計測リンク（TrackedExternalLink）か素の `<a>` かがページで異なるため
   * ReactNode で受け取り、共有コンポーネントは `<ul>` の体裁のみ担当する。
   */
  links: React.ReactNode;
}

interface LpFooterProps {
  /** ブランド説明（ページ固有のコピー）。 */
  description: string;
  /** リンク列（通常 SERVICE / RESOURCES / CONTACT の3列）。 */
  columns: LpFooterColumn[];
}

/**
 * 全 LP 共通のフッター。ダーク帯・ブランドロゴ・コピーライト行を集約し、
 * 説明文とリンク列だけをページから受け取る。
 */
export function LpFooter({ description, columns }: LpFooterProps) {
  return (
    <footer className="bg-[#0a0a0a] text-white/80 py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo_classmethod_white.png"
                alt="クラスメソッド"
                width={120}
                height={38}
                className="hidden md:block h-7 w-auto object-contain"
              />
              <Image
                src="/icon-light-32x32.png"
                alt="クラスメソッド"
                width={32}
                height={32}
                className="md:hidden h-7 w-7 object-contain"
              />
              <div className="flex items-center gap-1">
                <span className="text-base font-bold text-white">グロースパック</span>
                <span className="text-sm text-white/50"> for </span>
                <span className="text-base font-bold text-line-green">LINE</span>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">{description}</p>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                {column.heading}
              </div>
              <ul className="space-y-2 text-sm text-white/60">{column.links}</ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© Classmethod, Inc.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://classmethod.jp/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              プライバシーポリシー
            </a>
            <a
              href="https://classmethod.jp/services/line/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              LINE総合支援サービス
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
