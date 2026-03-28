"use server"

import { google } from "googleapis"

interface FormResult {
  success: boolean
  error?: string
}

export async function submitWhitepaperForm(formData: {
  email: string
  company_name: string
  challenge_type: string
}): Promise<FormResult> {
  const { email, company_name, challenge_type } = formData

  // Server-side validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "正しいメールアドレスを入力してください" }
  }
  if (!company_name || company_name.trim().length === 0) {
    return { success: false, error: "企業名を入力してください" }
  }
  const validChallenges = [
    "store_efficiency",
    "data_integration",
    "line_communication",
    "other",
  ]
  if (!challenge_type || !validChallenges.includes(challenge_type)) {
    return { success: false, error: "課題を選択してください" }
  }

  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    )
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!privateKey || !clientEmail || !spreadsheetId) {
      console.error("Google Sheets environment variables are not configured")
      return { success: false, error: "送信に失敗しました。時間をおいて再度お試しください。" }
    }

    const auth = new google.auth.JWT(clientEmail, undefined, privateKey, [
      "https://www.googleapis.com/auth/spreadsheets",
    ])

    const sheets = google.sheets({ version: "v4", auth })

    const now = new Date()
    const timestamp = now.toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "apparel_wp_leads!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, email, company_name, challenge_type]],
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to submit to Google Sheets:", error)
    return { success: false, error: "送信に失敗しました。時間をおいて再度お試しください。" }
  }
}
