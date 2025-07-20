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
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Tag,
  Users,
  Heart,
  MessageCircle,
  Send,
  Eye,
  X,
  Plus,
  Sparkles,
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

export default function MyMemoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [filterTag, setFilterTag] = useState("")
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
    {
      id: "4",
      title: "College Dorm Room",
      description: "Late night study sessions, friendships, and discovering who I am",
      thumbnail: "/images/college-dorm.jpg",
      objectCount: 15,
      memories: 11,
      contributors: ["You", "Roommate", "Friends"],
      lastVisited: "5 days ago",
      createdAt: "2024-01-12",
      tags: ["college", "friendship", "study", "youth"],
      isShared: true,
      comments: [
        {
          id: "1",
          author: "College Friend",
          avatar: "/placeholder-user.jpg",
          content: "I remember spending so many nights here cramming for exams! Good times 📚",
          timestamp: "1 day ago",
        },
      ],
    },
    {
      id: "5",
      title: "Movie Theatre",
      description: "Where stories came alive and dreams were born on the silver screen",
      thumbnail: "/images/movie-theatre.jpg",
      objectCount: 25,
      memories: 18,
      contributors: ["You", "Family", "Friends"],
      lastVisited: "2 weeks ago",
      createdAt: "2024-01-03",
      tags: ["movies", "entertainment", "nostalgia", "family"],
      isShared: true,
      comments: [
        {
          id: "1",
          author: "Movie Buddy",
          avatar: "/placeholder-user.jpg",
          content: "This place holds so many memories! Remember our first date here? 🍿❤️",
          timestamp: "3 days ago",
        },
      ],
    },
    {
      id: "6",
      title: "Bathroom",
      description: "A peaceful sanctuary for self-care, reflection, and quiet moments of solitude",
      thumbnail: "/images/bathroom.jpg",
      objectCount: 10,
      memories: 7,
      contributors: ["You"],
      lastVisited: "1 day ago",
      createdAt: "2024-01-20",
      tags: ["self-care", "peaceful", "personal", "wellness"],
    },
  ])

  const allTags = Array.from(new Set(memoryRooms.flatMap((room) => room.tags)))

  const filteredRooms = memoryRooms.filter((room) => {
    const matchesSearch =
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !filterTag || room.tags.includes(filterTag)
    return matchesSearch && matchesTag
  })

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "name":
        return a.title.localeCompare(b.title)
      case "memories":
        return b.memories - a.memories
      default:
        return 0
    }
  })

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

      <div className="pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#43382F] mb-4 tracking-wide italic">
              My Memory Rooms
            </h1>
            <p className="text-base sm:text-lg text-[#6B5B4F] max-w-2xl leading-relaxed font-light">
              Explore and manage your collection of 3D memory galleries
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B745F] w-4 h-4" />
              <Input
                placeholder="Search memory rooms..."
                className="pl-10 bg-white border-[#E4DCD0] rounded-xl text-[#43382F] placeholder:text-[#8B745F]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter by Tag */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B745F] w-4 h-4" />
              <select
                className="pl-10 pr-4 py-2 bg-white border border-[#E4DCD0] rounded-xl text-[#43382F] appearance-none cursor-pointer min-w-[150px]"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              className="px-4 py-2 bg-white border border-[#E4DCD0] rounded-xl text-[#43382F] appearance-none cursor-pointer min-w-[120px]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="memories">Most Memories</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-white border border-[#E4DCD0] rounded-xl p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-lg ${viewMode === "grid" ? "bg-[#8B745F] text-white" : "text-[#8B745F] hover:bg-[#F0EBE5]"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-lg ${viewMode === "list" ? "bg-[#8B745F] text-white" : "text-[#8B745F] hover:bg-[#F0EBE5]"}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Memory Rooms Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {sortedRooms.map((room) => (
                <Card
                  key={room.id}
                  className="group cursor-pointer hover:shadow-2xl smooth-transition bg-white border-[#E4DCD0] rounded-2xl overflow-hidden hover:scale-[1.02]"
                  onClick={() => handleViewRoom(room)}
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
                          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <img
                              src="/funny-processing.gif"
                              alt="Processing animation"
                              className="w-full h-full object-contain rounded-full"
                            />
                          </div>
                          <p className="text-xs font-medium text-[#43382F] mb-2">Processing into 3D...</p>
                          <div className="w-24 h-2 bg-[#E4DCD0] rounded-full mx-auto">
                            <div className="w-[1%] h-2 bg-[#8B745F] rounded-full"></div>
                          </div>
                          <p className="text-xs text-[#8B745F] mt-1">1% complete</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/90 text-[#8B745F] border-0 rounded-full shadow-sm text-xs">
                        {room.objectCount} objects
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-2 group-hover:text-[#8B745F] smooth-transition tracking-wide">
                      {room.title}
                    </h3>
                    <p className="text-[#6B5B4F] text-sm mb-4 leading-relaxed line-clamp-2 font-light">
                      {room.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-[#8B745F] mb-4">
                      <div className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {room.memories} memories
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {room.contributors.length}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E4DCD0]">
                      <p className="text-xs text-[#8B745F] font-light">Last visited {room.lastVisited}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Create New Room Card */}
              <Link href="/upload">
                <Card className="group cursor-pointer hover:shadow-2xl smooth-transition bg-[#F0EBE5] border-2 border-dashed border-[#D4C4B0] hover:border-[#8B745F] rounded-2xl h-full flex items-center justify-center min-h-[400px]">
                  <CardContent className="text-center p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8B745F] smooth-transition shadow-lg">
                      <Plus className="w-8 h-8 text-[#8B745F] group-hover:text-white smooth-transition" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-3 tracking-wide">
                      Create New Memory Room
                    </h3>
                    <p className="text-[#6B5B4F] text-sm leading-relaxed font-light">
                      Upload a video to create another 3D memory gallery
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedRooms.map((room) => (
                <Card
                  key={room.id}
                  className="group cursor-pointer hover:shadow-lg smooth-transition bg-white border-[#E4DCD0] rounded-xl overflow-hidden"
                  onClick={() => handleViewRoom(room)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 overflow-hidden rounded-lg">
                          <img
                            src={room.thumbnail || "/placeholder.svg"}
                            alt={room.title}
                            className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                          />
                        </div>
                        {room.processing && (
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-lg">
                            <Sparkles className="w-6 h-6 text-[#8B745F] animate-spin" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-semibold text-[#43382F] mb-2 group-hover:text-[#8B745F] smooth-transition tracking-wide">
                          {room.title}
                        </h3>
                        <p className="text-[#6B5B4F] text-sm mb-3 leading-relaxed font-light">{room.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-[#8B745F]">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {room.memories} memories
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {room.contributors.length} contributors
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(room.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className="bg-[#F0EBE5] text-[#8B745F] border-0 rounded-full mb-2">
                          {room.objectCount} objects
                        </Badge>
                        <p className="text-xs text-[#8B745F] font-light">Last visited {room.lastVisited}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {sortedRooms.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-[#8B745F]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#43382F] mb-2 tracking-wide">
                No memory rooms found
              </h3>
              <p className="text-[#6B5B4F] mb-6 font-light">
                {searchQuery || filterTag
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first memory room to get started"}
              </p>
              <Link href="/upload">
                <Button className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl px-8 py-3">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Memory Room
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

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
