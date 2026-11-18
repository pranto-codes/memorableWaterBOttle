import { Suspense } from "react";
import "./App.css";
import Bottles from "./assets/components/Bottles/Bottles";

const bottlesPromise = fetch("/bottles.json").then((res) => {
  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  return res.json();
});

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">V</span>
          <span>
            Vessel<span className="logo-highlight">.</span>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
        </nav>

        <a href="#shopping-cart" className="nav-cart">
          <span>Bag</span>
          <span className="cart-arrow">↗</span>
        </a>
      </header>

      <main>
        {/* Hero */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="hero-label">
              <span className="hero-dot"></span>
              DESIGNED FOR EVERYDAY LIFE
            </span>

            <h1>
              Hydration,
              <br />
              <span>made beautiful.</span>
            </h1>

            <p>
              Thoughtfully designed water bottles for people who appreciate
              simplicity, quality, and a better way to stay hydrated.
            </p>

            <div className="hero-actions">
              <a href="#collection" className="shop-button">
                Explore collection <span>→</span>
              </a>

              <span className="hero-note">
                Everyday essentials, reimagined.
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-bg"></div>
            <div className="hero-circle-text">
              STAY HYDRATED · LIVE BETTER ·{" "}
            </div>

            <img
              src="/images/hero-bottle.png"
              alt="Premium reusable water bottle"
              className="hero-bottle"
            />

            <div className="hero-floating">
              <span className="floating-check">✓</span>
              <div>
                <strong>Made to last</strong>
                <span>Everyday quality</span>
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <span>01 — EVERYDAY HYDRATION</span>
            <span>FUNCTION MEETS DESIGN</span>
          </div>
        </section>

        {/* Products */}
        <Suspense
          fallback={
            <div className="loading-state">
              <div className="loader"></div>
              <p>Preparing your collection...</p>
            </div>
          }
        >
          <Bottles bottlesPromise={bottlesPromise} />
        </Suspense>

        {/* About */}
        <section className="about-section" id="about">
          <div className="about-symbol">V.</div>
          <div>
            <span className="section-eyebrow">A BETTER EVERYDAY</span>
            <h2>Simple choices. Lasting impact.</h2>
            <p>
              We believe everyday essentials should be thoughtfully designed.
              Find a bottle that fits your lifestyle and make staying hydrated a
              habit worth keeping.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#" className="logo footer-logo">
          <span className="logo-icon">V</span>
          <span>
            Vessel<span className="logo-highlight">.</span>
          </span>
        </a>

        <p>Designed for everyday hydration.</p>

        <span>© 2026 Vessel. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App;
