import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  'Discover stunning event inspiration',
  'Connect with verified vendors',
  'AI-powered event planning',
  'Manage your events & budget',
]

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ displayName: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const validate = () => {
    if (!form.displayName.trim()) return 'Please enter your name.'
    if (!form.email) return 'Please enter your email.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email.'
    if (form.password.length < 8) return 'Password must be at least 8 characters.'
    if (form.password !== form.confirmPassword) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setIsLoading(true)
    setError('')
    try {
      await signup(form.displayName, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80"
          alt="Celebration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/70 via-brand-primary/60 to-black/70" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">CellyGen</span>
          </div>
          <div>
            <h2 className="text-white text-2xl font-extrabold mb-6 leading-snug">
              Join thousands planning<br />
              <span className="text-white/80">unforgettable moments</span>
            </h2>
            <div className="space-y-3">
              {FEATURES.map(f => (
                <div key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div key={i} className={`h-1.5 rounded-full ${i === 1 ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
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

          <h1 className="text-2xl font-extrabold text-brand-text mb-1">Create your account</h1>
          <p className="text-brand-muted text-sm mb-8">
            Start planning celebrations that people remember.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                placeholder="Sophia Laurent"
                autoComplete="name"
                className="input-base"
              />
            </div>

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
              <label className="block text-xs font-medium text-brand-muted mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                autoComplete="new-password"
                className="input-base"
              />
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
              className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Creating account...' : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>

            <p className="text-xs text-brand-muted text-center">
              By signing up, you agree to our{' '}
              <span className="text-brand-primary cursor-pointer hover:underline">Terms</span>{' '}
              and{' '}
              <span className="text-brand-primary cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </form>

          <p className="text-center text-sm text-brand-muted mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
