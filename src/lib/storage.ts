import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'
import type { BookmarkData } from './types'
import { EMPTY_BOOKMARK_DATA } from './types'

const TREE_KEY = 'quickmarks:tree'
const IMPORTED_AT_KEY = 'quickmarks:importedAt'

async function readRaw(key: string): Promise<string | null> {
  if (Capacitor.isNativePlatform()) {
    const { value } = await Preferences.get({ key })
    return value
  }
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

async function writeRaw(key: string, value: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await Preferences.set({ key, value })
    return
  }
  localStorage.setItem(key, value)
}

async function removeRaw(key: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await Preferences.remove({ key })
    return
  }
  localStorage.removeItem(key)
}

export async function loadBookmarkData(): Promise<BookmarkData> {
  const raw = await readRaw(TREE_KEY)
  if (!raw) return { ...EMPTY_BOOKMARK_DATA }

  try {
    const parsed = JSON.parse(raw) as BookmarkData
    const importedAt = (await readRaw(IMPORTED_AT_KEY)) ?? parsed.importedAt ?? null
    return {
      folders: parsed.folders ?? [],
      links: parsed.links ?? [],
      importedAt,
    }
  } catch {
    return { ...EMPTY_BOOKMARK_DATA }
  }
}

export async function saveBookmarkData(data: BookmarkData): Promise<void> {
  const { importedAt, ...tree } = data
  await writeRaw(TREE_KEY, JSON.stringify(tree))
  if (importedAt) {
    await writeRaw(IMPORTED_AT_KEY, importedAt)
  }
}

export async function clearBookmarkData(): Promise<void> {
  await removeRaw(TREE_KEY)
  await removeRaw(IMPORTED_AT_KEY)
}
