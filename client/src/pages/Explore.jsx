import { useMemo, useState } from 'react'
import { Heart, Bookmark, Search, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EXPLORE_POSTS, CATEGORIES } from '../data/mockData'

const HEIGHTS = ['h-72 sm:h-80', 'h-56 sm:h-64', 'h-80 sm:h-96', 'h-64 sm:h-72']

function PostCard({ post, index }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const toggleLike = (event) => {
    event.stopPropagation()
    setLiked(value => !value)
    setLikes(value => value + (liked ? -1 : 1))
  }
  return (
    <article className="masonry-item animate-fade-in">
      <div className="post-card group bg-white">
        <div className={`relative overflow-hidden ${HEIGHTS[index % HEIGHTS.length]}`}>
          <img src={post.image} alt={post.title} loading="lazy" className="post-card-img h-full" />
          <div className="post-card-overlay">
            <div className="flex justify-end">
              <button aria-label={saved ? 'Remove saved idea' : 'Save idea'} onClick={() => setSaved(value => !value)}
                className={`p-2.5 rounded-md transition-colors ${saved ? 'bg-white text-brand-text' : 'bg-black/35 text-white hover:bg-white hover:text-brand-text'}`}>
                <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div>
              <span className="inline-block capitalize text-[10px] tracking-wide text-white/85 mb-1.5">{post.category.replace('-', ' ')}</span>
              <h2 className="text-white text-base font-semibold leading-snug">{post.title}</h2>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <img src={post.creator.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-white/85 text-xs">{post.creator.name}</span>
                </div>
                <button onClick={toggleLike} aria-label={liked ? 'Unlike idea' : 'Like idea'} className="flex items-center gap-1.5 text-xs text-white/90">
                  <Heart size={14} fill={liked ? 'currentColor' : 'none'} className={liked ? 'text-[#ffb5a7]' : ''} />{likes}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 py-2.5 px-0.5">
          <div className="min-w-0">
            <h2 className="text-sm font-medium text-brand-text leading-snug">{post.title}</h2>
            <p className="text-xs text-brand-muted mt-1">by {post.creator.name}</p>
          </div>
          <button onClick={() => setSaved(value => !value)} aria-label={saved ? 'Remove saved idea' : 'Save idea'} className={`mt-0.5 ${saved ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-text'}`}>
            <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const filtered = useMemo(() => EXPLORE_POSTS.filter(post => {
    const categoryMatch = activeCategory === 'all' || post.category === activeCategory
    const query = searchQuery.toLowerCase()
    return categoryMatch && (!query || post.title.toLowerCase().includes(query) || post.category.toLowerCase().includes(query))
  }), [activeCategory, searchQuery])

  return (
    <div className="min-h-screen">
      <header className="px-5 sm:px-8 pt-9 pb-7 lg:pt-12 lg:pb-9">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="lg:hidden font-bold tracking-tight text-lg">CellyGen</Link>
            <span className="label-muted">A little inspiration goes a long way</span>
            <Link to="/vendors" className="hidden sm:flex items-center gap-1.5 text-sm font-medium hover:text-brand-primary">Meet the makers <ArrowUpRight size={15} /></Link>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <h1 className="text-[2.65rem] sm:text-6xl lg:text-[4.4rem] font-semibold tracking-[-.055em] leading-[.98] max-w-3xl">Make room for<br className="hidden sm:block" /> a little <span className="text-brand-primary">celebration.</span></h1>
              <p className="text-brand-muted text-base sm:text-lg max-w-xl mt-5 leading-relaxed">Thoughtful ideas for the moments that bring us together, gathered from our community.</p>
            </div>
            <label className="relative w-full lg:w-80">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search ideas, occasions..." className="input-base pl-11 py-3.5" />
            </label>
          </div>
        </div>
      </header>
      <div className="sticky top-0 z-30 bg-brand-bg/95 backdrop-blur border-y border-brand-border px-5 sm:px-8">
        <div className="max-w-[1500px] mx-auto flex gap-2 overflow-x-auto no-scrollbar py-3">
          {CATEGORIES.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`chip flex-shrink-0 ${activeCategory === category.id ? 'chip-active' : ''}`}>{category.label}</button>)}
        </div>
      </div>
      <main className="px-5 sm:px-8 py-7 sm:py-9">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-sm font-semibold">Ideas to save for later</h2>
            <span className="text-xs text-brand-muted">{filtered.length} moments</span>
          </div>
          {filtered.length ? <div className="masonry-grid">{filtered.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}</div> : (
            <div className="py-24 text-center"><Search size={22} className="mx-auto text-brand-muted mb-3" /><p className="font-semibold">No ideas found</p><p className="text-sm text-brand-muted mt-1">Try another search or occasion.</p></div>
          )}
        </div>
      </main>
    </div>
  )
}
