import { useState } from 'react'
import { Star, MapPin, MessageSquare, Search, SlidersHorizontal, Award, Zap } from 'lucide-react'
import { VENDORS, VENDOR_CATEGORIES } from '../data/mockData'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={i <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-brand-border fill-brand-border'}
        />
      ))}
      <span className="text-xs text-brand-muted ml-1">{rating}</span>
    </div>
  )
}

function FeaturedVendorCard({ vendor }) {
  return (
    <div className="card-featured relative overflow-hidden rounded-2xl flex-shrink-0 w-72 lg:w-auto cursor-pointer group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {vendor.badge && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-primary text-white text-[10px] font-semibold">
              <Award size={10} />
              {vendor.badge}
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-brand-text text-sm">{vendor.name}</h3>
            <p className="text-brand-muted text-xs mt-0.5">{vendor.specialty}</p>
          </div>
          <img src={vendor.avatar} alt={vendor.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-brand-primary/30" />
        </div>
        <StarRating rating={vendor.rating} />
        <div className="flex items-center gap-1 mt-2 text-brand-muted">
          <MapPin size={11} />
          <span className="text-xs">{vendor.location}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-medium text-brand-text">{vendor.priceRange}</span>
          <button className="btn-primary text-xs px-3 py-1.5">
            <MessageSquare size={12} />
            Message
          </button>
        </div>
      </div>
    </div>
  )
}

function VendorCard({ vendor }) {
  return (
    <div className="card-interactive group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {vendor.badge && (
          <div className="absolute top-2.5 right-2.5">
            <span className="px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-sm">
              {vendor.badge}
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <img src={vendor.avatar} alt={vendor.name}
            className="w-6 h-6 rounded-full object-cover" />
          <h3 className="font-semibold text-brand-text text-sm truncate">{vendor.name}</h3>
        </div>
        <p className="text-brand-muted text-xs mb-2">{vendor.specialty}</p>
        <StarRating rating={vendor.rating} />
        <div className="flex items-center gap-3 mt-3 text-xs text-brand-muted">
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {vendor.location}
          </span>
        </div>
        <div className="divider my-3" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-text">{vendor.priceRange}</span>
          <button className="btn-secondary text-xs px-3 py-1.5">
            <MessageSquare size={12} />
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Vendors() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featured = VENDORS.filter(v => v.featured)
  const filtered = VENDORS.filter(v => {
    const matchesCat = activeCategory === 'all' || v.category === activeCategory
    const matchesSearch = !searchQuery ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative border-b border-brand-border px-6 py-10 lg:py-12 overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-brand-primary" />
            <span className="label-muted">Verified Professionals</span>
          </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-text mb-2">
            Find the Perfect <span className="text-gradient">Vendor</span>
          </h1>
          <p className="text-brand-muted text-sm max-w-lg">
            Browse our curated marketplace of top-rated photographers, caterers, 
            florists, venues and more for your next celebration.
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-6 max-w-xl flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search vendors, specialties..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-base pl-10"
            />
          </div>
          <button className="btn-secondary flex-shrink-0">
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Featured Vendors */}
        {(!searchQuery && activeCategory === 'all') && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="section-title">Featured Vendors</h2>
                <p className="text-xs text-brand-muted mt-0.5">Handpicked premium professionals</p>
              </div>
              <button className="btn-ghost text-xs">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map(v => (
                <FeaturedVendorCard key={v.id} vendor={v} />
              ))}
            </div>
          </section>
        )}

        {/* Category Tabs */}
        <section>
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
            {VENDOR_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`chip flex-shrink-0 ${activeCategory === cat.id ? 'chip-active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Vendor Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-brand-muted">No vendors found. Try a different filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(v => (
                <VendorCard key={v.id} vendor={v} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
