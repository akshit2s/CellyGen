import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Compass, Store, CalendarDays, MessageSquare,
  Sparkles, UserCircle2, ChevronLeft, ChevronRight,
  Plus, LogOut, LogIn
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { to: '/',           icon: Compass,       label: 'Explore',    public: true  },
  { to: '/vendors',    icon: Store,         label: 'Vendors',    public: true  },
  { to: '/my-events',  icon: CalendarDays,  label: 'My Events',  public: false },
  { to: '/chats',      icon: MessageSquare, label: 'Chats',      public: false },
  { to: '/ai-planner', icon: Sparkles,      label: 'AI Planner', public: false },
  { to: '/profile',    icon: UserCircle2,   label: 'Profile',    public: false },
]

export default function Navbar({ collapsed, setCollapsed }) {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside
      className={`sidebar hidden lg:flex flex-col transition-all duration-250 ${
        collapsed ? 'sidebar-collapsed' : ''
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-6 border-b border-brand-border ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        {!collapsed && (
          <span className="font-bold text-base text-brand-text tracking-tight">
            CellyGen
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''} ${collapsed ? 'justify-center mx-1' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="flex-shrink-0 nav-icon" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className={`border-t border-brand-border py-4 space-y-1 ${collapsed ? 'px-1' : 'px-2'}`}>
        {/* Create event button */}
        {!collapsed ? (
          <button
            onClick={() => navigate(isAuthenticated ? '/my-events' : '/login')}
            className="btn-primary w-full mb-3 text-xs"
          >
            <Plus size={15} />
            New Event
          </button>
        ) : (
          <button
            onClick={() => navigate(isAuthenticated ? '/my-events' : '/login')}
            className="btn-icon w-full justify-center mb-2"
            title="New Event"
          >
            <Plus size={18} />
          </button>
        )}

        {/* Auth actions */}
        {isAuthenticated ? (
          <div className={`flex items-center gap-2 ${collapsed ? 'flex-col' : ''}`}>
            {!collapsed && (
              <div className="flex items-center gap-2 flex-1 min-w-0 px-2 py-1.5 rounded-lg">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'U')}&background=7C3AED&color=fff&size=32`}
                  alt={user?.displayName}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                />
                <span className="text-xs text-brand-text font-medium truncate">
                  {user?.displayName}
                </span>
              </div>
            )}
            <button onClick={handleLogout} className="btn-icon" title="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className={collapsed ? 'btn-icon w-full justify-center' : 'btn-secondary w-full text-xs'}
            title={collapsed ? 'Sign in' : undefined}
          >
            <LogIn size={15} />
            {!collapsed && 'Sign In'}
          </button>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-brand-border
                   flex items-center justify-center text-brand-muted hover:text-brand-text
                   hover:bg-brand-primary/10 transition-all duration-150 z-50"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
