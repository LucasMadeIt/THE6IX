"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, FolderOpen, Upload } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/my-memories", label: "My Memories", icon: FolderOpen },
    { href: "/upload", label: "Upload", icon: Upload },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E4DCD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8B745F] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">ML</span>
            </div>
            <span className="font-serif text-xl sm:text-2xl font-semibold text-[#43382F] tracking-wide">
              Memory Lane
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-[#6B5B4F] hover:text-[#8B745F] transition-colors duration-200 font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="w-5 h-5 text-[#8B745F]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-[#E4DCD0] w-64">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 pb-6 border-b border-[#E4DCD0]">
                  <div className="w-10 h-10 bg-[#8B745F] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">ML</span>
                  </div>
                  <span className="font-serif text-xl font-semibold text-[#43382F] tracking-wide">Memory Lane</span>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-[#6B5B4F] hover:text-[#8B745F] transition-colors duration-200 font-medium py-2"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
