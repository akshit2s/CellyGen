import { useState } from 'react'
import {
  MapPin, Calendar, Grid3X3, Bookmark, CalendarDays,
  Settings, Edit2, Users, FileText
} from 'lucide-react'
import { PROFILE_USER } from '../data/mockData'

const ASPECT_HEIGHTS = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
  square: 'aspect-square',
}

function PostGrid({ posts }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {posts.map(post => (
        <div key={post.id} className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300
                          flex items-end p-3 opacity-0 group-hover:opacity-100">
            <div>
              <p className="text-white text-xs font-semibold line-clamp-1">{post.title}</p>
              <p className="text-white/70 text-[10px] capitalize">{post.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="max-w-lg space-y-6">
      {[
        { section: 'Account', fields: [
          { label: 'Display Name', value: PROFILE_USER.displayName },
          { label: 'Username', value: PROFILE_USER.username },
          { label: 'Bio', value: PROFILE_USER.bio, multiline: true },
          { label: 'Location', value: PROFILE_USER.location },
        ]},
        { section: 'Notifications', fields: [
          { label: 'New vendor messages', toggle: true, value: true },
          { label: 'Event reminders', toggle: true, value: true },
          { label: 'AI planner suggestions', toggle: true, value: false },
        ]},
        { section: 'Payment Methods', fields: [
          { label: 'Saved cards', value: 'No cards saved' },
        ]},
      ].map(({ section, fields }) => (
        <div key={section}>
          <h3 className="text-sm font-semibold text-brand-text mb-3">{section}</h3>
          <div className="card divide-y divide-brand-border">
            {fields.map(f => (
              <div key={f.label} className="flex items-center justify-between px-4 py-3.5 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">{f.label}</p>
                  {!f.toggle && (
                    <p className="text-sm text-brand-text mt-0.5 line-clamp-2">{f.value}</p>
                  )}
                </div>
                {f.toggle ? (
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-200
                    ${f.value ? 'bg-brand-primary' : 'bg-brand-border'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
                      ${f.value ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                ) : (
                  <Edit2 size={13} className="text-brand-muted flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const TABS = [
  { id: 'posts',  label: 'My Posts',  icon: Grid3X3 },
  { id: 'saved',  label: 'Saved',     icon: Bookmark },
  { id: 'events', label: 'Events',    icon: CalendarDays },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts')
  const profile = PROFILE_USER

  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <img
          src={profile.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="px-6 relative">
        {/* Avatar — overlaps cover */}
        <div className="flex items-end justify-between -mt-14 mb-4">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-brand-bg"
            />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-brand-primary
                               flex items-center justify-center text-white">
              <Edit2 size={12} />
            </button>
          </div>
          <button className="btn-secondary">
            <Edit2 size={14} />
            Edit Profile
          </button>
        </div>

        {/* User info */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-brand-text">{profile.displayName}</h1>
          <p className="text-sm text-brand-muted">{profile.username}</p>
          <p className="text-sm text-brand-text/80 mt-2 leading-relaxed max-w-md">{profile.bio}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-brand-muted">
            <span className="flex items-center gap-1"><MapPin size={11} />{profile.location}</span>
            <span className="flex items-center gap-1"><Calendar size={11} />Member since {profile.memberSince}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-0 border border-brand-border rounded-xl overflow-hidden mb-6">
          {[
            { label: 'Posts',     value: profile.stats.posts },
            { label: 'Events',    value: profile.stats.events },
            { label: 'Followers', value: profile.stats.followers },
            { label: 'Following', value: profile.stats.following },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center py-4 ${i < 3 ? 'border-r border-brand-border' : ''}`}
            >
              <span className="text-lg font-bold text-brand-text">{stat.value.toLocaleString()}</span>
              <span className="text-xs text-brand-muted mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-brand-border mb-6">
          {TABS.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px
                           transition-all duration-150
                  ${activeTab === tab.id
                    ? 'text-brand-primary border-brand-primary'
                    : 'text-brand-muted border-transparent hover:text-brand-text'
                  }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="pb-10">
          {activeTab === 'posts'  && <PostGrid posts={profile.posts} />}
          {activeTab === 'saved'  && <PostGrid posts={profile.savedPosts} />}
          {activeTab === 'events' && (
            <div className="space-y-3 max-w-lg">
              {[
                { title: 'Our Wedding Day', date: 'Jun 14, 2025', status: 'Planning' },
                { title: "Mom's 60th Birthday", date: 'Feb 28, 2025', status: 'Planning' },
                { title: '5th Work Anniversary', date: 'Jan 18, 2025', status: 'Finalizing' },
              ].map(e => (
                <div key={e.title} className="card flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/15 flex items-center justify-center">
                    <CalendarDays size={16} className="text-brand-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-brand-text">{e.title}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{e.date}</p>
                  </div>
                  <span className="badge-violet text-[10px]">{e.status}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}
