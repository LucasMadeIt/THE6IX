"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Search, Grid, List, Filter, Heart, Users, Calendar, Tag, Play, Sparkles } from "lucide-react"
import Link from "next/link"

interface MemoryRoom {
  id: string
  title: string
  description: string
  thumbnail: string
  objectCount: number
  memories: number
  contributors: string[]
  createdAt: string
  lastVisited: string
  tags: string[]
  processing?: boolean
}

export default function MyMemoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const [memoryRooms] = useState<MemoryRoom[]>([
    {
      id: "1",
      title: "Grandma's Kitchen",
      description: "Sunday morning pancakes and warm conversations that filled our hearts",
      thumbnail: "/placeholder.svg?height=280&width=400",
      objectCount: 12,
      memories: 8,
      contributors: ["You", "Mom", "Sister"],
      createdAt: "2024-01-15",
      lastVisited: "2 hours ago",
      tags: ["family", "cooking", "vintage", "warmth"],
    },
    {
      id: "2",
      title: "Childhood Bedroom",
      description: "Where dreams began and bedtime stories came to life every night",
      thumbnail: "/placeholder.svg?height=280&width=400",
      objectCount: 15,
      memories: 12,
      contributors: ["You"],
      createdAt: "2024-01-10",
      lastVisited: "Yesterday",
      tags: ["childhood", "dreams", "books", "toys"],
    },
    {
      id: "3",
      title: "First Apartment Living Room",
      description: "Independence, movie nights, and the beginning of adulthood",
      thumbnail: "/placeholder.svg?height=280&width=400",
      objectCount: 8,
      memories: 6,
      contributors: ["You", "Roommate"],
      createdAt: "2024-01-08",
      lastVisited: "3 days ago",
      tags: ["independence", "movies", "friends", "growth"],
      processing: true,
    },
    {
      id: "4",
      title: "Mom's Garden Shed",
      description: "Where tools became treasures and every plant had a story",
      thumbnail: "/placeholder.svg?height=280&width=400",
      objectCount: 20,
      memories: 15,
      contributors: ["You", "Mom", "Dad"],
      createdAt: "2024-01-05",
      lastVisited: "1 week ago",
      tags: ["garden", "nature", "tools", "seasons"],
    },
    {
      id: "5",
      title: "College Dorm Room",
      description: "Late-night study sessions and lifelong friendships formed",
      thumbnail: "/placeholder.svg?height=280&width=400",
      objectCount: 10,
      memories: 9,
      contributors: ["You", "Roommate", "Friends"],
      createdAt: "2024-01-01",
      lastVisited: "2 weeks ago",
      tags: ["college", "studying", "friendship", "music"],
    },
    {
      id: "6",
      title: "Grandpa's Workshop",
      description: "Wood shavings and wisdom, where hands created magic",
      thumbnail: "/placeholder.svg?height=280&width=400",
      objectCount: 25,
      memories: 18,
      contributors: ["You", "Grandpa", "Dad"],
      createdAt: "2023-12-28",
      lastVisited: "3 weeks ago",
      tags: ["woodworking", "crafts", "wisdom", "tools"],
    },
  ])

  const filteredRooms = memoryRooms.filter(
    (room) =>
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      <Navigation />

      <div className="pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#43382F] mb-4 tracking-wide">
              My Memory Rooms
            </h1>
            <p className="text-[#6B5B4F] text-sm sm:text-base font-light leading-relaxed">
              Your collection of precious spaces transformed into 3D memories
            </p>
          </div>

          {/* Search and Filters - Mobile Optimized */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8B745F] w-5 h-5" />
              <Input
                placeholder="Search your memories..."
                className="pl-12 pr-4 py-3 bg-white border-[#E4DCD0] rounded-full text-[#43382F] placeholder:text-[#8B745F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Filter Controls */}
            <div className="flex gap-2 bg-transparent">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-full px-4 py-2"
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-full px-4 py-2"
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>

              <Button variant="outline" size="sm" className="rounded-full px-4 py-2 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Memory Rooms Grid - Mobile Responsive */}
          <div
            className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {filteredRooms.map((room) => (
              <Card
                key={room.id}
                className="group cursor-pointer hover:shadow-xl smooth-transition bg-white border-[#E4DCD0] rounded-2xl sm:rounded-3xl overflow-hidden hover:scale-[1.02]"
              >
                <div className="relative">
                  <div
                    className={`${viewMode === "grid" ? "aspect-[4/3]" : "aspect-[16/9] sm:aspect-[4/3]"} overflow-hidden`}
                  >
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

                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-[#8B745F] border-0 rounded-full shadow-sm text-xs">
                      {room.objectCount} objects
                    </Badge>
                  </div>

                  <Button
                    size="sm"
                    className="absolute top-3 left-3 bg-white/90 text-[#8B745F] hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#43382F] mb-2 group-hover:text-[#8B745F] smooth-transition tracking-wide">
                    {room.title}
                  </h3>
                  <p className="text-[#6B5B4F] text-sm mb-4 leading-relaxed line-clamp-2 font-light">
                    {room.description}
                  </p>

                  {/* Tags - Mobile Optimized */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {room.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-amber-200 text-amber-700 bg-amber-50"
                      >
                        <Tag className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {room.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs border-stone-200 text-stone-500">
                        +{room.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Stats - Mobile Optimized */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-[#8B745F] mb-3">
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {room.memories}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {room.contributors.length}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {new Date(room.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E4DCD0]">
                    <p className="text-xs text-[#8B745F] font-light">Last visited {room.lastVisited}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#8B745F]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#43382F] mb-2">No memories found</h3>
              <p className="text-[#6B5B4F] mb-6">Try adjusting your search or create a new memory room</p>
              <Link href="/upload">
                <Button className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-6 py-2">
                  Create Memory Room
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
