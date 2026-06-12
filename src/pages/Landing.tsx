import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <div className="page landing-page">
      <header className="site-header">
        <Link to="/" className="brand">
          <img src="/icon.svg" alt="" width={28} height={28} />
          Quickmarks
        </Link>
        <nav>
          <Link to="/app" className="btn primary">
            Open app
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <p className="eyebrow">Chrome new tab won&apos;t show them. We will.</p>
        <h1>Your bookmarks, finally tappable again.</h1>
        <p className="lede">
          Export once from Chrome or Edge, import into Quickmarks, and open any link in your
          default browser. Everything stays on your device.
        </p>
        <div className="cta-row">
          <Link to="/app" className="btn primary lg">
            Import bookmarks
          </Link>
          <a
            className="btn ghost lg"
            href="https://play.google.com/store"
            rel="noopener noreferrer"
          >
            Android app (Play Store)
          </a>
        </div>

        <section className="how-to card">
          <h2>How to export</h2>
          <div className="how-grid">
            <article>
              <h3>Chrome</h3>
              <ol>
                <li>⋮ menu → Bookmarks → Bookmark manager</li>
                <li>⋮ (top right) → Export bookmarks</li>
                <li>Save the .html file and import it here</li>
              </ol>
            </article>
            <article>
              <h3>Edge</h3>
              <ol>
                <li>⋮ menu → Favorites</li>
                <li>••• → Export favorites</li>
                <li>Save the .html file and import it here</li>
              </ol>
            </article>
          </div>
          <p className="note">
            On Android: export on desktop (or transfer the file to your phone), then use
            Quickmarks to pick the .html from Downloads.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <Link to="/privacy">Privacy</Link>
        <span>quickmarks.uft1.com</span>
      </footer>
    </div>
  )
}
