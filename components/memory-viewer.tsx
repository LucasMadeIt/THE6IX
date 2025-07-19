"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mic, MessageSquare, Users, Share, Tag, Volume2 } from "lucide-react"
import { AIConversation } from "@/components/ai-conversation"
import { TaggedObject } from "@/components/tagged-object"

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

interface MemoryViewerProps {
  memory: MemorySpace
  onBack: () => void
}

function Room3D() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#faf0e6" />
      </mesh>

      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#faf0e6" />
      </mesh>

      {/* Tagged Objects */}
      <TaggedObject position={[-2, -1, -2]} name="Teddy Bear" description="My childhood companion" color="#8B4513" />

      <TaggedObject
        position={[2, -0.5, -3]}
        name="Bookshelf"
        description="Where stories lived"
        color="#654321"
        scale={[1, 2, 0.5]}
      />

      <TaggedObject
        position={[0, -1.5, 2]}
        name="Wooden Bed"
        description="Where dreams began"
        color="#D2691E"
        scale={[2, 0.5, 1]}
      />
    </group>
  )
}

export function MemoryViewer({ memory, onBack }: MemoryViewerProps) {
  const [showAIChat, setShowAIChat] = useState(false)
  const [selectedObject, setSelectedObject] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack} className="rounded-full border-stone-200 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-stone-800">{memory.title}</h1>
            <p className="text-stone-600">{memory.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAIChat(!showAIChat)}
            className="rounded-full border-stone-200"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            AI Memory Assistant
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-stone-200 bg-transparent">
            <Users className="w-4 h-4 mr-2" />
            Collaborate
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-stone-200 bg-transparent">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* 3D Viewer */}
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <Room3D />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={15} />
            <Environment preset="apartment" />
          </Canvas>

          {/* 3D Controls Overlay */}
          <div className="absolute bottom-6 left-6 space-y-3">
            <Card className="bg-white/90 backdrop-blur-sm border-stone-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-stone-700 mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Tagged Objects
                </h3>
                <div className="space-y-2">
                  {memory.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-amber-50 border-amber-200 text-amber-700"
                      onClick={() => setSelectedObject(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-stone-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-stone-700 mb-2">Navigation</h3>
                <div className="text-sm text-stone-600 space-y-1">
                  <p>• Click and drag to rotate</p>
                  <p>• Scroll to zoom in/out</p>
                  <p>• Right-click and drag to pan</p>
                  <p>• Click objects to explore</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Voice Recording Button */}
          <Button
            size="lg"
            className={`absolute bottom-6 right-6 rounded-full w-16 h-16 ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            }`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? <Volume2 className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
        </div>

        {/* AI Chat Sidebar */}
        {showAIChat && (
          <div className="w-96 border-l border-stone-200 bg-white/70 backdrop-blur-sm">
            <AIConversation memory={memory} />
          </div>
        )}
      </div>
    </div>
  )
}
