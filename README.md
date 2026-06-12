# Quickmarks

Import Chrome or Edge bookmark exports and open them in your default browser. Web app at [quickmarks.uft1.com](https://quickmarks.uft1.com); Android app for Play Store.

## Features

- Import `.html` bookmark exports (drag-and-drop on web, file picker on Android)
- Folder tabs, search across title + URL
- Favicons via Google's favicon service
- Opens links in the system default browser
- All data stays on your device

## Export bookmarks

**Chrome:** ⋮ → Bookmarks → Bookmark manager → ⋮ → Export bookmarks

**Edge:** ⋮ → Favorites → ••• → Export favorites

## Development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm test
```

## Android (Capacitor)

```bash
npm run build:mobile    # build web + sync to mobile/www
npm run mobile:open     # open Android Studio
npm run mobile:run      # run on device/emulator
npm run mobile:release  # signed release AAB (needs keystore.properties)
```

Release signing: copy `mobile/android/keystore.properties.example` → `keystore.properties` and create a keystore.

## Privacy

[Privacy policy](https://quickmarks.uft1.com/privacy) — no accounts, no server storage of bookmarks.

## License

MIT
