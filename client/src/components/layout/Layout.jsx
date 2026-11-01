import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import MobileNav from './MobileNav'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="app-shell">
      {/* Desktop Sidebar — fixed position handled inside Navbar */}
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Spacer div that matches sidebar width on desktop */}
      <div
        className="hidden lg:block flex-shrink-0 transition-all duration-200"
        style={{ width: collapsed ? '68px' : '238px' }}
      />

      {/* Main content area */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* Extra bottom padding on mobile for the bottom nav */}
        <div className="pb-20 lg:pb-0">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  )
}
