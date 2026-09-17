export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Stay Connected</h3>
            <p className="footer-tagline script">Creating Opportunities. Building Futures.</p>
          </div>

          <div className="footer-section">
            <h4>Newsletters</h4>
            <ul className="newsletter-list">
              <li><strong>NAM Mindfulness</strong> – Ancient wisdom for modern life</li>
              <li><strong>Journey of Starting a Company</strong> – Founder insights</li>
            </ul>

            <div className="newsletter-block">
              <p className="newsletter-block-label">NAM Mindfulness</p>
              <a
                className="yt-subscribe-button"
                href="https://www.youtube.com/channel/UCrFGEVcXojxjOj_oIJnsGfw?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe on YouTube
              </a>
            </div>

            <div className="newsletter-block">
              <p className="newsletter-block-label">Journey of Starting a Company</p>
              <a
                className="libutton"
                href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7274560368004251648"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe on LinkedIn
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="contact-list">
              <li>
                <a href="https://www.linkedin.com/in/desairanjan" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@nam-mindfulness" target="_blank" rel="noopener noreferrer">
                  YouTube: @nam-mindfulness
                </a>
              </li>
              <li>
                <a href="https://wa.me/14084833082" target="_blank" rel="noopener noreferrer">
                  WhatsApp: +1 (408) 483-3082
                </a>
              </li>
              <li>
                <a href="mailto:ranjan@hubhaya.com">ranjan@hubhaya.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Community-Powered Hubs That Create Opportunity, Not Dependency and Not just Training</p>
          <p><a href="https://www.youthaif.org">www.YouthAIF.org</a></p>
        </div>
      </div>
    </footer>
  )
}
