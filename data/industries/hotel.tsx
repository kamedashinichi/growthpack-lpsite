import { BedDouble, Users, Smartphone, Star } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const hotelData: IndustryLPData = {
  industryKey: "hotel",
  label: "ホテル・宿泊",
  hero: {
    headline: (
      <>
        チェックイン待ち、紙の会員証、
        <br />
        <span className="text-[#06C755]">連泊しても名前を覚えてもらえない</span>。
      </>
    ),
    subheadline: (
      <>
        ホテル・宿泊施設のゲスト体験DXは、LINEから始まる。
        <br className="hidden sm:block" />
        デジタル会員証・施設内クーポン・予約連携・リピート促進をLINEに統合。
        <br className="hidden sm:block" />
        フロントスタッフがゲスト対応に集中できる環境を、<span className="text-[#06C755] font-bold">アセットベース</span>でスピード構築。
      </>
    ),
    heroImage: "/images/hotel-hero.png",
  },
  metrics: [
    { value: "5", unit: "秒", label: "で会員登録完了" },
  ],
  problem: {
    heading: "ホテル・宿泊施設が抱える、4つの課題",
    subtitle: "アプリ、紙カード、フロント業務——バラバラなゲスト接点が収益機会を逃している",
    items: [
      {
        icon: BedDouble,
        title: "チェックイン・フロント業務の非効率",
        problem: "紙の書類記入やカード確認でフロント行列が発生していませんか？",
        detail:
          "チェックイン時のアナログ手続きがピーク時に集中し、ゲスト満足度を下げる。スタッフはデータ入力に追われ、接客品質が下がる悪循環が続く。",
      },
      {
        icon: Users,
        title: "ゲストデータの断絶とリピーター育成の限界",
        problem: "宿泊履歴・嗜好データが活用できておらず、全ゲストへ同じ対応になっていませんか？",
        detail:
          "PMS（宿泊管理システム）とLINE友だちが未連携のため、宿泊後のフォローができない。常連ゲストも再来訪まで施設を忘れてしまう。",
      },
      {
        icon: Smartphone,
        title: "施設内消費・付帯サービスの未取り込み",
        problem: "レストラン・スパ・売店の利用促進をフロントスタッフの声かけだけに頼っていませんか？",
        detail:
          "チェックイン後のゲスト接点がゼロになり、施設内サービスへの誘導ができない。クーポンを紙で配布しても利用率が低く、投資対効果が見えにくい。",
      },
      {
        icon: Star,
        title: "口コミ・レビュー促進の仕組みがない",
        problem: "退館後のゲストとの接点が一切ない状態になっていませんか？",
        detail:
          "チェックアウト後のフォローアップが手動のメールのみで、次回予約や口コミ投稿へのアクションが取れない。リピーターも競合に流れているかどうか把握できない。",
      },
    ],
    bottomMessage: (
      <p className="text-white leading-relaxed text-sm sm:text-base">
        ゲストはすでにLINEを使っている。<br />
        <span className="font-bold text-[#06C755]">LINEミニアプリで全接点をつなぐ</span>ことで、<br />
        フロント業務を効率化しながらリピート率を高める。
      </p>
    ),
  },
  caseStudies: [],
  featureSection: {
    heading: "ホテル・宿泊施設に必要な機能を、必要なだけ",
    subtitle: "アセットベースで選んで組み合わせ。不要な機能に投資しない。",
    items: [
      {
        image: "/images/会員証.png",
        name: "デジタル会員証",
        description:
          "LINEで友だち追加と同時に会員登録完了。宿泊履歴・ポイント残高をいつでも確認。フロントでQRをかざすだけでチェックイン手続きを短縮。",
        url: "/memberscard",
      },
      {
        image: "/images/クーポン.png",
        name: "施設内クーポン",
        description:
          "レストラン・スパ・売店など施設内サービスのクーポンをLINEで配信。チェックイン後にプッシュ通知で送り、施設内消費を自動で促進。",
        url: "/coupon",
      },
      {
        image: "/images/スタンプカード.png",
        name: "スタンプカード",
        description:
          "宿泊1回ごとにスタンプ付与。規定数到達で特典提供。紙カードの不正・紛失リスクゼロで、リピート率の改善をデータで追跡できる。",
        url: "/stampcard",
      },
      {
        image: "/images/セグメント配信.png",
        name: "セグメント配信",
        description:
          "宿泊履歴・来館頻度・プランタイプで絞ってLINEメッセージ配信。「半年未来訪ゲストへの再来訪促進」「連泊ゲストへの施設利用案内」が自動化。",
        url: "/segment",
      },
    ],
  },
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        LINEミニアプリなら、<br />
        <span className="text-[#06C755]">友だち追加と会員登録を同時に完了</span>
      </>
    ),
    description:
      "公式アカウント単体ではゲスト情報が取れず、SaaSでは宿泊管理システムとの連携に限界がある。グロースパック for LINEはPMS連携・セグメント配信・施設内クーポンをワンパッケージで提供。",
  },
}
