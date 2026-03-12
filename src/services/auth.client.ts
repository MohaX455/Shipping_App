import { RegisterUserInput } from "@/types/auth"

// helper for parsing JSON response and throwing on HTTP error
async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json()
  if (!res.ok) {
    // assume API returns { message: string }
    const message = (data && data.message) || res.statusText || 'Request failed'
    throw new Error(message)
  }
  return data
}

export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ email, password })
  })

  return parseResponse<any>(res)
}

export async function signup(data: RegisterUserInput) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  })

  return parseResponse<any>(res)
}

export async function getCurrentUser() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include"
  })

  return parseResponse<any>(res)
}

export async function logout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include"
  })

  if (!res.ok) {
    throw new Error('Logout failed')
  }
}

export async function requestPasswordReset(email: string) {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ email })
  })

  return parseResponse<any>(res)
}