/**
 * TargetAudienceNotice — 対象企業明示コンポーネント
 *
 * Issue #223: 8業界LPに対象明示テキストを追加（R-2・直接取引LP版）
 * - Hero直後・#problemsセクション直前に配置
 * - 控えめなグレー背景・小フォント（メインCTAの訴求力を下げない）
 * - 全8業界で同一テキスト・デザイン
 */
import { Section } from '@/components/shared/ui/section';

export function TargetAudienceNotice() {
  return (
    <Section spacing="sm" container="wide" background="muted">
      <div className="border border-border rounded-lg bg-white px-5 py-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          本サービスは、自社サービスとしてLINEミニアプリの導入をご検討の事業会社さまを対象としています。代理店・パートナー経由でのご提案や、エンドクライアントを別企業とする受託開発等は対象外です。
        </p>
      </div>
    </Section>
  );
}
