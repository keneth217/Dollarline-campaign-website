/**
 * Normalize Kenyan mobile numbers for storage and UNIQUE checks.
 * Stores as 10 digits: 0 + 9-digit national (e.g. 0712345678).
 * Uniqueness is enforced on this full value in the database — masking is display-only.
 */
export function normalizePhoneKE(input: string): string | null {
  const raw = (input ?? '').trim().replace(/\s+/g, '').replace(/-/g, '')
  if (!raw) return null

  let d = raw.replace(/\D/g, '')

  if (d.startsWith('254')) {
    d = d.slice(3)
    if (d.length === 9 && /^[17]/.test(d)) d = `0${d}`
  } else if (d.length === 9 && /^[17]/.test(d)) {
    d = `0${d}`
  }

  if (/^0[17]\d{8}$/.test(d)) return d

  return null
}

/**
 * Display mask: first 2 digits, middle digits as X, last 3 (e.g. 0712345678 → 07XXXXX678).
 */
export function maskKenyanPhone(phone: string): string {
  const normalized = normalizePhoneKE(phone)
  const d = normalized ?? phone.replace(/\D/g, '')
  if (d.length < 6) return '•••••••'

  const last3 = d.slice(-3)
  const prefix = d.slice(0, 2)
  const middleLen = Math.max(0, d.length - 2 - 3)
  return `${prefix}${'X'.repeat(middleLen)}${last3}`
}
