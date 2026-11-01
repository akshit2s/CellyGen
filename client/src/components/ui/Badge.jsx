/**
 * Badge component
 * variant: 'violet' | 'rose' | 'green' | 'amber' | 'slate'
 */
export default function Badge({ children, variant = 'violet', className = '' }) {
  const classes = {
    violet: 'badge-violet',
    rose: 'badge-rose',
    green: 'badge-green',
    amber: 'badge-amber',
    slate: 'badge-slate',
  }

  return (
    <span className={`badge ${classes[variant]} ${className}`}>
      {children}
    </span>
  )
}
