import { Link } from 'react-router-dom'

export function Privacy() {
  return (
    <div className="page legal-page">
      <header className="site-header">
        <Link to="/" className="brand">
          <img src="/icon.svg" alt="" width={28} height={28} />
          Quickmarks
        </Link>
        <nav>
          <Link to="/app" className="btn ghost">
            App
          </Link>
        </nav>
      </header>

      <main className="legal-main card">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> June 12, 2026</p>

        <h2>Summary</h2>
        <p>
          Quickmarks stores your imported bookmarks only on your device. We do not operate
          accounts, servers, or analytics for bookmark data in version 1.
        </p>

        <h2>Data we collect</h2>
        <p>
          <strong>None.</strong> When you import a bookmarks export file, it is parsed and saved
          locally in your browser or the Android app using on-device storage. Bookmark contents
          are not transmitted to our servers.
        </p>

        <h2>Third-party services</h2>
        <p>
          The app may request favicon images from Google&apos;s favicon service when displaying
          your bookmark list. Only the site hostname is sent to fetch a small icon.
        </p>
        <p>
          When you tap a bookmark, the URL opens in your system default browser. That browser
          has its own privacy policy.
        </p>

        <h2>Data retention and deletion</h2>
        <p>
          Imported bookmarks remain until you tap <strong>Clear data</strong> in the app or
          uninstall the app / clear site data in your browser.
        </p>

        <h2>Children</h2>
        <p>Quickmarks is not directed at children under 13.</p>

        <h2>Contact</h2>
        <p>
          Questions: <a href="mailto:hello@uft1.com">hello@uft1.com</a>
        </p>
      </main>

      <footer className="site-footer">
        <Link to="/">Home</Link>
        <span>quickmarks.uft1.com</span>
      </footer>
    </div>
  )
}
