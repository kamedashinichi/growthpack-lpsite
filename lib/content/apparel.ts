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
      "193名調査で見えた店舗スタッフの課題。50ブランド横断の会員証で顧客接点を一元化。",
  },
  hero: {
    h1: "50ブランド、1つの会員証。",
    subCopy:
      "EC×店舗の会員データを統合し、ブランドを横断した顧客体験をLINEミニアプリで実現。",
    visualVariant: "typography",
    displayStats: [
      { value: "3倍", label: "会員数増加" },
      { value: "5秒", label: "で会員登録完了" },
      { value: "10万人", label: "友だち増加（1ヶ月）" },
    ],
  },
  problems: [
    {
      title: "業務時間の半分が接客以外に消えている",
      description:
        "店舗スタッフの過半数が、業務時間の4割以上を接客以外に費やしています。値下げ・価格変更の手作業、店舗間取り寄せ、棚卸し ── 3人に1人以上が深刻と回答。",
      stat: { value: "50.8%", label: "アパレル店舗スタッフ業務実態調査 2026（n=193）" },
    },
    {
      title: "顧客は離れているのに、フォローできていない",
      description:
        "半数以上が顧客離れを経験する一方、27.5%はフォロー自体を行っておらず、実施している場合も72%が電話・個人LINE・声かけのアナログ手段。",
      stat: { value: "55.7%", label: "同上" },
    },
    {
      title: "手作業に追われるスタッフほど、フォローに手が回らない",
      description:
        "接客以外の業務が多いスタッフのフォロー未実施率は36.7%。業務が少ないスタッフ（17.9%）の約2倍でした。",
      stat: { value: "2倍", label: "同上" },
    },
  ],
  solutionStory: {
    headline: "接客を起点に、顧客との関係を育てる",
    subheadline:
      "LINE基本機能で顧客基盤を作り、アパレル特化機能で接客の接点と情報を蓄積し、セグメントマネージャーでフォローを自動化",
    steps: [
      {
        label: "Phase 1｜顧客基盤をつくる",
        description:
          "LINEミニアプリで会員証を発行し、来店・購買データを自動蓄積。クーポンやセグメント配信で再来店を促進します。どの業界でも使える基盤機能を、最短で立ち上げ。",
        featureId: "memberscard",
      },
      {
        label: "Phase 2｜アパレル特化機能で、接客と顧客関係を強化する",
        description:
          "接客の一瞬を、長く続く関係に変える。アパレルの接客シーンに特化した新機能が連動し、「接客 → 情報蓄積 → フォロー」の流れを自動で作ります。",
        featureId: "product-share",
        subSteps: [
          {
            title: "店頭商品シェア ── 接点を作る",
            description:
              "接客中にスタッフが商品情報をQR等で顧客のLINEにシェア。「検討します」で帰っても、顧客のLINEに商品情報が残ります。友だち追加の自然な起点にもなります。",
          },
          {
            title: "顧客カルテ ── 情報が貯まる",
            description:
              "商品シェア履歴・購入履歴・サイズ・スタイル傾向がデジタルで蓄積。紙メモや記憶に頼らず、担当者が変わっても接客品質を維持できます。",
          },
        ],
      },
      {
        label: "Phase 3｜セグメントマネージャーで、すべてをつなぐ",
        description:
          "Phase 1-2で蓄積された会員証データ・商品シェア履歴・クーポン利用・来店回数などを、1人の顧客レコードに自動統合。「ゴールド会員なのに30日来ていない」「商品をシェアしたが未購入」といった機能横断の状態を把握し、条件に応じたフォローを自動実行します。",
        featureId: "segment-manager",
        scenarios: [
          "商品シェア3日後 → 「あの商品まだございます」",
          "購入1週間後 → コーデ提案メッセージ",
          "来店30日経過 → 新作入荷のお知らせ",
          "サイズ在庫復活 → 登録サイズの再入荷通知",
        ],
      },
      {
        label: "Phase 4｜さらにその先へ",
        description:
          "POS連携による店舗業務の効率化、AIを活用したコンテンツ自動生成、SNS投稿支援など、導入後のニーズに応じて機能を拡張できます。",
        featureId: "options",
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
      category: "顧客接点の創出",
    },
    {
      featureId: "product-share",
      name: "店頭商品シェア",
      industryContext:
        "接客中にスタッフが商品情報をQRで顧客のLINEにシェア。商品情報が顧客のLINEに残り、友だち追加の自然な起点にもなる。シェア履歴は自動で顧客カルテに蓄積される。",
      isNew: true,
      category: "顧客接点の創出",
    },
    {
      featureId: "stamp",
      name: "スタンプカード",
      industryContext:
        "来店や購入のたびにスタンプを付与。特典達成でクーポンを自動発行し、再来店を促進する。紙のスタンプカードと異なり、紛失の心配がない。",
      category: "エンゲージメント強化",
    },
    {
      featureId: "coupon",
      name: "クーポン配信",
      industryContext:
        "購買履歴・来店頻度に基づくセグメント別クーポンで、一律配信と比較してブロック率を低減。誕生日クーポン、休眠復帰クーポンなど、顧客のライフサイクルに応じた施策を自動化する。",
      category: "エンゲージメント強化",
    },
    {
      featureId: "lottery",
      name: "抽選",
      industryContext:
        "来店時やイベント時にLINE上で抽選を実施。当選結果に応じたクーポンを即時発行し、購買を促進する。",
      category: "エンゲージメント強化",
    },
    {
      featureId: "segment",
      name: "セグメント配信",
      industryContext:
        "購買頻度・来店チャネル・ブランド嗜好でセグメントを切り、最適なタイミングで最適なメッセージを届ける。一斉配信と比較して開封率・タップ率が向上する。",
      category: "関係性深化",
    },
    {
      featureId: "1to1",
      name: "1to1コミュニケーション",
      industryContext:
        "顧客ごとのLINEチャット履歴を全スタッフで共有。来店予約の確認、入荷通知、コーディネート提案をLINE上で完結。スタッフ異動後も途切れない接客を実現する。",
      category: "関係性深化",
    },
    {
      featureId: "gift",
      name: "ギフト（友人紹介）",
      industryContext:
        "既存会員がLINEで友人にギフトを贈ると、受け取った友人も会員登録。紹介者と被紹介者双方にインセンティブを付与し、広告費をかけずに新規顧客を獲得する仕組み。",
      category: "関係性深化",
    },
    {
      featureId: "customer-card",
      name: "顧客カルテ",
      industryContext:
        "顧客の購入履歴・サイズ・好み・スタイル傾向・シェア履歴をスタッフがLINEミニアプリから確認。POS連携なしでも、会員証登録データ・シェア履歴・来店履歴で最低限のカルテが成立する。",
      isNew: true,
      category: "関係性深化",
    },
    {
      featureId: "segment-manager",
      name: "セグメントマネージャー",
      industryContext:
        "全機能が生んだデータを1人の顧客レコードに統合し、条件に応じたフォローを自動実行する基盤。個別機能は他のLINEパートナーにもあるが、全データ統合+シナリオ自動実行はアーキテクチャレベルの差別化。",
      isNew: true,
      category: "すべてをつなぐ",
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
