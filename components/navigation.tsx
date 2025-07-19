"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { label: "Home", href: "/" },
  { label: "My Memories", href: "/my-memories" },
  { label: "Upload", href: "/upload" },
  { label: "How to Record", href: "/how-to-record" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-[#E4DCD0]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F0EBE5] rounded-xl flex items-center justify-center shadow-sm">
            <img src="/xperi3d-logo.png" alt="XPERI3D" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-semibold text-[#43382F] tracking-wide">XPERI3D</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-[#8B745F] hover:text-[#43382F] smooth-transition font-medium tracking-wide text-sm lg:text-base",
                pathname === item.href && "text-[#43382F]",
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#8B745F] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link href="/upload">
            <Button className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-4 lg:px-6 py-2 smooth-transition font-medium tracking-wide text-sm lg:text-base">
              Upload
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Link href="/upload">
            <Button className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-3 py-2 smooth-transition text-sm">
              Upload
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E4DCD0] shadow-lg">
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-[#8B745F] hover:text-[#43382F] hover:bg-[#F0EBE5] smooth-transition font-medium tracking-wide",
                  pathname === item.href && "text-[#43382F] bg-[#F0EBE5]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
