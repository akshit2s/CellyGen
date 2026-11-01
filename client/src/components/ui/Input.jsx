import { forwardRef } from 'react'
import { Search } from 'lucide-react'

/**
 * Input component
 * type: 'text' | 'search' | 'email' | 'password' | 'date' | 'number'
 */
const Input = forwardRef(function Input({
  label,
  type = 'text',
  error,
  hint,
  prefix,
  className = '',
  ...props
}, ref) {
  const isSearch = type === 'search'

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-brand-muted mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {isSearch && (
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none"
          />
        )}
        {prefix && !isSearch && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted text-sm">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={type === 'search' ? 'text' : type}
          className={`
            input-base
            ${isSearch ? 'pl-10' : ''}
            ${prefix && !isSearch ? 'pl-7' : ''}
            ${error ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-brand-muted">{hint}</p>}
    </div>
  )
})

export default Input
