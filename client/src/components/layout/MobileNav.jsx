import { NavLink } from 'react-router-dom'
import {
  Compass, Store, CalendarDays, MessageSquare,
  Sparkles, UserCircle2
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/',           icon: Compass,       label: 'Explore'    },
  { to: '/vendors',    icon: Store,         label: 'Vendors'    },
  { to: '/my-events',  icon: CalendarDays,  label: 'Events'     },
  { to: '/chats',      icon: MessageSquare, label: 'Chats'      },
  { to: '/ai-planner', icon: Sparkles,      label: 'AI'         },
  { to: '/profile',    icon: UserCircle2,   label: 'Profile'    },
]

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-border">
      <div className="flex items-center justify-around px-1 py-1.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-brand-text'
                  : 'text-brand-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-md transition-all duration-150 ${isActive ? 'text-brand-primary' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'text-brand-primary' : 'text-brand-muted'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
