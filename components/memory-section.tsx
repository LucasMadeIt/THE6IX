"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Users, Calendar, Tag } from "lucide-react"

interface MemorySpace {
  id: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  memories: string[]
  contributors: string[]
  createdAt: string
  type: "room" | "object"
}

interface MemorySectionProps {
  memory: MemorySpace
  onClick: () => void
}

export function MemorySection({ memory, onClick }: MemorySectionProps) {
  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/70 border-stone-200 hover:border-amber-300 overflow-hidden">
      <div className="relative">
        <img
          src={memory.thumbnail || "/placeholder.svg"}
          alt={memory.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          size="sm"
          className="absolute top-3 right-3 bg-white/90 text-stone-700 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          <Play className="w-4 h-4" />
        </Button>
        <Badge variant="secondary" className="absolute top-3 left-3 bg-white/90 text-stone-700">
          {memory.type === "room" ? "Room" : "Object"}
        </Badge>
      </div>

      <CardContent className="p-6" onClick={onClick}>
        <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
          {memory.title}
        </h3>
        <p className="text-stone-600 text-sm mb-4 line-clamp-2">{memory.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {memory.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {memory.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-stone-200 text-stone-500">
              +{memory.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Memories Count */}
        <div className="text-sm text-stone-500 mb-3">
          {memory.memories.length} {memory.memories.length === 1 ? "memory" : "memories"} captured
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(memory.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {memory.contributors.length} contributor{memory.contributors.length !== 1 ? "s" : ""}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
