import type { BookmarkFolder } from '../lib/types'

interface FolderTabsProps {
  folders: BookmarkFolder[]
  activeFolderId: string
  onSelect: (folderId: string) => void
}

export function FolderTabs({ folders, activeFolderId, onSelect }: FolderTabsProps) {
  const visible = folders.filter((folder) => folder.id === 'root' || folder.parentId === 'root')

  return (
    <div className="folder-tabs" role="tablist" aria-label="Bookmark folders">
      {visible.map((folder) => (
        <button
          key={folder.id}
          type="button"
          role="tab"
          aria-selected={activeFolderId === folder.id}
          className={activeFolderId === folder.id ? 'folder-tab active' : 'folder-tab'}
          onClick={() => onSelect(folder.id)}
        >
          {folder.title}
        </button>
      ))}
    </div>
  )
}
