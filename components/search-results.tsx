"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, MapPin, Calendar, Tag } from "lucide-react"

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

interface SearchResultsProps {
  query: string
  memorySpaces: MemorySpace[]
  onSelectMemory: (memory: MemorySpace) => void
  onClose: () => void
}

export function SearchResults({ query, memorySpaces, onSelectMemory, onClose }: SearchResultsProps) {
  const filteredResults = memorySpaces.filter(
    (space) =>
      space.title.toLowerCase().includes(query.toLowerCase()) ||
      space.description.toLowerCase().includes(query.toLowerCase()) ||
      space.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
      space.memories.some((memory) => memory.toLowerCase().includes(query.toLowerCase())),
  )

  const tagMatches = memorySpaces.flatMap((space) =>
    space.tags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())).map((tag) => ({ space, tag })),
  )

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-6 bg-white/95 backdrop-blur-md border-stone-200 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-stone-800">Search Results for "{query}"</h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-8 h-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Memory Spaces */}
            {filteredResults.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-stone-600 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Memory Spaces ({filteredResults.length})
                </h4>
                <div className="space-y-2">
                  {filteredResults.map((space) => (
                    <div
                      key={space.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors"
                      onClick={() => {
                        onSelectMemory(space)
                        onClose()
                      }}
                    >
                      <img
                        src={space.thumbnail || "/placeholder.svg"}
                        alt={space.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-stone-800">{space.title}</h5>
                        <p className="text-sm text-stone-600 line-clamp-1">{space.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {space.type}
                          </Badge>
                          <span className="text-xs text-stone-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(space.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tag Matches */}
            {tagMatches.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-stone-600 mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  Tagged Objects ({tagMatches.length})
                </h4>
                <div className="space-y-2">
                  {tagMatches.map(({ space, tag }, index) => (
                    <div
                      key={`${space.id}-${tag}-${index}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors"
                      onClick={() => {
                        onSelectMemory(space)
                        onClose()
                      }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                        <Tag className="w-6 h-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-stone-800">{tag}</h5>
                        <p className="text-sm text-stone-600">Found in {space.title}</p>
                        <Badge variant="outline" className="text-xs border-amber-200 text-amber-700 bg-amber-50 mt-1">
                          {tag}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredResults.length === 0 && tagMatches.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-stone-400" />
                </div>
                <h4 className="text-lg font-medium text-stone-700 mb-2">No results found</h4>
                <p className="text-stone-500 text-sm">Try searching for room names, objects, or memory descriptions</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
