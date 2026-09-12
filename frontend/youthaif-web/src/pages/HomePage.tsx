export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              <span className="logo-youth">Youth</span>
              <span className="logo-aif">AIF</span>
            </h1>
            <p className="hero-subtitle">Youth Advancement Incubator Foundation</p>
            <p className="hero-tagline">
              A Public-Private-Youth Partnership for a <strong>#WorkLifeReady</strong> Generation
            </p>
            <div className="audience-pills">
              <span className="pill pill-green">Companies</span>
              <span className="pill pill-blue">Parents</span>
              <span className="pill pill-green">Youth Partnership</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card card-mission">
            <div className="card-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              Empowering <strong>1.2 billion</strong> young people (ages 10–25+) with skills,
              employment pathways, and entrepreneurship opportunities in{' '}
              <strong>green, digital, and AI-driven</strong> economies.
            </p>
            <blockquote>"Over 1 billion futures are on the line."</blockquote>
          </div>

          <div className="card card-why">
            <div className="card-icon">🚀</div>
            <h2>Why Now?</h2>
            <p>
              The largest generation in history is entering the workforce. AI is transforming
              every industry. The window to prepare youth is now.
            </p>
            <p className="highlight-chain">
              <strong>Real skills → Real jobs → Real futures</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">What We Do</h2>
          <div className="grid-2">
            <div className="card">
              <div className="card-icon">🎓</div>
              <h3>Youth-Led Skilling & Leadership</h3>
              <ul className="feature-list">
                <li>Learn Languages – Python, Sanskrit, Spanish</li>
                <li>AI courses, hackathons, digital creativity</li>
                <li>Leadership, business skills, social media presence</li>
                <li>Web creation, Vibe coding, digital tools</li>
                <li>Internships & job pathways for youth graduates</li>
              </ul>
            </div>

            <div className="card">
              <div className="card-icon">🤝</div>
              <h3>Community-Powered Hubs</h3>
              <ul className="feature-list">
                <li>Volunteers from schools, companies & neighborhoods</li>
                <li>Psycho-social support & humanitarian youth action</li>
                <li>Fundraising events & youth-led booths</li>
                <li>Self-sustaining hub model (80-20 scholarships)</li>
              </ul>
              <p className="card-note">
                🌍 Bringing global opportunities to youth in the USA and worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card card-scale">
            <div className="card-icon">🌐</div>
            <h2>Start Local → Scale Global</h2>
            <p>We launch with:</p>
            <div className="scale-items">
              <span>Neighborhood schools</span>
              <span>Local volunteers</span>
              <span>Youth ambassadors</span>
              <span>Community events</span>
            </div>
            <p>Building a model that can be replicated globally.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
