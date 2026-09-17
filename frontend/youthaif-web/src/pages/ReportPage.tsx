import { useCallback, useEffect, useState } from 'react'
import {
  adminLogin,
  getSevathonStats,
  getSevathonVisitors,
  type SevathonVisitor,
  type SevathonStats,
} from '../api/client'
import { clearAdminToken, getAdminToken, setAdminToken } from '../auth/session'

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function ReportPage() {
  const [token, setToken] = useState<string | null>(() => getAdminToken())
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [visitors, setVisitors] = useState<SevathonVisitor[]>([])
  const [stats, setStats] = useState<SevathonStats | null>(null)
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadReport = useCallback(async (authToken: string) => {
    setLoading(true)
    setLoadError('')
    try {
      const [visitorList, statData] = await Promise.all([
        getSevathonVisitors(authToken),
        getSevathonStats(authToken),
      ])
      setVisitors(visitorList)
      setStats(statData)
    } catch (err) {
      if (err instanceof Error && err.message === 'Unauthorized') {
        clearAdminToken()
        setToken(null)
        setLoginError('Session expired. Please sign in again.')
      } else {
        setLoadError(err instanceof Error ? err.message : 'Failed to load report')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      loadReport(token)
    }
  }, [token, loadReport])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const result = await adminLogin(password)
      setAdminToken(result.token)
      setToken(result.token)
      setPassword('')
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoginLoading(false)
    }
  }

  function handleLogout() {
    clearAdminToken()
    setToken(null)
    setVisitors([])
    setStats(null)
  }

  function exportCsv() {
    const headers = ['Name', 'Email', 'Phone', 'Organization', 'Interests', 'Newsletter', 'Checked In']
    const rows = visitors.map(v => [
      v.fullName,
      v.email,
      v.phone ?? '',
      v.organization ?? '',
      v.interests ?? '',
      v.wantsNewsletter ? 'Yes' : 'No',
      formatDateTime(v.checkedInAt),
    ])
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sevathon-checkins-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!token) {
    return (
      <div className="report-page">
        <section className="section">
          <div className="container report-login-wrap">
            <div className="card report-login-card">
              <h1>Sevathon Report</h1>
              <p className="form-subtitle">Admin sign-in required to view check-ins.</p>
              <form onSubmit={handleLogin} className="checkin-form">
                <div className="form-group">
                  <label htmlFor="adminPassword">Password</label>
                  <input
                    id="adminPassword"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                {loginError && <p className="form-error">{loginError}</p>}
                <button type="submit" className="btn-primary" disabled={loginLoading}>
                  {loginLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="report-page">
      <section className="section">
        <div className="container">
          <div className="report-header">
            <div>
              <h1>Sevathon Check-In Report</h1>
              {stats && (
                <p className="report-meta">
                  {stats.eventName} · {stats.eventDate} ·{' '}
                  <strong>{stats.totalVisitors}</strong> visitors ·{' '}
                  <strong>{stats.newsletterSignups}</strong> newsletter opt-ins
                </p>
              )}
            </div>
            <div className="report-actions">
              <button type="button" className="btn-secondary" onClick={() => token && loadReport(token)} disabled={loading}>
                Refresh
              </button>
              <button type="button" className="btn-secondary" onClick={exportCsv} disabled={visitors.length === 0}>
                Export CSV
              </button>
              <button type="button" className="btn-outline" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          </div>

          {loadError && <p className="form-error">{loadError}</p>}
          {loading && <p className="report-loading">Loading check-ins...</p>}

          {!loading && visitors.length === 0 && !loadError && (
            <div className="card empty-report">
              <p>No check-ins yet. Visitors can register from the Sevathon tab.</p>
            </div>
          )}

          {visitors.length > 0 && (
            <div className="report-table-wrap card">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Organization</th>
                    <th>Interests</th>
                    <th>Newsletter</th>
                    <th>Checked In</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map(v => (
                    <tr key={v.id}>
                      <td>{v.fullName}</td>
                      <td><a href={`mailto:${v.email}`}>{v.email}</a></td>
                      <td>{v.phone ?? '—'}</td>
                      <td>{v.organization ?? '—'}</td>
                      <td>{v.interests ?? '—'}</td>
                      <td>{v.wantsNewsletter ? 'Yes' : 'No'}</td>
                      <td>{formatDateTime(v.checkedInAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
