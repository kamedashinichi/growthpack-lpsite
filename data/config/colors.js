/**
 * Color tokens aligned with docs/DESIGN.md v1.2
 *
 * primary  = LINE Green palette (brand + CTA/link with AA contrast)
 * neutral  = text / border / background (matched to actual implementation HEX)
 * secondary = dark CTA / footer
 *
 * NOTE: #06C755 (LINE Green main) does NOT meet WCAG AA when placed under
 * white text. Use `primary.dark` (#05A847) for any surface that carries
 * text (buttons, links, headings on white bg).
 * See docs/DESIGN.md section 1 "コントラスト運用の原則".
 */
export const colors = {
  // LINE Green brand palette
  primary: {
    lighter: '#E8F8F0', // bg tag, highlight block
    light: '#39D275',   // (reserved) gradient accent only
    main: '#06C755',    // LINE Green — 色面単独 / focus ring / decorative
    dark: '#05A847',    // CTA button body, body link (AA ensured)
    darker: '#048838',  // hover, pressed
  },
  // Dark CTA / footer / secondary surface
  secondary: {
    lighter: '#6B7280',
    light: '#4B5563',
    main: '#32373c',
    dark: '#1a1d21',
    darker: '#0a0a0a',
  },
  // Neutral (text / border / bg)
  neutral: {
    lighter: '#F8F9FA', // bg muted
    light: '#E5E7EB',   // border
    main: '#9CA3AF',    // text muted
    dark: '#6B7280',    // text sub
    darker: '#1F2937',  // text primary
  },
};
