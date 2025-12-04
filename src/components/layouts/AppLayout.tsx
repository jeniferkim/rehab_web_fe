import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

export const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex-shrink-0">
          <Header />
        </div>

        {/* Body 영역: Sidebar + Main */}
        <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <Outlet />
            </main>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}
