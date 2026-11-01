import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Plus, ChevronRight, CalendarDays, DollarSign, RotateCcw } from 'lucide-react'
import { AI_SUGGESTED_PROMPTS, MY_EVENTS } from '../data/mockData'

const WELCOME_MESSAGES = [
  "Hello! I'm CellyGen AI, your personal event planning assistant. ✨",
  "I can help you plan your perfect celebration — from budgets to vendor recommendations, timelines to décor ideas.",
  "What celebration are we planning today?",
]

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bubble-ai flex items-center gap-1.5 py-3">
        <span className="w-2 h-2 rounded-full bg-brand-muted animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-brand-muted animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-brand-muted animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

function RecommendationCard({ title, description, tag }) {
  return (
    <div className="card p-3.5 flex items-start gap-3 hover:border-brand-primary/30 transition-colors cursor-pointer">
      <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center flex-shrink-0">
        <Sparkles size={14} className="text-brand-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-brand-text">{title}</p>
        <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed">{description}</p>
      </div>
      <span className="badge-violet text-[10px] flex-shrink-0">{tag}</span>
    </div>
  )
}

export default function AIPlanner() {
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(MY_EVENTS[0])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const startConversation = (prompt) => {
    setStarted(true)
    // Add initial AI welcome messages
    const welcomeMsgs = WELCOME_MESSAGES.map((text, i) => ({
      id: `w${i}`,
      role: 'ai',
      text,
    }))
    setMessages(welcomeMsgs)
    // Then send the user's prompt
    setTimeout(() => sendMessage(prompt, welcomeMsgs), 300)
  }

  const sendMessage = (text, existingMessages) => {
    if (!text.trim()) return
    const currentMessages = existingMessages || messages
    const userMsg = { id: `u${Date.now()}`, role: 'user', text: text.trim() }
    setMessages([...currentMessages, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateMockResponse(text, selectedEvent)
      setIsTyping(false)
      setMessages(prev => [...prev, { id: `a${Date.now()}`, role: 'ai', text: aiResponse }])
    }, 1500 + Math.random() * 800)
  }

  const generateMockResponse = (prompt, event) => {
    const p = prompt.toLowerCase()
    if (p.includes('budget') || p.includes('cost') || p.includes('money')) {
      return `For ${event?.title || 'your event'}, I recommend allocating your budget as follows:\n\n• **Venue**: 30–40% ($${Math.round((event?.budget.total || 5000) * 0.35).toLocaleString()})\n• **Catering**: 25–35% per person\n• **Photography**: 10–15%\n• **Flowers & Décor**: 8–12%\n• **Music**: 5–8%\n• **Buffer (contingency)**: 5–10%\n\nWould you like vendor recommendations for any of these categories?`
    }
    if (p.includes('vendor') || p.includes('photographer') || p.includes('caterer')) {
      return `Based on your event profile, I'd recommend checking out these vendors on CellyGen:\n\n🎥 **Luminary Studios** — Top-rated photography, $2,500+\n🌸 **Bloom & Gather** — Bespoke florals, from $800\n🍽️ **Mesa Catering Co.** — Farm-to-table, $45/person\n\nAll are verified professionals with 4.7+ ratings. Want to view their full profiles or message any of them?`
    }
    if (p.includes('timeline') || p.includes('checklist') || p.includes('plan')) {
      return `Here's a suggested planning timeline for ${event?.title || 'your event'}:\n\n**6+ months before**: Venue, photographer, caterer\n**4–5 months**: Send save-the-dates, finalize guest list\n**3 months**: Book remaining vendors, design invitations\n**6 weeks**: Final headcount, venue walkthrough\n**2 weeks**: Confirm all vendors, prepare payments\n**Day before**: Final setup check & rehearsal\n\nShall I create this as a checklist in your My Events dashboard?`
    }
    return `Great question about "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"! \n\nAs your AI event planner, I can help you explore vendor options, draft timelines, manage budgets, and brainstorm themes tailored to ${event?.title || 'your celebration'}.\n\nCould you tell me a bit more about your vision — the vibe, guest count, or any specific requirements? I'll give you a personalized recommendation.`
  }

  const handleSend = () => {
    if (!started) {
      startConversation(inputText)
    } else {
      sendMessage(inputText)
    }
  }

  const resetChat = () => {
    setStarted(false)
    setMessages([])
    setInputText('')
  }

  return (
    <div className="flex h-screen">
      {/* ── Main Chat Area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center glow-violet">
              <Sparkles size={17} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-brand-text text-sm">CellyGen AI</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                <span className="text-[11px] text-brand-muted">Online · Event Planning Assistant</span>
              </div>
            </div>
          </div>
          {started && (
            <button onClick={resetChat} className="btn-ghost text-xs">
              <RotateCcw size={13} />
              New Chat
            </button>
          )}
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto">
          {!started ? (
            /* ── Welcome Screen ── */
            <div className="flex flex-col items-center justify-center min-h-full px-6 py-12 text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-brand flex items-center justify-center
                              mb-6 glow-violet">
                <Sparkles size={36} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-text mb-2">
                Your AI Event Planner
              </h2>
              <p className="text-brand-muted text-sm max-w-md leading-relaxed mb-10">
                Get personalized vendor recommendations, budget breakdowns, timelines,
                and creative ideas for any celebration — powered by AI.
              </p>

              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {AI_SUGGESTED_PROMPTS.map(prompt => (
                  <button
                    key={prompt.id}
                    onClick={() => startConversation(prompt.text)}
                    className="card-interactive text-left px-4 py-3.5 flex items-center gap-3"
                  >
                    <span className="w-8 h-8 rounded-md bg-[#e8f0e6] text-[#587054] flex items-center justify-center flex-shrink-0">
                      <Sparkles size={15} />
                    </span>
                    <span className="text-sm text-brand-text font-medium">{prompt.text}</span>
                    <ChevronRight size={14} className="text-brand-muted ml-auto flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Message Thread ── */
            <div className="px-5 py-5 space-y-1">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center
                                    flex-shrink-0 mr-2 mt-1">
                      <Sparkles size={12} className="text-white" />
                    </div>
                  )}
                  <div className={msg.role === 'user' ? 'bubble-user max-w-sm' : 'bubble-ai max-w-md'}>
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-brand-border px-4 py-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about vendors, budgets, timelines, themes..."
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
          <p className="text-center text-[10px] text-brand-muted/60 mt-2">
            AI responses are illustrative. Vendor bookings require human confirmation.
          </p>
        </div>
      </div>

      {/* ── Context Sidebar ── */}
      <div className="w-64 flex-shrink-0 border-l border-brand-border flex flex-col hidden xl:flex">
        <div className="px-4 py-4 border-b border-brand-border">
          <h3 className="text-sm font-semibold text-brand-text">Event Context</h3>
          <p className="text-xs text-brand-muted mt-0.5">AI is planning for:</p>
        </div>

        {/* Event selector */}
        <div className="p-4 space-y-2">
          {MY_EVENTS.map(event => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-150
                ${selectedEvent?.id === event.id
                  ? 'border-brand-primary/40 bg-brand-primary/10'
                  : 'border-brand-border hover:border-brand-primary/20 hover:bg-white/3'
                }`}
            >
              <p className="text-xs font-semibold text-brand-text truncate">{event.title}</p>
              <div className="flex items-center gap-1.5 mt-1 text-brand-muted">
                <CalendarDays size={10} />
                <span className="text-[10px]">{event.daysUntil}d away</span>
              </div>
            </button>
          ))}
        </div>

        {selectedEvent && (
          <div className="px-4 space-y-3">
            <div className="divider" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-muted flex items-center gap-1"><DollarSign size={11} />Budget</span>
                <span className="font-semibold text-brand-text">${selectedEvent.budget.total.toLocaleString()}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill bg-brand-primary"
                  style={{ width: `${(selectedEvent.budget.spent / selectedEvent.budget.total) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-brand-muted">
                ${(selectedEvent.budget.total - selectedEvent.budget.spent).toLocaleString()} remaining
              </p>
            </div>

            <div className="divider" />
            <p className="text-xs font-semibold text-brand-text mb-2">AI Recommendations</p>
            <div className="space-y-2">
              <RecommendationCard
                title="Book photographer soon"
                description="Top photographers in your area book 6–8 months out"
                tag="Vendor"
              />
              <RecommendationCard
                title="Send invitations"
                description="6 weeks before event is the sweet spot for RSVPs"
                tag="Timeline"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
