# CellyGen — Your Celebration, Your Way

**A community-powered AI celebration and event planning platform**  
PromptWars Challenge 5

---

## What is CellyGen?

CellyGen combines social inspiration, vendor discovery, event management and AI-powered event planning into one polished consumer platform. Think Pinterest meets Airbnb for celebrations.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js, MongoDB Atlas, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| AI (Phase 2) | Gemini API |

## Project Structure

```
CellyGen/
├── client/          # React + Vite frontend
└── server/          # Express + MongoDB backend
```

## Quick Start

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (or local MongoDB)

### 1. Frontend

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

### 2. Backend

```bash
cd server
npm install
# Copy and configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
# → http://localhost:5000
```

### 3. Verify

Open http://localhost:5173 — the full app loads.  
Visit http://localhost:5000/api/health — should return `{ "status": "ok" }`.

## Design System

CellyGen uses an editorial, photography-led interface with a warm neutral canvas and restrained terracotta accent.

| Token | Value |
|---|---|
| Background | `#F7F6F2` |
| Primary text | `#191919` |
| Secondary text | `#77746F` |
| Surface | `#FFFFFF` |
| Border | `#E8E5DF` |
| Accent | `#D95D45` |
| Secondary accent | `#D9E5D6` |
| Font | DM Sans with Inter fallback |

## Navigation

| Page | Route | Auth Required |
|---|---|---|
| Explore | `/` | No |
| Vendors | `/vendors` | No |
| My Events | `/my-events` | ✅ |
| Chats | `/chats` | ✅ |
| AI Planner | `/ai-planner` | ✅ |
| Profile | `/profile` | ✅ |

## Status

Phase 1 — Complete ✅

See `PROJECT_CONTEXT.md` for detailed progress tracking.
