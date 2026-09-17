import { useState } from 'react'
import { checkInVisitor } from '../api/client'

const INTEREST_OPTIONS = [
  'AI & Digital Skills',
  'Python Programming',
  'Leadership & Business',
  'Internships & Jobs',
  'Volunteering',
  'Community Hubs',
  'Other',
]

export default function SevathonPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    interests: [] as string[],
    wantsNewsletter: true,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function toggleInterest(interest: string) {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await checkInVisitor({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        organization: form.organization || undefined,
        interests: form.interests.join(', ') || undefined,
        wantsNewsletter: form.wantsNewsletter,
      })
      setStatus('success')
      setMessage('Welcome to the YouthAIF booth! Thank you for checking in.')
      setForm({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        interests: [],
        wantsNewsletter: true,
      })
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Check-in failed. Please try again.')
    }
  }

  return (
    <div className="sevathon">
      <section className="sevathon-hero">
        <div className="container">
          <span className="event-badge">September 20, 2026</span>
          <h1>Welcome to YouthAIF at Sevathon!</h1>
          <p className="sevathon-intro">
            Thank you for visiting our booth. Check in below to connect with us,
            learn about our programs, and join the #WorkLifeReady movement.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container sevathon-grid">
          <div className="card sevathon-info">
            <h2>At Our Booth Today</h2>
            <ul className="feature-list">
              <li>Learn about Youth-Led Skilling & AI programs</li>
              <li>Explore Community-Powered Hub opportunities</li>
              <li>Sign up for internships & volunteer roles</li>
              <li>Connect with NAM Mindfulness & founder insights</li>
              <li>Meet youth ambassadors & program leaders</li>
            </ul>

            <div className="quick-facts">
              <h3>Quick Facts</h3>
              <div className="fact">
                <strong>1.2 Billion</strong>
                <span>Young people we aim to empower</span>
              </div>
              <div className="fact">
                <strong>80-20</strong>
                <span>Self-sustaining scholarship model</span>
              </div>
              <div className="fact">
                <strong>Global</strong>
                <span>Opportunities in USA & worldwide</span>
              </div>
            </div>
          </div>

          <div className="card sevathon-form-card">
            <h2>Booth Check-In</h2>
            <p className="form-subtitle">Takes less than a minute</p>

            {status === 'success' ? (
              <div className="success-panel">
                <div className="success-icon">✓</div>
                <h3>You're Checked In!</h3>
                <p>{message}</p>
                <button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>
                  Check in another visitor
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="checkin-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organization">School / Company (optional)</label>
                  <input
                    id="organization"
                    type="text"
                    value={form.organization}
                    onChange={e => setForm({ ...form, organization: e.target.value })}
                    placeholder="Where are you from?"
                  />
                </div>

                <fieldset className="form-group">
                  <legend>What interests you?</legend>
                  <div className="interest-chips">
                    {INTEREST_OPTIONS.map(option => (
                      <button
                        key={option}
                        type="button"
                        className={`chip ${form.interests.includes(option) ? 'chip-active' : ''}`}
                        onClick={() => toggleInterest(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.wantsNewsletter}
                    onChange={e => setForm({ ...form, wantsNewsletter: e.target.checked })}
                  />
                  Keep me updated on YouthAIF programs & events
                </label>

                {status === 'error' && <p className="form-error">{message}</p>}

                <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Checking in...' : 'Check In'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
