export type FeatureKey =
  | 'memberscard'
  | 'queue'
  | 'reservation'
  | 'stampcard'
  | 'coupon'
  | 'ticket'
  | 'lottery'
  | 'segment'
  | '1to1'
  | 'gift';

export type Integration = '不要' | 'オプション' | '必須';

export interface PricingEntry {
  key: FeatureKey;
  name: string;
  path: string;
  price: string;
  integration: Integration;
  note: string;
}

export const PRICING_DATA: PricingEntry[] = [
  {
    key: 'memberscard',
    name: 'デジタル会員証',
    path: '/memberscard',
    price: '¥500万円〜',
    integration: 'オプション',
    note: '管理画面標準装備',
  },
  {
    key: 'queue',
    name: '順番待ち',
    path: '/queue',
    price: '¥200万円〜',
    integration: '不要',
    note: 'CSV出力対応',
  },
  {
    key: 'reservation',
    name: '予約',
    path: '/reservation',
    price: '¥300万円〜',
    integration: '不要',
    note: 'ホテル・サロン形式対応済、CSV出力対応',
  },
  {
    key: 'stampcard',
    name: 'スタンプカード',
    path: '/stampcard',
    price: '¥200万円〜',
    integration: '不要',
    note: '特典商品10品まで標準、CSV出力対応',
  },
  {
    key: 'coupon',
    name: 'クーポン配信',
    path: '/coupon',
    price: '¥300万円〜',
    integration: '不要',
    note: 'クーポン10種まで標準',
  },
  {
    key: 'ticket',
    name: 'チケット・パス発行',
    path: '/ticket',
    price: '¥500万円〜',
    integration: '必須',
    note: '外部システムAPI連携前提',
  },
  {
    key: 'lottery',
    name: '抽選',
    path: '/lottery',
    price: '¥200万円〜',
    integration: '不要',
    note: '特典商品10品まで標準、クリエイティブ制作は別途',
  },
  {
    key: 'segment',
    name: 'セグメント配信',
    path: '/segment',
    price: '¥200万円〜',
    integration: 'オプション',
    note: '管理画面標準装備',
  },
  {
    key: '1to1',
    name: '1to1コミュニケーション',
    path: '/1to1',
    price: '¥700万円〜',
    integration: '必須',
    note: 'CRM連携前提',
  },
  {
    key: 'gift',
    name: 'ギフト',
    path: '/gift',
    price: '¥300万円〜',
    integration: '不要',
    note: '商品登録10品まで標準、QR/1次元/もぎり対応',
  },
];

export const PRICE_NOTE = '外部システム連携・データ移行は別途お見積りいたします。';

export function getPricingEntry(key: FeatureKey): PricingEntry | undefined {
  return PRICING_DATA.find((p) => p.key === key);
}
