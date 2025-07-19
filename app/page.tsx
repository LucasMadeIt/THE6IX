"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Camera, Heart, Users, Sparkles, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

interface MemoryRoom {
  id: string
  title: string
  description: string
  thumbnail: string
  objectCount: number
  memories: number
  contributors: string[]
  lastVisited: string
  processing?: boolean
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [memoryRooms] = useState<MemoryRoom[]>([
    {
      id: "1",
      title: "Grandma's Kitchen",
      description: "Sunday morning pancakes and warm conversations",
      thumbnail: "/placeholder.svg?height=320&width=280",
      objectCount: 12,
      memories: 8,
      contributors: ["You", "Mom", "Sister"],
      lastVisited: "2 hours ago",
    },
    {
      id: "2",
      title: "Childhood Bedroom",
      description: "Where dreams began and stories were whispered",
      thumbnail: "/placeholder.svg?height=320&width=280",
      objectCount: 15,
      memories: 12,
      contributors: ["You"],
      lastVisited: "Yesterday",
    },
    {
      id: "3",
      title: "First Apartment",
      description: "Independence, movie nights, and growing up",
      thumbnail: "/placeholder.svg?height=320&width=280",
      objectCount: 8,
      memories: 6,
      contributors: ["You", "Roommate"],
      lastVisited: "3 days ago",
      processing: true,
    },
  ])

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      <Navigation />

      {/* Decorative SVG Lines - Hidden on mobile */}
      <svg className="decorative-line top-32 left-10 w-32 h-32 hidden lg:block" viewBox="0 0 100 100">
        <path d="M20,20 Q50,5 80,20 Q65,50 80,80 Q50,65 20,80 Q35,50 20,20" />
      </svg>
      <svg className="decorative-line top-96 right-16 w-24 h-24 hidden lg:block" viewBox="0 0 100 100">
        <path d="M10,50 Q30,10 50,30 Q70,10 90,50 Q70,90 50,70 Q30,90 10,50" />
      </svg>

      {/* Hero Section - Mobile Optimized */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[#43382F] mb-6 sm:mb-8 leading-tight tracking-wide">
            Your Life in
            <br />
            <span className="italic">3D Memories</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B5B4F] mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Transform your precious spaces into immersive galleries where every corner tells a story and every object
            holds a memory.
          </p>

          {/* Search Bar - Mobile Optimized */}
          <div className="max-w-md mx-auto mb-12 sm:mb-16 px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B745F] w-5 h-5" />
              <Input
                placeholder="Search memories..."
                className="pl-12 pr-4 py-3 sm:py-4 bg-white border-[#E4DCD0] rounded-full text-center shadow-sm hover:shadow-md smooth-transition text-[#43382F] placeholder:text-[#8B745F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/upload" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-8 sm:px-10 py-3 sm:py-4 shadow-lg hover:shadow-xl smooth-transition font-medium tracking-wide w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Create Memory Room
              </Button>
            </Link>
            <Link href="/how-to-record" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 sm:px-10 py-3 sm:py-4 border-[#8B745F] text-[#8B745F] bg-white hover:bg-[#F0EBE5] shadow-sm hover:shadow-md smooth-transition font-medium tracking-wide w-full sm:w-auto"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                How to Record
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Memory Rooms Section - Mobile Optimized */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#43382F] tracking-wide mb-4 sm:mb-0">
              Your Memory Rooms
            </h2>
            <Link href="/my-memories">
              <Button variant="ghost" className="text-[#8B745F] hover:text-[#6B5B4F] hover:bg-[#F0EBE5] rounded-full">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {memoryRooms.map((room) => (
              <Card
                key={room.id}
                className="group cursor-pointer hover:shadow-2xl smooth-transition bg-white border-[#E4DCD0] rounded-2xl sm:rounded-3xl overflow-hidden hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={room.thumbnail || "/placeholder.svg"}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                    />
                  </div>

                  {room.processing && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4C4B0] rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B745F] animate-spin" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-[#43382F]">Processing into 3D...</p>
                        <div className="w-24 sm:w-32 h-1 bg-[#E4DCD0] rounded-full mt-2 mx-auto">
                          <div className="w-3/4 h-1 bg-[#8B745F] rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <Badge className="bg-white/90 text-[#8B745F] border-0 rounded-full shadow-sm text-xs">
                      {room.objectCount} objects
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 sm:p-8">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#43382F] mb-2 sm:mb-3 group-hover:text-[#8B745F] smooth-transition tracking-wide">
                    {room.title}
                  </h3>
                  <p className="text-[#6B5B4F] text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-2 font-light">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-[#8B745F] mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {room.memories} memories
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {room.contributors.length}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-[#E4DCD0]">
                    <p className="text-xs text-[#8B745F] font-light">Last visited {room.lastVisited}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Create New Room Card - Mobile Optimized */}
            <Link href="/upload">
              <Card className="group cursor-pointer hover:shadow-2xl smooth-transition bg-[#F0EBE5] border-2 border-dashed border-[#D4C4B0] hover:border-[#8B745F] rounded-2xl sm:rounded-3xl h-full flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
                <CardContent className="text-center p-6 sm:p-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:bg-[#8B745F] smooth-transition shadow-lg">
                    <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-[#8B745F] group-hover:text-white smooth-transition" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#43382F] mb-3 sm:mb-4 tracking-wide">
                    Create New Memory Room
                  </h3>
                  <p className="text-[#6B5B4F] text-sm leading-relaxed font-light">
                    Upload a video of your special space and transform it into an immersive 3D memory gallery
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile Optimized */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-[#E4DCD0] shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-[#43382F] mb-2 sm:mb-3">12</div>
                <div className="text-[#8B745F] font-light tracking-wide text-sm sm:text-base">Memory Rooms</div>
                <div className="w-12 sm:w-16 h-0.5 bg-[#D4C4B0] rounded-full mx-auto mt-2 sm:mt-3"></div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-[#43382F] mb-2 sm:mb-3">247</div>
                <div className="text-[#8B745F] font-light tracking-wide text-sm sm:text-base">Tagged Objects</div>
                <div className="w-12 sm:w-16 h-0.5 bg-[#D4C4B0] rounded-full mx-auto mt-2 sm:mt-3"></div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-[#43382F] mb-2 sm:mb-3">89</div>
                <div className="text-[#8B745F] font-light tracking-wide text-sm sm:text-base">Shared Memories</div>
                <div className="w-12 sm:w-16 h-0.5 bg-[#D4C4B0] rounded-full mx-auto mt-2 sm:mt-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Mobile Optimized */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#43382F] mb-3 sm:mb-4 tracking-wide">
            Join the Memory Keepers
          </h3>
          <p className="text-[#6B5B4F] mb-6 sm:mb-8 font-light leading-relaxed text-sm sm:text-base">
            Be the first to know about new collections and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <Input
              placeholder="Email"
              className="flex-1 bg-white border-[#E4DCD0] rounded-full px-4 sm:px-6 py-2 sm:py-3 text-[#43382F] placeholder:text-[#8B745F]"
            />
            <Button className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-6 sm:px-8 py-2 sm:py-3 smooth-transition">
              →
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
