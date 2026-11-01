import { useEffect, useCallback } from 'react'
import { X, CheckCircle2, XCircle, Info } from 'lucide-react'

// Toast container — render this once at app root level
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  )
}

function Toast({ type = 'info', message, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const config = {
    success: { cls: 'toast-success', Icon: CheckCircle2 },
    error:   { cls: 'toast-error',   Icon: XCircle },
    info:    { cls: 'toast-info',    Icon: Info },
  }

  const { cls, Icon } = config[type] || config.info

  return (
    <div className={cls}>
      <Icon size={16} className="flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  )
}

export default Toast
