import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { JSDOM } from 'jsdom'
import { parseBookmarkHtml } from './parseBookmarks.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fixture = readFileSync(
  join(__dirname, '../fixtures/bookmarks.sample.html'),
  'utf8',
)

test('parseBookmarkHtml extracts links from sample export', () => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
  globalThis.DOMParser = dom.window.DOMParser

  const data = parseBookmarkHtml(fixture)
  assert.equal(data.links.length, 3)
  const urls = data.links.map((link) => link.url).sort()
  assert.deepEqual(urls, [
    'https://developer.mozilla.org/',
    'https://example.com/',
    'https://github.com/',
  ])
  assert.ok(data.folders.some((folder) => folder.title === 'Bookmarks bar'))
})
