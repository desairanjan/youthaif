const API_BASE = import.meta.env.VITE_API_URL || '/api'

export interface SevathonCheckIn {
  fullName: string
  email: string
  phone?: string
  organization?: string
  interests?: string
  wantsNewsletter: boolean
}

export interface NewsletterSubscribe {
  email: string
  fullName?: string
  newsletterType: string
}

export async function checkInVisitor(data: SevathonCheckIn) {
  const response = await fetch(`${API_BASE}/sevathon/check-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Check-in failed' }))
    throw new Error(error.message || 'Check-in failed')
  }

  return response.json()
}

export async function subscribeNewsletter(data: NewsletterSubscribe) {
  const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Subscription failed' }))
    throw new Error(error.message || 'Subscription failed')
  }

  return response.json()
}

export interface SevathonVisitor {
  id: number
  fullName: string
  email: string
  phone?: string
  organization?: string
  interests?: string
  wantsNewsletter: boolean
  checkedInAt: string
}

export interface SevathonStats {
  eventName: string
  eventDate: string
  totalVisitors: number
  newsletterSignups: number
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  }
}

async function parseError(response: Response, fallback: string) {
  const error = await response.json().catch(() => ({ message: fallback }))
  throw new Error(error.message || fallback)
}

export async function adminLogin(password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })

  if (response.status === 401) {
    throw new Error('Invalid password.')
  }
  if (!response.ok) {
    await parseError(response, 'Login failed')
  }

  return response.json() as Promise<{ token: string; expiresInMinutes: number }>
}

export async function getSevathonStats(token: string) {
  const response = await fetch(`${API_BASE}/sevathon/stats`, {
    headers: authHeaders(token),
  })
  if (response.status === 401) throw new Error('Unauthorized')
  if (!response.ok) throw new Error('Failed to load stats')
  return response.json() as Promise<SevathonStats>
}

export async function getSevathonVisitors(token: string) {
  const response = await fetch(`${API_BASE}/sevathon/visitors`, {
    headers: authHeaders(token),
  })
  if (response.status === 401) throw new Error('Unauthorized')
  if (!response.ok) throw new Error('Failed to load visitors')
  return response.json() as Promise<SevathonVisitor[]>
}
