export interface BookmarkLink {
  id: string
  title: string
  url: string
  folderId: string
  folderPath: string[]
}

export interface BookmarkFolder {
  id: string
  title: string
  path: string[]
  parentId: string | null
}

export interface BookmarkData {
  folders: BookmarkFolder[]
  links: BookmarkLink[]
  importedAt: string | null
}

export const EMPTY_BOOKMARK_DATA: BookmarkData = {
  folders: [],
  links: [],
  importedAt: null,
}
