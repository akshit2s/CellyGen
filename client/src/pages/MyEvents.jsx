import { useState } from 'react'
import {
  Plus, CalendarDays, Users, MapPin, Clock,
  CheckSquare, AlertCircle, ChevronRight, Sparkles
} from 'lucide-react'
import { MY_EVENTS } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

function BudgetBar({ spent, total }) {
  const pct = Math.min((spent / total) * 100, 100)
  const color = pct > 85 ? 'bg-rose-500' : pct > 60 ? 'bg-amber-500' : 'bg-emerald-500'

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-brand-muted">Budget used</span>
        <span className="font-medium text-brand-text">
          ${spent.toLocaleString()} <span className="text-brand-muted">/ ${total.toLocaleString()}</span>
        </span>
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function EventCard({ event }) {
  const checklistPct = Math.round((event.checklist.done / event.checklist.total) * 100)
  return (
    <div className="card-interactive group">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Date badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                        bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
          <CalendarDays size={12} />
          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Days until badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-brand-primary/90
                        backdrop-blur-sm text-white text-xs font-bold">
          {event.daysUntil}d away
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-brand-text text-base leading-snug">{event.title}</h3>
            <ChevronRight size={16} className="text-brand-muted mt-0.5 flex-shrink-0" />
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-brand-muted">
            <span className="flex items-center gap-1"><Users size={11} /> {event.guestCount} guests</span>
            <span className="flex items-center gap-1"><MapPin size={11} /> {event.venue.split(',')[0]}</span>
          </div>
        </div>

        {/* Budget Bar */}
        <BudgetBar spent={event.budget.spent} total={event.budget.total} />

        {/* Checklist */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-brand-muted">
            <CheckSquare size={13} className="text-brand-primary" />
            <span>{event.checklist.done}/{event.checklist.total} tasks done</span>
          </div>
          <span className="text-brand-primary font-medium">{checklistPct}%</span>
        </div>

        {/* Upcoming Deadline */}
        {event.upcomingDeadline && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertCircle size={13} className="text-amber-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-amber-300 font-medium block truncate">
                {event.upcomingDeadline.task}
              </span>
              <span className="text-[10px] text-amber-500">{event.upcomingDeadline.dueIn}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MyEvents() {
  const { user } = useAuth()

  const totalBudget = MY_EVENTS.reduce((a, e) => a + e.budget.total, 0)
  const totalSpent  = MY_EVENTS.reduce((a, e) => a + e.budget.spent, 0)
  const nextEvent   = MY_EVENTS.reduce((a, b) => a.daysUntil < b.daysUntil ? a : b)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-brand-border px-6 py-8 lg:py-10">
        <div className="flex items-start justify-between">
          <div>
            <span className="label-muted block mb-2">My Events</span>
            <h1 className="page-title">Your Celebrations</h1>
            <p className="page-subtitle mt-1">
              {MY_EVENTS.length} active event{MY_EVENTS.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button className="btn-primary">
            <Plus size={16} />
            New Event
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { label: 'Active Events', value: MY_EVENTS.length, icon: CalendarDays },
            { label: 'Next Event', value: `${nextEvent.daysUntil} days`, icon: Clock },
            { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: null },
          ].map(stat => (
            <div key={stat.label} className="card px-4 py-3">
              <p className="text-xs text-brand-muted mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-brand-text">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Events Grid */}
        <section>
          <h2 className="section-title mb-5">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {MY_EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}

            {/* Add new event CTA card */}
            <div className="card border-dashed border-brand-border flex flex-col items-center justify-center
                            py-12 cursor-pointer hover:border-brand-primary/50 hover:bg-brand-primary/5
                            transition-all duration-200 group">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20
                              flex items-center justify-center mb-3 group-hover:bg-brand-primary/20 transition-all">
                <Plus size={22} className="text-brand-primary" />
              </div>
              <p className="font-semibold text-brand-text text-sm">Plan New Event</p>
              <p className="text-xs text-brand-muted mt-1">Start planning your next celebration</p>
            </div>
          </div>
        </section>

        {/* Invitation Studio Entry Point */}
        <section>
          <div className="card-featured rounded-2xl p-6 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-brand-primary" />
                <span className="text-xs font-semibold text-brand-primary uppercase tracking-wide">Invitation Studio</span>
              </div>
              <h3 className="text-lg font-bold text-brand-text mb-1">Design Beautiful Invitations</h3>
              <p className="text-sm text-brand-muted max-w-sm">
                Create and send stunning digital invitations directly from CellyGen. 
                Track RSVPs in real time.
              </p>
            </div>
            <button className="btn-primary flex-shrink-0">
              Open Studio
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
