import { useState } from 'react'
import { Send, Star, MapPin, CheckCircle2, Clock, MessageSquare } from 'lucide-react'
import { CONVERSATIONS } from '../data/mockData'

function ConversationItem({ convo, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150
        ${isActive
          ? 'bg-brand-primary/10 border-r-2 border-brand-primary'
          : 'hover:bg-white/5 border-r-2 border-transparent'
        }`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={convo.vendor.avatar}
          alt={convo.vendor.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {convo.unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-primary
                           text-white text-[9px] font-bold flex items-center justify-center">
            {convo.unread}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-sm font-medium truncate ${isActive ? 'text-brand-text' : 'text-brand-muted'}`}>
            {convo.vendor.name}
          </span>
          <span className="text-[10px] text-brand-muted flex-shrink-0">{convo.timestamp}</span>
        </div>
        <p className="text-xs text-brand-muted truncate">{convo.lastMessage}</p>
        <p className="text-[10px] text-brand-primary/70 mt-0.5">For: {convo.event}</p>
      </div>
    </button>
  )
}

function MessageBubble({ msg }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      <div>
        <div className={isMe ? 'bubble-me' : 'bubble-other'}>{msg.text}</div>
        <p className={`text-[10px] text-brand-muted mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
          {msg.time}
        </p>
      </div>
    </div>
  )
}

export default function Chats() {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState(
    Object.fromEntries(CONVERSATIONS.map(c => [c.id, c.messages]))
  )

  const activeConvo = CONVERSATIONS.find(c => c.id === activeId)
  const activeMessages = messages[activeId] || []

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg = {
      id: `m${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }
    setMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }))
    setInputText('')
  }

  return (
    <div className="flex h-screen">
      {/* ── Conversation List ── */}
      <div className="w-72 flex-shrink-0 border-r border-brand-border flex flex-col">
        <div className="px-4 py-4 border-b border-brand-border">
          <h1 className="font-bold text-brand-text text-base">Messages</h1>
          <p className="text-xs text-brand-muted mt-0.5">{CONVERSATIONS.length} conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-brand-border/50">
          {CONVERSATIONS.map(c => (
            <ConversationItem
              key={c.id}
              convo={c}
              isActive={c.id === activeId}
              onClick={() => setActiveId(c.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Message Thread ── */}
      {activeConvo && (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Thread Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-border">
            <img
              src={activeConvo.vendor.avatar}
              alt={activeConvo.vendor.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-brand-text text-sm">{activeConvo.vendor.name}</h2>
                {activeConvo.status === 'booked' && (
                  <span className="badge-green text-[10px] py-0">Booked</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-brand-muted">
                <span>{activeConvo.vendor.specialty}</span>
                <span>·</span>
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span>{activeConvo.vendor.rating}</span>
              </div>
            </div>
            {/* Fee badge */}
            <div className="px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-right">
              <p className="text-[10px] text-brand-muted">Consultation</p>
              <p className="text-xs font-semibold text-brand-primary">{activeConvo.consultationFee}</p>
            </div>
          </div>

          {/* Booking info bar */}
          <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/5 border-b border-amber-500/15">
            <Clock size={13} className="text-amber-400 flex-shrink-0" />
            <p className="text-xs text-amber-300">
              You're discussing <strong className="text-amber-200">{activeConvo.event}</strong> with this vendor
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-1">
            {activeMessages.map(msg => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-brand-border px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={`Message ${activeConvo.vendor.name}...`}
                className="input-base flex-1"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="btn-primary w-10 h-10 p-0 flex items-center justify-center flex-shrink-0
                           disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
