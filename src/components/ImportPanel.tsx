import { useRef, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { importFromFile, pickAndImportBookmarks } from '../lib/importFile'
import type { BookmarkData } from '../lib/types'

interface ImportPanelProps {
  onImport: (data: BookmarkData) => void
  onClear: () => void
  hasData: boolean
  importedAt: string | null
}

export function ImportPanel({ onImport, onClear, hasData, importedAt }: ImportPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return

    setBusy(true)
    setError(null)
    try {
      const data = await importFromFile(file)
      onImport(data)
    } catch {
      setError('Could not read that file. Export bookmarks as HTML from Chrome or Edge.')
    } finally {
      setBusy(false)
    }
  }

  async function handlePick() {
    setBusy(true)
    setError(null)
    try {
      const data = await pickAndImportBookmarks()
      if (data) onImport(data)
    } catch {
      setError('Import failed. Try choosing your bookmarks.html file again.')
    } finally {
      setBusy(false)
    }
  }

  const isNative = Capacitor.isNativePlatform()

  return (
    <section className="import-panel">
      <div
        className={dragging ? 'import-dropzone dragging' : 'import-dropzone'}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          void handleFiles(e.dataTransfer.files)
        }}
      >
        <p className="import-lead">
          {hasData ? 'Replace bookmarks' : 'Import bookmarks'}
        </p>
        <p className="import-hint">
          {isNative
            ? 'Pick your exported bookmarks.html from Downloads or files.'
            : 'Drop a Chrome or Edge bookmarks export (.html), or choose a file.'}
        </p>
        <div className="import-actions">
          <button type="button" className="btn primary" disabled={busy} onClick={() => void handlePick()}>
            {busy ? 'Importing…' : isNative ? 'Choose file' : 'Choose .html file'}
          </button>
          {!isNative && (
            <button
              type="button"
              className="btn ghost"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            >
              Browse
            </button>
          )}
          {hasData && (
            <button type="button" className="btn danger" disabled={busy} onClick={onClear}>
              Clear data
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".html,text/html"
          hidden
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>
      {importedAt && (
        <p className="import-meta">
          Last import: {new Date(importedAt).toLocaleString()}
        </p>
      )}
      {error && <p className="import-error" role="alert">{error}</p>}
    </section>
  )
}
