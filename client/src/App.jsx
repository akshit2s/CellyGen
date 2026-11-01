import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ui/ProtectedRoute'

import Explore from './pages/Explore'
import Vendors from './pages/Vendors'
import MyEvents from './pages/MyEvents'
import Chats from './pages/Chats'
import AIPlanner from './pages/AIPlanner'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <Routes>
      {/* Auth pages — no layout wrapper */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* App shell with sidebar nav */}
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Explore />} />
        <Route path="/vendors" element={<Vendors />} />

        {/* Protected routes */}
        <Route path="/my-events" element={
          <ProtectedRoute><MyEvents /></ProtectedRoute>
        } />
        <Route path="/chats" element={
          <ProtectedRoute><Chats /></ProtectedRoute>
        } />
        <Route path="/ai-planner" element={
          <ProtectedRoute><AIPlanner /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
