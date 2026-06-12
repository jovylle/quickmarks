export function faviconUrl(pageUrl: string, size = 32): string {
  try {
    const { hostname } = new URL(pageUrl)
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=${size}`
  } catch {
    return ''
  }
}

export function initialForTitle(title: string): string {
  const trimmed = title.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?'
}
