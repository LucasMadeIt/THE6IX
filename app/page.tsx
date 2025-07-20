"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Camera,
  Heart,
  Users,
  ArrowRight,
  Tag,
  Calendar,
  MessageCircle,
  Send,
  Eye,
  X,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
}

interface MemoryRoom {
  id: string
  title: string
  description: string
  thumbnail: string
  objectCount: number
  memories: number
  contributors: string[]
  lastVisited: string
  createdAt: string
  tags: string[]
  processing?: boolean
  isShared?: boolean
  comments?: Comment[]
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewingRoom, setViewingRoom] = useState<MemoryRoom | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTags, setEditTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [newComment, setNewComment] = useState("")

  const [memoryRooms, setMemoryRooms] = useState<MemoryRoom[]>([
    {
      id: "1",
      title: "First Apartment Living Room",
      description: "Independence, movie nights, and the beginning of adulthood",
      thumbnail: "/placeholder.svg?height=320&width=280",
      objectCount: 8,
      memories: 6,
      contributors: ["You", "Roommate"],
      lastVisited: "3 days ago",
      createdAt: "2024-01-08",
      tags: ["independence", "movies", "friends", "growth"],
      processing: true,
    },
    {
      id: "2",
      title: "Grandma's Kitchen",
      description: "Sunday morning pancakes and warm conversations that filled our hearts",
      thumbnail: "/images/grandmas-kitchen.jpg",
      objectCount: 12,
      memories: 8,
      contributors: ["You", "Mom", "Sister"],
      lastVisited: "2 hours ago",
      createdAt: "2024-01-15",
      tags: ["family", "cooking", "vintage", "warmth"],
      isShared: true,
      comments: [
        {
          id: "1",
          author: "Mom",
          avatar: "/placeholder-user.jpg",
          content: "This brings back so many beautiful memories! I can almost smell the pancakes cooking.",
          timestamp: "2 hours ago",
        },
        {
          id: "2",
          author: "Sister",
          avatar: "/placeholder-user.jpg",
          content: "Remember how Grandma would always have fresh flowers on the table? 💐",
          timestamp: "1 hour ago",
        },
      ],
    },
    {
      id: "3",
      title: "Mom's Garden Shed",
      description: "Where tools became treasures and every plant had a story",
      thumbnail: "/images/garden-shed.jpg",
      objectCount: 20,
      memories: 15,
      contributors: ["You", "Mom", "Dad"],
      lastVisited: "1 week ago",
      createdAt: "2024-01-05",
      tags: ["garden", "nature", "tools", "seasons"],
      isShared: true,
      comments: [
        {
          id: "1",
          author: "Dad",
          avatar: "/placeholder-user.jpg",
          content: "Mom spent countless hours in here nurturing her plants. It was her sanctuary.",
          timestamp: "3 days ago",
        },
      ],
    },
  ])

  const filteredRooms = memoryRooms.filter(
    (room) =>
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleViewRoom = (room: MemoryRoom) => {
    setViewingRoom(room)
    setEditTitle(room.title)
    setEditDescription(room.description)
    setEditTags([...room.tags])
  }

  const handleSaveView = () => {
    if (viewingRoom) {
      setMemoryRooms((rooms) =>
        rooms.map((room) =>
          room.id === viewingRoom.id
            ? {
                ...room,
                title: editTitle,
                description: editDescription,
                tags: editTags,
              }
            : room,
        ),
      )
      setViewingRoom(null)
      setEditTitle("")
      setEditDescription("")
      setEditTags([])
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !editTags.includes(newTag.trim())) {
      setEditTags([...editTags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setEditTags(editTags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddComment = () => {
    if (newComment.trim() && viewingRoom) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        avatar: "/placeholder-user.jpg",
        content: newComment,
        timestamp: "Just now",
      }

      setMemoryRooms((rooms) =>
        rooms.map((room) =>
          room.id === viewingRoom.id
            ? {
                ...room,
                comments: [...(room.comments || []), comment],
              }
            : room,
        ),
      )

      setNewComment("")
    }
  }

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
            <Link href="/upload" className="w-full sm:w-auto">
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
            {filteredRooms.map((room) => (
              <Card
                key={room.id}
                className="group cursor-pointer hover:shadow-2xl smooth-transition bg-white border-[#E4DCD0] rounded-2xl sm:rounded-3xl overflow-hidden hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden" onClick={() => handleViewRoom(room)}>
                    <img
                      src={room.thumbnail || "/placeholder.svg"}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                    />
                  </div>

                  {room.processing && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                          <img
                            src="/funny-processing.gif"
                            alt="Processing animation"
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-[#43382F] mb-2">Processing into 3D...</p>
                        <div className="w-24 sm:w-32 h-2 bg-[#E4DCD0] rounded-full mx-auto">
                          <div className="w-[1%] h-2 bg-[#8B745F] rounded-full"></div>
                        </div>
                        <p className="text-xs text-[#8B745F] mt-1">1% complete</p>
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

          {/* Search Results Message */}
          {searchQuery && (
            <div className="mt-8 text-center">
              <p className="text-[#6B5B4F] text-sm">
                {filteredRooms.length === 0
                  ? `No results found for "${searchQuery}"`
                  : `Showing ${filteredRooms.length} result${filteredRooms.length !== 1 ? "s" : ""} for "${searchQuery}"`}
              </p>
            </div>
          )}
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

      {/* View Room Dialog */}
      <Dialog open={!!viewingRoom} onOpenChange={() => setViewingRoom(null)}>
        <DialogContent className="bg-white border-[#E4DCD0] max-w-4xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
          {viewingRoom && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-[#43382F] tracking-wide">
                  Memory Room Details
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Thumbnail Image */}
                <div className="w-full h-64 sm:h-80 overflow-hidden rounded-xl">
                  <img
                    src={viewingRoom.thumbnail || "/placeholder.svg"}
                    alt={viewingRoom.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Editable Title and Description */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#43382F] mb-2">Room Title</label>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F] text-lg font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#43382F] mb-2">Description</label>
                    <Textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F] resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Tags Section */}
                  <div>
                    <label className="block text-sm font-medium text-[#43382F] mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-[#D4C4B0] text-[#8B745F] bg-[#F0EBE5] pr-1"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 h-4 w-4 p-0 hover:bg-[#E4DCD0]"
                          >
                            <X className="w-3 h-3 text-[#8B745F]" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add new tag..."
                        className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F] text-sm"
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      />
                      <Button
                        onClick={handleAddTag}
                        disabled={!newTag.trim()}
                        size="sm"
                        className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl"
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Date Section */}
                  <div>
                    <label className="block text-sm font-medium text-[#43382F] mb-2">Created Date</label>
                    <div className="flex items-center space-x-2 text-[#6B5B4F]">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(viewingRoom.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* View in 3D Button */}
                <div className="border-t border-[#E4DCD0] pt-6">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#8B745F] to-[#6B5B4F] hover:from-[#6B5B4F] hover:to-[#5A4A3F] text-white rounded-xl py-4 font-medium tracking-wide"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View in 3D & Explore
                  </Button>
                </div>

                {/* Comments Section - Only if shared */}
                {viewingRoom.isShared && (
                  <div className="border-t border-[#E4DCD0] pt-6">
                    <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-4 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Comments from Family & Friends
                    </h3>

                    {/* Existing Comments */}
                    <div className="space-y-4 mb-6">
                      {viewingRoom.comments?.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-[#F0EBE5] rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-[#43382F] text-sm">{comment.author}</span>
                              <span className="text-xs text-[#8B745F]">{comment.timestamp}</span>
                            </div>
                            <p className="text-[#6B5B4F] text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Comment */}
                    <div className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>Y</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex space-x-2">
                        <Input
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F]"
                          onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                        />
                        <Button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          size="sm"
                          className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setViewingRoom(null)}
                    className="flex-1 bg-white border-[#E4DCD0] text-[#8B745F] hover:bg-[#F0EBE5] rounded-xl"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleSaveView}
                    className="flex-1 bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
