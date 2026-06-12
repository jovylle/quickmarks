interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="sr-only">Search bookmarks</span>
      <input
        type="search"
        placeholder="Search title or URL…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        enterKeyHint="search"
      />
    </label>
  )
}
