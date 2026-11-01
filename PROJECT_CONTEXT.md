# CellyGen — Project Context

> Internal development reference document  
> Updated: Phase 1 Complete

---

## Project Overview

**CellyGen** is a community-powered AI celebration and event planning platform.

**Tagline:** Your Celebration, Your Way.

**Competition:** PromptWars Challenge 5

**Vision:** Combine community inspiration (Pinterest-style), vendor discovery (Airbnb-style marketplace), event management, creator communication and AI-powered planning into a single polished consumer product.

---

## Phase 1 — Completed ✅

### What was built

#### Frontend (`client/`)
- ✅ React 18 + Vite project initialized
- ✅ Tailwind CSS with full custom design system (design tokens, color palette, typography)
- ✅ React Router v6 with public and protected routes
- ✅ AuthContext with JWT storage, login, signup, logout, token verification
- ✅ Axios service with JWT interceptor and 401 redirect
- ✅ Collapsible desktop sidebar navigation (240px / 64px collapsed)
- ✅ Mobile bottom tab navigation with active states
- ✅ App shell layout with sidebar spacer
- ✅ **Explore Page** — Pinterest masonry grid, search, category filters, like/save interactions, hover overlays
- ✅ **Vendors Page** — Featured vendor section, category tabs, search, vendor cards with ratings
- ✅ **My Events Page** — Event dashboard with budget bars, checklist progress, deadline alerts, stats
- ✅ **Chats Page** — Two-column messaging interface, conversation list, message thread, live send
- ✅ **AI Planner Page** — Welcome screen, suggested prompts, mock AI conversation, context sidebar
- ✅ **Profile Page** — Cover photo, avatar, stats grid, tabbed posts/saved/events/settings
- ✅ **Login Page** — Split layout, form with validation, guest browsing link
- ✅ **Signup Page** — Split layout, feature list, full form with validation
- ✅ UI Component library: Button, Input, Badge, Avatar, Card, LoadingSpinner, EmptyState, Toast, Modal, ProtectedRoute
- ✅ Rich mock data for all pages (Unsplash images, realistic content)
- ✅ Global CSS with masonry grid, animation keyframes, component classes

#### Backend (`server/`)
- ✅ Express.js server with CORS, JSON parsing, error handling
- ✅ MongoDB Atlas connection with graceful error fallback
- ✅ User model (Mongoose) with bcrypt password hashing
- ✅ JWT authentication middleware
- ✅ Auth routes: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- ✅ Input validation with express-validator
- ✅ GET /api/health endpoint
- ✅ .env.example with all required variables

#### Documentation
- ✅ README.md with quick start guide
- ✅ PROJECT_CONTEXT.md (this file)

---

## Architecture Decisions

### Authentication
- JWT stored in `localStorage` for Phase 1 simplicity
- Token auto-attached via Axios request interceptor
- 401 responses trigger automatic logout and redirect
- Phase 2: Upgrade to httpOnly cookies for XSS protection

### Frontend
- `mockData.js` provides rich content for all pages — no empty states in Phase 1
- All API calls centralized in `src/services/api.js`
- No TypeScript — pure JavaScript ES6+
- Masonry grid uses native CSS `columns` (no external library)
- Animations are CSS-based with selective Framer Motion in Phase 2

### Backend
- Server continues running without MongoDB in development (graceful degradation)
- All routes prefixed with `/api`
- Vite proxy routes `/api/*` → `localhost:5000` in development

---

## Design System Summary

| Token | Value | Usage |
|---|---|---|
| Background | `#F7F6F2` | Warm app canvas |
| Primary text | `#191919` | Headings and body copy |
| Secondary text | `#77746F` | Supporting labels |
| Surface | `#FFFFFF` | Cards, inputs and navigation |
| Border | `#E8E5DF` | Dividers and control outlines |
| Accent | `#D95D45` | Primary actions and active details |
| Secondary accent | `#D9E5D6` | Quiet supporting highlights |
| Font | DM Sans, Inter fallback | App typography |

The visual direction is editorial minimalism: photography-led discovery, expressive but restrained typography, warm neutral surfaces, asymmetric masonry, and minimal elevation. The global shell keeps the six existing destinations and preserves desktop collapse, mobile navigation, and auth actions. Explore uses the existing mock posts and retains category filtering, search, likes, and saves.

### Design refresh — November 2026
- Replaced the dark violet/glow theme with the warm editorial token set.
- Refined desktop and mobile navigation without changing routes or access rules.
- Rebuilt Explore's hierarchy and masonry presentation around community photography.
- Applied the shared tokens and component styling across the existing Vendors, My Events, Chats, AI Planner, Profile, and auth pages.
- No backend, authentication, routing, or dependency changes.

---

## File Structure

```
client/src/
├── main.jsx              Entry point
├── App.jsx               Route definitions
├── index.css             Design system + global styles
├── context/
│   └── AuthContext.jsx   User state + auth actions
├── services/
│   └── api.js            Axios instance
├── hooks/
│   └── useAuth.js        Auth hook
├── data/
│   └── mockData.js       Mock content for all pages
├── components/
│   ├── layout/
│   │   ├── Layout.jsx    App shell
│   │   ├── Navbar.jsx    Desktop sidebar
│   │   └── MobileNav.jsx Mobile bottom nav
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Badge.jsx
│       ├── Avatar.jsx
│       ├── Card.jsx
│       ├── LoadingSpinner.jsx
│       ├── EmptyState.jsx
│       ├── Toast.jsx
│       ├── Modal.jsx
│       └── ProtectedRoute.jsx
└── pages/
    ├── Explore.jsx
    ├── Vendors.jsx
    ├── MyEvents.jsx
    ├── Chats.jsx
    ├── AIPlanner.jsx
    ├── Profile.jsx
    ├── Login.jsx
    └── Signup.jsx

server/src/
├── index.js              Express entry point
├── config/
│   └── db.js             MongoDB connection
├── middleware/
│   └── auth.js           JWT verification
├── models/
│   └── User.js           User schema
└── routes/
    └── auth.js           Auth endpoints
```

---

## Phase 2 Roadmap (Not Yet Started)

- [ ] Gemini API integration for AI Planner
- [ ] Real event CRUD (create, edit, delete)
- [ ] Vendor contact/booking flow
- [ ] Image upload (profile, event covers)
- [ ] Real-time messaging with Socket.io
- [ ] Invitation Studio with templates
- [ ] Payment integration
- [ ] Email notifications
- [ ] httpOnly cookie auth upgrade
- [ ] Search & filter backend APIs

---

## Environment Variables

### Client (`client/.env`)
```
VITE_API_BASE_URL=http://localhost:5000
```

### Server (`server/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
