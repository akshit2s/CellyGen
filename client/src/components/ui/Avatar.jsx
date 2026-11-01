export default function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-28 h-28 text-2xl',
  }

  const initials = name
    ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=7C3AED&color=fff&size=128`

  return (
    <img
      src={src || fallbackSrc}
      alt={name || 'User'}
      className={`avatar ${sizes[size]} ${className}`}
      onError={(e) => { e.target.src = fallbackSrc }}
    />
  )
}
