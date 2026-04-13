/**
 * Button primitive aligned with docs/DESIGN.md §4 "コンポーネント > ボタン"
 *
 * Variants:
 * - primary  : LINE Green dark (#05A847) — CTA本体、AA可読性確保
 * - secondary: #32373c ダークボタン — 資料DL等のサブCTA
 * - outline  : LINE Green dark 枠線 — ghost的CTA
 * - ghost    : 背景なしテキストのみ — ナビ補助
 * - link     : 下線付きリンクスタイル — 本文内リンク用
 *
 * Sizes:
 * - default: px-6 py-3 (標準CTA)
 * - sm     : px-4 py-2 (コンパクト)
 * - lg     : px-8 py-4 (ヒーローCTA)
 * - icon   : 正方形 (アイコンボタン)
 */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[#05A847] text-white hover:bg-[#048838] active:bg-[#048838]',
        secondary:
          'bg-[#32373c] text-white hover:bg-[#1a1d21] active:bg-[#1a1d21]',
        outline:
          'border-2 border-[#05A847] text-[#05A847] bg-transparent hover:bg-[#05A847] hover:text-white',
        ghost:
          'text-[#1F2937] hover:bg-[#E8F8F0] hover:text-[#05A847]',
        link:
          'text-[#05A847] underline underline-offset-2 hover:text-[#048838] p-0 h-auto',
        destructive:
          'bg-[#EF4444] text-white hover:bg-[#DC2626]',
      },
      size: {
        default: 'px-6 py-3 text-base min-w-[160px]',
        sm: 'px-4 py-2 text-sm min-w-[120px]',
        lg: 'px-8 py-4 text-lg min-w-[200px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
