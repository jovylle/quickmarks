import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { App as CapApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { BookmarkList } from '../components/BookmarkList'
import { FolderTabs } from '../components/FolderTabs'
import { ImportPanel } from '../components/ImportPanel'
import { SearchBar } from '../components/SearchBar'
import { clearBookmarkData, loadBookmarkData, saveBookmarkData } from '../lib/storage'
import type { BookmarkData } from '../lib/types'
import { EMPTY_BOOKMARK_DATA } from '../lib/types'

function ThemeToggle() {
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem('quickmarks-theme') === 'light'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark'
    try {
      localStorage.setItem('quickmarks-theme', light ? 'light' : 'dark')
    } catch {
      /* ignore */
    }
  }, [light])

  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={() => setLight((v) => !v)}
    >
      {light ? '🌙' : '☀️'}
    </button>
  )
}

export function AppPage() {
  const [data, setData] = useState<BookmarkData>(EMPTY_BOOKMARK_DATA)
  const [loading, setLoading] = useState(true)
  const [folderId, setFolderId] = useState('root')
  const [query, setQuery] = useState('')

  const refresh = useCallback(async () => {
    const stored = await loadBookmarkData()
    setData(stored)
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    const sub = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back()
      } else {
        void CapApp.exitApp()
      }
    })

    return () => {
      void sub.then((handle) => handle.remove())
    }
  }, [])

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.links.filter((link) => {
      const inFolder = folderId === 'root' ? true : link.folderId === folderId
      if (!inFolder) return false
      if (!q) return true
      return link.title.toLowerCase().includes(q) || link.url.toLowerCase().includes(q)
    })
  }, [data.links, folderId, query])

  async function handleImport(next: BookmarkData) {
    await saveBookmarkData(next)
    setData(next)
    setFolderId('root')
    setQuery('')
  }

  async function handleClear() {
    if (!confirm('Remove all imported bookmarks from this device?')) return
    await clearBookmarkData()
    setData({ ...EMPTY_BOOKMARK_DATA })
    setFolderId('root')
    setQuery('')
  }

  return (
    <div className="page app-page">
      <header className="app-header">
        <Link to="/" className="brand compact">
          <img src="/icon.svg" alt="" width={24} height={24} />
          Quickmarks
        </Link>
        <div className="app-header-actions">
          <ThemeToggle />
          <Link to="/privacy" className="text-link">
            Privacy
          </Link>
        </div>
      </header>

      <main className="app-main">
        <ImportPanel
          onImport={(next) => void handleImport(next)}
          onClear={() => void handleClear()}
          hasData={data.links.length > 0}
          importedAt={data.importedAt}
        />

        {loading ? (
          <p className="empty-state">Loading…</p>
        ) : data.links.length === 0 ? (
          <p className="empty-state">
            No bookmarks yet. Export from Chrome or Edge, then import your .html file above.
          </p>
        ) : (
          <>
            <SearchBar value={query} onChange={setQuery} />
            <FolderTabs
              folders={data.folders}
              activeFolderId={folderId}
              onSelect={setFolderId}
            />
            <BookmarkList
              links={filteredLinks}
              emptyMessage={
                query ? 'No bookmarks match your search.' : 'No bookmarks in this folder.'
              }
            />
          </>
        )}
      </main>
    </div>
  )
}
