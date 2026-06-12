import type { BookmarkData, BookmarkFolder, BookmarkLink } from './types'

let idCounter = 0

function nextId(prefix: string): string {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

function resetIds(): void {
  idCounter = 0
}

function parseDl(
  dl: Element,
  parentId: string | null,
  parentPath: string[],
  folders: BookmarkFolder[],
  links: BookmarkLink[],
): void {
  const children = Array.from(dl.children).filter((node) => node.tagName === 'DT')

  for (const dt of children) {
    const heading = dt.querySelector(':scope > H3')
    const anchor = dt.querySelector(':scope > A')
    const nestedDl = dt.querySelector(':scope > DL')

    if (heading) {
      const title = heading.textContent?.trim() || 'Untitled folder'
      const folderId = nextId('folder')
      const path = [...parentPath, title]

      folders.push({
        id: folderId,
        title,
        path,
        parentId,
      })

      if (nestedDl) {
        parseDl(nestedDl, folderId, path, folders, links)
      }
      continue
    }

    if (anchor) {
      const url = anchor.getAttribute('href')?.trim() || anchor.getAttribute('HREF')?.trim()
      if (!url || url.startsWith('javascript:')) continue

      const title = anchor.textContent?.trim() || url
      const folderId = parentId ?? 'root'
      const folderPath = parentPath.length ? parentPath : ['All bookmarks']

      links.push({
        id: nextId('link'),
        title,
        url,
        folderId,
        folderPath,
      })

      if (nestedDl) {
        parseDl(nestedDl, folderId, folderPath, folders, links)
      }
    }
  }
}

export function parseBookmarkHtml(html: string): BookmarkData {
  resetIds()

  const doc = new DOMParser().parseFromString(html, 'text/html')
  const rootDl = doc.querySelector('DL')

  const folders: BookmarkFolder[] = [
    {
      id: 'root',
      title: 'All bookmarks',
      path: ['All bookmarks'],
      parentId: null,
    },
  ]
  const links: BookmarkLink[] = []

  if (rootDl) {
    parseDl(rootDl, 'root', ['All bookmarks'], folders, links)
  }

  return {
    folders,
    links,
    importedAt: new Date().toISOString(),
  }
}
