"use client"

import { useState } from "react"
import { track } from "@vercel/analytics"
import { Download, Loader2, FileText, ExternalLink } from "lucide-react"
import { submitWhitepaperForm } from "@/app/actions/submitWhitepaperForm"

type FormState = "idle" | "submitting" | "success" | "error"

interface FormErrors {
  email?: string
  company_name?: string
  challenge_type?: string
  privacy?: string
}

const CHALLENGE_OPTIONS = [
  { value: "store_efficiency", label: "店舗スタッフの業務効率化" },
  { value: "data_integration", label: "EC×店舗の顧客データ統合" },
  { value: "line_communication", label: "LINE活用・顧客コミュニケーション改善" },
  { value: "other", label: "その他" },
]

const PDF_PATH = "/downloads/whitepaper-apparel-2026.pdf"

export function WPDownloadForm() {
  const [email, setEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [challengeType, setChallengeType] = useState("")
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [formState, setFormState] = useState<FormState>("idle")
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState("")

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!email) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "正しいメールアドレスを入力してください"
    }

    if (!companyName.trim()) {
      newErrors.company_name = "企業名を入力してください"
    }

    if (!challengeType) {
      newErrors.challenge_type = "課題を選択してください"
    }

    if (!privacyConsent) {
      newErrors.privacy = "プライバシーポリシーへの同意が必要です"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError("")

    if (!validate()) return

    setFormState("submitting")

    try {
      const result = await submitWhitepaperForm({
        email,
        company_name: companyName,
        challenge_type: challengeType,
      })

      if (result.success) {
        setFormState("success")
        track("wp_form_submit", {
          location: "after_problem",
          industry: "apparel",
          challenge: challengeType,
        })
        // Trigger PDF download
        const link = document.createElement("a")
        link.href = PDF_PATH
        link.download = ""
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        setServerError(
          result.error ?? "送信に失敗しました。時間をおいて再度お試しください。"
        )
        setFormState("error")
      }
    } catch {
      setServerError("送信に失敗しました。時間をおいて再度お試しください。")
      setFormState("error")
    }
  }

  if (formState === "success") {
    return (
      <section id="wp-download" className="py-12 sm:py-16 md:py-20 bg-[#F8F9FA]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-10 md:p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-[#06C755]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-[#06C755]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-4">
              ダウンロードありがとうございます
            </h3>
            <p className="text-sm sm:text-base text-neutral-500 mb-6 leading-relaxed">
              レポートのダウンロードが開始されます。
              <br />
              開始されない場合は
              <a
                href={PDF_PATH}
                download
                className="text-[#06C755] underline underline-offset-2 hover:text-[#05A847]"
              >
                こちら
              </a>
              をクリックしてください。
            </p>
            <div className="border-t border-neutral-200 pt-6 mt-6">
              <p className="text-sm text-neutral-500 mb-3">
                具体的なご相談はこちらからお問い合わせください
              </p>
              <a
                href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#06C755] font-bold hover:text-[#05A847] transition-colors"
              >
                お問い合わせ
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="wp-download" className="py-12 sm:py-16 md:py-20 bg-[#F8F9FA]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
            {/* Left Column - WP Info */}
            <div className="bg-[#0a0a0a] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs tracking-[0.15em] uppercase text-[#06C755] mb-3">
                無料ダウンロード
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-3">
                アパレル店舗スタッフ
                <br />
                業務実態調査 2026
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                193名調査で見えた、現場の&ldquo;見えない非効率&rdquo;と&ldquo;届かない声&rdquo;
              </p>
            </div>

            {/* Right Column - Form */}
            <div className="p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="wp-email"
                      className="block text-sm font-bold text-[#1F2937] mb-1.5"
                    >
                      メールアドレス
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      id="wp-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                      }}
                      placeholder="example@company.co.jp"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06C755] transition-colors ${
                        errors.email
                          ? "border-red-400 focus:ring-red-400"
                          : "border-neutral-300"
                      }`}
                    />
                    {errors.email && (
                      <p role="alert" className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="wp-company"
                      className="block text-sm font-bold text-[#1F2937] mb-1.5"
                    >
                      企業名
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      id="wp-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value)
                        if (errors.company_name)
                          setErrors((prev) => ({ ...prev, company_name: undefined }))
                      }}
                      placeholder="株式会社○○"
                      aria-required="true"
                      aria-invalid={!!errors.company_name}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06C755] transition-colors ${
                        errors.company_name
                          ? "border-red-400 focus:ring-red-400"
                          : "border-neutral-300"
                      }`}
                    />
                    {errors.company_name && (
                      <p role="alert" className="text-xs text-red-500 mt-1">
                        {errors.company_name}
                      </p>
                    )}
                  </div>

                  {/* Challenge Type */}
                  <div>
                    <label
                      htmlFor="wp-challenge"
                      className="block text-sm font-bold text-[#1F2937] mb-1.5"
                    >
                      現在の課題
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select
                      id="wp-challenge"
                      value={challengeType}
                      onChange={(e) => {
                        setChallengeType(e.target.value)
                        if (errors.challenge_type)
                          setErrors((prev) => ({ ...prev, challenge_type: undefined }))
                      }}
                      aria-required="true"
                      aria-invalid={!!errors.challenge_type}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06C755] transition-colors appearance-none bg-white ${
                        errors.challenge_type
                          ? "border-red-400 focus:ring-red-400"
                          : "border-neutral-300"
                      } ${!challengeType ? "text-neutral-400" : "text-[#1F2937]"}`}
                    >
                      <option value="" disabled>
                        選択してください
                      </option>
                      {CHALLENGE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.challenge_type && (
                      <p role="alert" className="text-xs text-red-500 mt-1">
                        {errors.challenge_type}
                      </p>
                    )}
                  </div>

                  {/* Privacy Consent */}
                  <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => {
                          setPrivacyConsent(e.target.checked)
                          if (errors.privacy)
                            setErrors((prev) => ({ ...prev, privacy: undefined }))
                        }}
                        className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#06C755] focus:ring-[#06C755]"
                        aria-required="true"
                      />
                      <span className="text-sm text-neutral-600">
                        <a
                          href="https://classmethod.jp/company/privacypolicy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#06C755] underline underline-offset-2 hover:text-[#05A847]"
                        >
                          プライバシーポリシー
                        </a>
                        に同意する
                      </span>
                    </label>
                    {errors.privacy && (
                      <p role="alert" className="text-xs text-red-500 mt-1">
                        {errors.privacy}
                      </p>
                    )}
                  </div>
                </div>

                {/* Server Error */}
                {serverError && (
                  <div role="alert" className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{serverError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  aria-busy={formState === "submitting"}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#06C755] text-white font-bold text-sm sm:text-base rounded-lg shadow-[0_2px_8px_rgba(6,199,85,0.25)] hover:bg-[#05A847] hover:shadow-[0_4px_12px_rgba(6,199,85,0.35)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      送信中...
                    </>
                  ) : (
                    <>
                      <Download size={18} strokeWidth={2.5} />
                      無料レポートをダウンロード
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
