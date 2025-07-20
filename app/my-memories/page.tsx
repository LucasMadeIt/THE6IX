"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import {
  Search,
  Grid,
  List,
  Filter,
  Heart,
  Users,
  Calendar,
  Tag,
  Play,
  Sparkles,
  Edit,
  Trash2,
  MoreVertical,
  Upload,
  X,
  ImageIcon,
  MessageCircle,
  Send,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  createdAt: string
  lastVisited: string
  tags: string[]
  processing?: boolean
  isShared?: boolean
  comments?: Comment[]
}

export default function MyMemoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [editingRoom, setEditingRoom] = useState<MemoryRoom | null>(null)
  const [viewingRoom, setViewingRoom] = useState<MemoryRoom | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editTags, setEditTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [editThumbnail, setEditThumbnail] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [newComment, setNewComment] = useState("")

  const [memoryRooms, setMemoryRooms] = useState<MemoryRoom[]>([
    {
      id: "1",
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
      id: "2",
      title: "Grandma's Kitchen",
      description: "Sunday morning pancakes and warm conversations that filled our hearts",
      thumbnail: "/images/grandmas-kitchen.jpg",
      objectCount: 12,
      memories: 8,
      contributors: ["You", "Mom", "Sister"],
      createdAt: "2024-01-15",
      lastVisited: "2 hours ago",
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
      createdAt: "2024-01-05",
      lastVisited: "1 week ago",
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
      description: "Late-night study sessions and lifelong friendships formed",
      thumbnail: "/images/college-dorm.jpg",
      objectCount: 10,
      memories: 9,
      contributors: ["You", "Roommate", "Friends"],
      createdAt: "2024-01-01",
      lastVisited: "2 weeks ago",
      tags: ["college", "studying", "friendship", "music"],
      isShared: true,
      comments: [
        {
          id: "1",
          author: "College Roommate",
          avatar: "/placeholder-user.jpg",
          content: "Those were the best days! Remember our late-night pizza runs? 🍕",
          timestamp: "1 week ago",
        },
      ],
    },
    {
      id: "5",
      title: "Movie Theatre",
      description: "Where stories came alive and dreams were born on the silver screen",
      thumbnail: "/images/movie-theatre.jpg",
      objectCount: 15,
      memories: 12,
      contributors: ["You", "Friends"],
      createdAt: "2023-12-20",
      lastVisited: "3 weeks ago",
      tags: ["movies", "entertainment", "friends", "memories"],
    },
    {
      id: "6",
      title: "Bathroom",
      description: "Friends helped me through my worst moments here, making me feel valued and supported",
      thumbnail: "/images/bathroom.jpg",
      objectCount: 8,
      memories: 5,
      contributors: ["You", "Best Friend"],
      createdAt: "2023-12-15",
      lastVisited: "1 month ago",
      tags: ["support", "friendship", "healing", "care"],
      isShared: true,
      comments: [
        {
          id: "1",
          author: "Best Friend",
          avatar: "/placeholder-user.jpg",
          content: "I'm so glad I could be there for you during those tough times. You're stronger than you know! 💪❤️",
          timestamp: "2 weeks ago",
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

  const handleEditRoom = (room: MemoryRoom) => {
    setEditingRoom(room)
    setEditTitle(room.title)
    setEditDescription(room.description)
    setEditThumbnail(room.thumbnail)
    setThumbnailFile(null)
  }

  const handleViewRoom = (room: MemoryRoom) => {
    setViewingRoom(room)
    setEditTitle(room.title)
    setEditDescription(room.description)
    setEditTags([...room.tags])
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setEditThumbnail(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeThumbnail = () => {
    setThumbnailFile(null)
    setEditThumbnail("/placeholder.svg?height=280&width=400")
  }

  const handleSaveEdit = () => {
    if (editingRoom) {
      setMemoryRooms((rooms) =>
        rooms.map((room) =>
          room.id === editingRoom.id
            ? {
                ...room,
                title: editTitle,
                description: editDescription,
                thumbnail: editThumbnail || room.thumbnail,
              }
            : room,
        ),
      )
      setEditingRoom(null)
      setEditTitle("")
      setEditDescription("")
      setEditThumbnail(null)
      setThumbnailFile(null)
    }
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

  const handleDeleteRoom = (roomId: string) => {
    setMemoryRooms((rooms) => rooms.filter((room) => room.id !== roomId))
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

            {/* Mobile Filter Controls with consistent beige/brown background */}
            <div className="flex gap-2">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full px-4 py-2 ${
                    viewMode === "grid"
                      ? "bg-[#8B745F] hover:bg-[#6B5B4F] text-white border-[#8B745F]"
                      : "bg-[#F0EBE5] hover:bg-[#E4DCD0] text-[#8B745F] border-[#E4DCD0]"
                  }`}
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-full px-4 py-2 ${
                    viewMode === "list"
                      ? "bg-[#8B745F] hover:bg-[#6B5B4F] text-white border-[#8B745F]"
                      : "bg-[#F0EBE5] hover:bg-[#E4DCD0] text-[#8B745F] border-[#E4DCD0]"
                  }`}
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 py-2 bg-[#F0EBE5] hover:bg-[#E4DCD0] text-[#8B745F] border-[#E4DCD0]"
              >
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
                    onClick={() => handleViewRoom(room)}
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

                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className="bg-white/90 text-[#8B745F] border-0 rounded-full shadow-sm text-xs">
                      {room.objectCount} objects
                    </Badge>

                    {/* Edit/Delete Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 hover:bg-white rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <MoreVertical className="w-4 h-4 text-[#8B745F]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-[#E4DCD0]">
                        <DropdownMenuItem
                          onClick={() => handleEditRoom(room)}
                          className="text-[#8B745F] hover:bg-[#F0EBE5] cursor-pointer"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteRoom(room.id)}
                          className="text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                          className="text-xs border-amber-200 text-amber-700 bg-amber-50 pr-1"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 h-4 w-4 p-0 hover:bg-red-100"
                          >
                            <X className="w-3 h-3 text-red-500" />
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

      {/* Edit Dialog */}
      <Dialog open={!!editingRoom} onOpenChange={() => setEditingRoom(null)}>
        <DialogContent className="bg-white border-[#E4DCD0] max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-[#43382F] tracking-wide">Edit Memory Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-[#43382F] mb-2">Room Title</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F]"
                placeholder="Enter room title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#43382F] mb-2">Description</label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F] resize-none"
                rows={3}
                placeholder="Enter description..."
              />
            </div>

            {/* Thumbnail Upload Section */}
            <div>
              <label className="block text-sm font-medium text-[#43382F] mb-2">Room Thumbnail</label>
              {editThumbnail && !editThumbnail.includes("placeholder") ? (
                <div className="relative">
                  <img
                    src={editThumbnail || "/placeholder.svg"}
                    alt="Room thumbnail"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#E4DCD0] rounded-xl p-6 text-center bg-[#F0EBE5]">
                  <ImageIcon className="w-8 h-8 text-[#8B745F] mx-auto mb-3" />
                  <p className="text-sm text-[#6B5B4F] mb-3">Upload a thumbnail image for your room</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="edit-thumbnail-upload"
                  />
                  <label htmlFor="edit-thumbnail-upload">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-white border-[#8B745F] text-[#8B745F] hover:bg-[#F0EBE5]"
                    >
                      <span className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </span>
                    </Button>
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setEditingRoom(null)}
                className="flex-1 bg-white border-[#E4DCD0] text-[#8B745F] hover:bg-[#F0EBE5] rounded-xl"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} className="flex-1 bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
