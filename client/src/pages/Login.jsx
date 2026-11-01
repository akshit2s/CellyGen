import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
          alt="Celebration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/80 via-black/50 to-black/70" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">CellyGen</span>
          </div>
          {/* Quote */}
          <div>
            <blockquote className="text-white text-2xl font-bold leading-snug mb-4">
              "Every celebration tells a story worth remembering."
            </blockquote>
            <p className="text-white/60 text-sm">— CellyGen Community</p>
          </div>
          {/* Feature dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="font-bold text-brand-text">CellyGen</span>
          </div>

          <h1 className="text-2xl font-extrabold text-brand-text mb-1">Welcome back</h1>
          <p className="text-brand-muted text-sm mb-8">
            Sign in to continue planning your celebrations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="input-base"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-brand-muted uppercase tracking-wide">
                  Password
                </label>
                <button type="button" className="text-xs text-brand-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="input-base pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-3.5 py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>

            {/* Divider */}
            <div className="section-divider">
              <span>or browse as guest</span>
            </div>

            {/* Guest CTA */}
            <Link
              to="/"
              className="btn-secondary w-full py-3 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Sparkles size={15} />
              Explore CellyGen
            </Link>
          </form>

          <p className="text-center text-sm text-brand-muted mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-primary hover:underline font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
