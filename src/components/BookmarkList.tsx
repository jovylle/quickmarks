import type { BookmarkLink } from '../lib/types'
import { faviconUrl, initialForTitle } from '../lib/favicon'
import { openUrl } from '../lib/openUrl'

interface BookmarkListProps {
  links: BookmarkLink[]
  emptyMessage?: string
}

export function BookmarkList({ links, emptyMessage }: BookmarkListProps) {
  if (!links.length) {
    return <p className="empty-state">{emptyMessage ?? 'No bookmarks in this folder.'}</p>
  }

  return (
    <ul className="bookmark-list">
      {links.map((link) => (
        <li key={link.id}>
          <button
            type="button"
            className="bookmark-item"
            onClick={() => void openUrl(link.url)}
          >
            <span className="bookmark-icon" aria-hidden="true">
              {faviconUrl(link.url) ? (
                <img
                  src={faviconUrl(link.url)}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : null}
              <span className="bookmark-fallback">{initialForTitle(link.title)}</span>
            </span>
            <span className="bookmark-text">
              <span className="bookmark-title">{link.title}</span>
              <span className="bookmark-url">{link.url}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
