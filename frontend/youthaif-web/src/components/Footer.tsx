import { useState } from 'react'
import { subscribeNewsletter } from '../api/client'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [newsletterType, setNewsletterType] = useState('NAM Mindfulness')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const result = await subscribeNewsletter({ email, newsletterType })
      setStatus('success')
      setMessage(result.message)
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Subscription failed')
    }
  }

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
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <select value={newsletterType} onChange={e => setNewsletterType(e.target.value)}>
                <option value="NAM Mindfulness">NAM Mindfulness</option>
                <option value="Journey of Starting a Company">Journey of Starting a Company</option>
              </select>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && <p className="form-success">{message}</p>}
            {status === 'error' && <p className="form-error">{message}</p>}
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
