import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('cg_token'))
  const [isLoading, setIsLoading] = useState(true)

  // Verify stored token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }
      try {
        const res = await api.get('/auth/me')
        setUser(res.data.user)
      } catch {
        // Token invalid or expired — clear it
        localStorage.removeItem('cg_token')
        setToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    verifyToken()
  }, [token])

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token: newToken, user: newUser } = res.data
    localStorage.setItem('cg_token', newToken)
    setToken(newToken)
    setUser(newUser)
    return newUser
  }, [])

  const signup = useCallback(async (displayName, email, password) => {
    const res = await api.post('/auth/register', { displayName, email, password })
    const { token: newToken, user: newUser } = res.data
    localStorage.setItem('cg_token', newToken)
    setToken(newToken)
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('cg_token')
    setToken(null)
    setUser(null)
  }, [])

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
