export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20
                        flex items-center justify-center mb-5">
          <Icon size={28} className="text-brand-primary" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-brand-text mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-brand-muted max-w-sm leading-relaxed mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}
