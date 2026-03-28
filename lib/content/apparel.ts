import type { IndustryContent } from "./types"

export const apparel: IndustryContent = {
  id: "apparel",
  seo: {
    title:
      "アパレル店舗の顧客接点DX｜LINEミニアプリ開発 | グロースパック for LINE",
    description:
      "193名調査で見えた店舗スタッフの課題。50ブランド横断の会員証で顧客接点を一元化。",
    ogTitle: "アパレル店舗の顧客接点DX｜Growthpack for LINE",
    ogDescription:
      "193名���査で見えた店舗スタッフの課題。50ブランド横断の会員証で顧客接点を一元化。",
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
      title: "接客以外の業務が4割超 ── 過半数のスタッフが直面",
      description:
        "店舗スタッフの半数以上が、業務時間の4割以上を接客以外に費やしていま��。",
      stat: { value: "50.8%", label: "接客���外が4割超の割合" },
    },
    {
      title: "最大の課題は\u201c手作業オペ\u201d ── EC連携ではない",
      description:
        "値下げ・価格変更など店舗オペレーションの手作業が課題深刻度1位（Top2Box率36.3%）。EC×店舗連携（22.8%）を大きく上回りました。",
      stat: { value: "36.3%", label: "課題深刻度1位" },
    },
    {
      title: "改善の声が届かない ── 8割超が\u201c壁\u201dを感じている",
      description:
        "改善意見を持つ店舗スタッフ122名のうち、82.0%が「伝えても反映されない」「言いづらい」「手段がない」と回答しています。",
      stat: { value: "82.0%", label: "声が届かない割合" },
    },
  ],
  solutionStory: {
    headline: "4つのPhaseで、顧客との関係を積み上げる",
    subheadline:
      "LINEミニアプリの会員証を起点に、接客・再来店促進・ファン化までを一気通貫で設計",
    steps: [
      {
        label: "Phase 1｜会員証で統合IDを作る",
        description:
          "来店時にLINEで5秒で会員登録。店舗・EC・LINEのデータを一つのIDに統合し、ブランドを横断した購買履歴を可視化する。",
        featureId: "memberscard",
      },
      {
        label: "Phase 2｜1to1で担当に依存しない接客を実現",
        description:
          "LINE上で顧客ごとの対応履歴を記録。スタッフが異動しても、過去の接客内容・好みの傾向を次の担当が引き継げる。",
        featureId: "1to1",
      },
      {
        label: "Phase 3｜クーポン・ギフトで再来店を促す",
        description:
          "購買データに基づくパーソナライズクーポンと、友人紹介ギフトで新規顧客を獲得。一律配信ではなく、行動に応じた出し分けでブロック率を抑える。",
        featureId: "coupon",
      },
      {
        label: "Phase 4｜セグメント配信で効果を最大化",
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
      name: "ギフト（友��紹介）",
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
    headline: "製品資料をダウンロード",
    subtext:
      "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
