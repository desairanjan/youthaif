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

export async function getSevathonStats() {
  const response = await fetch(`${API_BASE}/sevathon/stats`)
  if (!response.ok) throw new Error('Failed to load stats')
  return response.json()
}
