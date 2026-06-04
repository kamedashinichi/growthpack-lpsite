import { Section } from '@/components/shared/ui/section';
import { Card } from '@/components/shared/ui/card';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  faqs: readonly FaqItem[];
  /** 機能ページ=muted（既定）/ 業種ページ=white */
  background?: 'muted' | 'white';
  heading?: string;
}

/**
 * よくある質問セクション。全機能/業種ページで共通のマークアップを集約。
 * 差分は背景色・見出し文言・FAQ データ配列のみで、props で受ける。
 */
export function FaqSection({
  faqs,
  background = 'muted',
  heading = 'よくある質問',
}: FaqSectionProps) {
  return (
    <Section id="faq" spacing="md" container="wide" background={background}>
      <div className="mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((f) => (
          <Card key={f.q} padding="md">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 flex items-start gap-2">
              <span className="text-line-green shrink-0 font-bold">Q.</span>
              {f.q}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-6">{f.a}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
