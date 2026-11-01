import LoadingSpinner from './LoadingSpinner'

/**
 * Button component
 * variant: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'icon'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    destructive: 'btn-destructive',
    icon: 'btn-icon',
  }

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: '',
    lg: 'text-base px-6 py-3',
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${variantClasses[variant]}
        ${size !== 'md' ? sizeClasses[size] : ''}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? <LoadingSpinner size="sm" /> : children}
    </button>
  )
}
