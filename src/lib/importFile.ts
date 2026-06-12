import { Capacitor } from '@capacitor/core'
import { FilePicker } from '@capawesome/capacitor-file-picker'
import { parseBookmarkHtml } from './parseBookmarks'
import type { BookmarkData } from './types'

async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

export async function importFromFile(file: File): Promise<BookmarkData> {
  const html = await readFileAsText(file)
  return parseBookmarkHtml(html)
}

export async function pickAndImportBookmarks(): Promise<BookmarkData | null> {
  if (Capacitor.isNativePlatform()) {
    const result = await FilePicker.pickFiles({
      types: ['text/html', 'application/xhtml+xml', '*/*'],
      readData: true,
    })

    const picked = result.files[0]
    if (!picked?.data) return null

    let html: string
    if (typeof picked.data === 'string') {
      const binary = atob(picked.data)
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
      html = new TextDecoder().decode(bytes)
    } else {
      html = new TextDecoder().decode(picked.data)
    }

    return parseBookmarkHtml(html)
  }

  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.html,text/html'
    input.style.display = 'none'
    document.body.appendChild(input)

    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      document.body.removeChild(input)
      if (!file) {
        resolve(null)
        return
      }
      resolve(await importFromFile(file))
    })

    input.click()
  })
}
