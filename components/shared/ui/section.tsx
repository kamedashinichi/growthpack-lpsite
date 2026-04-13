/**
 * Section primitive aligned with docs/DESIGN.md §3 "レイアウト & グリッド"
 *
 * Container widths:
 * - wide   : max-w-[1200px] (ヘッダー・フッター・ワイドセクション)
 * - default: max-w-[900px] (標準コンテンツ、LP内で多用)
 * - narrow : max-w-[720px] (読み物本文)
 *
 * Spacing:
 * - sm: py-12 sm:py-16 md:py-20 (現LPの11箇所で使われている標準)
 * - md: py-16 sm:py-20 md:py-28 (主要セクション用)
 * - lg: py-20 sm:py-24 md:py-32 (ヒーロー・CTA帯)
 *
 * Background:
 * - white  : 白背景（デフォルト）
 * - muted  : #F8F9FA 淡グレー（セクション交互塗り）
 * - accent : #E8F8F0 LINE Green light（事例・注目セクション）
 * - dark   : #1a1d21 ダーク（最終CTA帯・フッター前）
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

type Spacing = 'sm' | 'md' | 'lg';
type Container = 'wide' | 'default' | 'narrow';
type Background = 'white' | 'muted' | 'accent' | 'dark';

const spacingClasses: Record<Spacing, string> = {
  sm: 'py-12 sm:py-16 md:py-20',
  md: 'py-16 sm:py-20 md:py-28',
  lg: 'py-20 sm:py-24 md:py-32',
};

const containerClasses: Record<Container, string> = {
  wide: 'max-w-[1200px]',
  default: 'max-w-[900px]',
  narrow: 'max-w-[720px]',
};

const bgClasses: Record<Background, string> = {
  white: 'bg-white',
  muted: 'bg-[#F8F9FA]',
  accent: 'bg-[#E8F8F0]',
  dark: 'bg-[#1a1d21] text-white',
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: Spacing;
  container?: Container;
  background?: Background;
  /** コンテナを外して section だけ出したい場合 */
  noContainer?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      spacing = 'sm',
      container = 'wide',
      background = 'white',
      noContainer = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], bgClasses[background], className)}
        {...props}
      >
        {noContainer ? (
          children
        ) : (
          <div className={cn('mx-auto px-4 sm:px-5 md:px-6', containerClasses[container])}>
            {children}
          </div>
        )}
      </section>
    );
  },
);
Section.displayName = 'Section';
