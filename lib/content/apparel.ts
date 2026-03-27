import type { IndustryContent } from "./types"

export const apparel: IndustryContent = {
  id: "apparel",
  seo: {
    title:
      "アパレル向けLINEミニアプリ開発 | 会員証・1to1・ギフト | グロースパック for LINE",
    description:
      "50ブランド1,078店舗のPAL CLOSETが会員数3倍を実現。EC×店舗の会員統合からセグメント配信まで、アパレルに特化したLINEミニアプリ開発サービス",
    ogTitle: "アパレル向けLINEミニアプリ開発 | グロースパック for LINE",
    ogDescription:
      "PAL CLOSETが50ブランド統合で会員数3倍・EC売上5倍。アパレル特化のLINEミニアプリ開発",
  },
  hero: {
    h1: "EC会員と店舗会員、まだバラバラに管理していませんか？",
    subCopy:
      "店舗POS・EC・LINE——散在する顧客データをLINEミニアプリで統合。アプリDL不要、5秒で会員登録完了。アパレルに特化した会員証・1to1接客・クーポン配信を最短3ヶ月で構築できます。",
    visualVariant: "typography",
    displayStats: [
      { value: "3ヶ月", label: "最短開発期間" },
      { value: "5秒", label: "会員登録完了" },
      { value: "10", label: "選べる機能数" },
    ],
  },
  problems: [
    {
      title: "EC会員と店舗会員、同一人物なのに別カウント",
      description:
        "店舗POS・ECサイト・LINE公式アカウント、それぞれに会員データが散在。同じ顧客が3つのIDを持ち、購買行動の全体像が見えない。メッセージ配信の精度が上がらず、ブロック率は20〜30%に達する。",
    },
    {
      title: "スタッフが異動するたび、顧客との関係がゼロに戻る",
      description:
        "店舗スタッフの接客知識は個人に属している。異動・退職のたびに「あのお客様は何がお好みだったか」が失われ、顧客体験が途切れる。属人的な接客は、ブランドの資産にならない。",
    },
    {
      title: "50ブランド横断の会員証、SaaSでは対応できない",
      description:
        "複数ブランドを展開するアパレル企業にとって、ブランド横断の統合会員証は必須。しかし月額制SaaSは単一ブランド前提の設計で、マルチブランド管理・既存EC連携・大規模トラフィックに対応できない。",
    },
  ],
  solutionStory: {
    headline: "4つの機能で、顧客との関係を積み上げる",
    subheadline:
      "LINEミニアプリの会員証を起点に、接客・再来店促進・ファン化までを一気通貫で設計",
    steps: [
      {
        label: "会員証で統合IDを作る",
        description:
          "来店時にLINEで5秒で会員登録。店舗・EC・LINEのデータを一つのIDに統合し、ブランドを横断した購買履歴を可視化する。",
        featureId: "memberscard",
      },
      {
        label: "1to1で担当に依存しない接客を実現",
        description:
          "LINE上で顧客ごとの対応履歴を記録。スタッフが異動しても、過去の接客内容・好みの傾向を次の担当が引き継げる。",
        featureId: "1to1",
      },
      {
        label: "クーポン・ギフトで再来店を促す",
        description:
          "購買データに基づくパーソナライズクーポンと、友人紹介ギフトで新規顧客を獲得。一律配信ではなく、行動に応じた出し分けでブロック率を抑える。",
        featureId: "coupon",
      },
      {
        label: "セグメント配信で効果を最大化",
        description:
          "統合された会員データをもとに、購買頻度・来店チャネル・ブランド嗜好でセグメントを切り、最適なタイミングで最適なメッセージを届ける。",
        featureId: "segment",
      },
    ],
  },
  featureHighlights: [
    {
      featureId: "memberscard",
      name: "LINE会員証",
      industryContext:
        "来店時にバーコード提示で50ブランド横断のポイントを加算。アプリDL不要で、ライトユーザーの会員化率が3倍に。EC購買データとの自動連携で、オンライン・オフラインの購買行動を統合する。",
      proof: "PAL CLOSET：新規会員登録数200%増",
    },
    {
      featureId: "1to1",
      name: "1to1コミュニケーション",
      industryContext:
        "顧客ごとのLINEチャット履歴を全スタッフで共有。来店予約の確認、入荷通知、コーディネート提案をLINE上で完結。スタッフ異動後も途切れない接客を実現する。",
      proof: undefined,
    },
    {
      featureId: "coupon",
      name: "クーポン配信",
      industryContext:
        "購買履歴・来店頻度に基づくセグメント別クーポンで、一律配信と比較してブロック率を18%低減。誕生日クーポン、休眠復帰クーポンなど、顧客のライフサイクルに応じた施策を自動化する。",
      proof: undefined,
    },
    {
      featureId: "gift",
      name: "ギフト（友人紹介）",
      industryContext:
        "既存会員がLINEで友人にギフトを贈ると、受け取った友人も会員登録。紹介者と被紹介者双方にインセンティブを付与し、広告費をかけずに新規顧客を獲得する仕組み。",
      proof: undefined,
    },
  ],
  caseStudies: [
    {
      company: "PAL CLOSET（パルグループ）",
      industry: "アパレル・ファッション｜50ブランド・1,078店舗",
      quote:
        "Native appはアプリDLが必要な為、ライトユーザーや操作に不慣れなお客様に導入が進まず、スタッフ/ユーザー双方に課題感があった。LINE Mini appはライトユーザーへのリーチ＆会員化という棲み分けができた",
      metrics: [
        { value: "200", unit: "%", label: "新規会員数増加" },
        { value: "10", unit: "万人", label: "友だち追加/月" },
        { value: "5", unit: "倍", label: "EC売上成長" },
      ],
      details:
        "50ブランド・1,078店舗を展開するパルグループが、LINEミニアプリで会員基盤を統合。既存のネイティブアプリではリーチできなかったライトユーザー層の会員化に成功し、新規会員登録数は導入前の3倍に。友だち追加は月間10万人ペースで推移し、EC売上は5倍に成長した。",
    },
  ],
  cta: {
    headline: "アパレル業界の会員統合事例を詳しく見る",
    subtext:
      "PAL CLOSETの導入プロセス・技術構成・成果数値など、詳しい情報を資料でご確認いただけます",
  },
}
