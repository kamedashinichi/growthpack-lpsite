/**
 * Card primitive aligned with docs/DESIGN.md §4 "コンポーネント > カード"
 *
 * Variants:
 * - default : 白背景・薄ボーダー・hoverでシャドウ+LINE Green ボーダー
 * - elevated: 薄シャドウ常時、hoverで強化（注目カード）
 * - outline : ボーダーのみ、背景透過
 * - accent  : LINE Green light 背景（事例・メッセージカード）
 *
 * Rounding: DESIGN.mdの rounded-lg (8px) を基準。
 * 大きめのカード (hero等) は rounded="xl" で rounded-xl (12px) に。
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'elevated' | 'outline' | 'accent';
type Rounded = 'md' | 'lg' | 'xl' | '2xl';
type Padding = 'none' | 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  default:
    'bg-white border border-[#E5E7EB] hover:shadow-lg hover:border-[#06C755]/40 transition-all duration-200',
  elevated:
    'bg-white shadow-sm hover:shadow-lg border border-[#E5E7EB]/50 transition-shadow duration-200',
  outline:
    'bg-transparent border border-[#E5E7EB]',
  accent:
    'bg-[#E8F8F0] border border-[#06C755]/20',
};

const roundedClasses: Record<Rounded, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

const paddingClasses: Record<Padding, string> = {
  none: '',
  sm: 'p-4 md:p-5',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10',
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  rounded?: Rounded;
  padding?: Padding;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      rounded = 'lg',
      padding = 'md',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          roundedClasses[rounded],
          paddingClasses[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';
