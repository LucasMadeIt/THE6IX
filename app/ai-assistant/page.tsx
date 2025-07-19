"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Mic, MessageSquare, Heart, Edit3, X, Check, Sparkles } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface DetectedObject {
  id: string
  name: string
  suggestedTag: string
  aiQuestion: string
  userResponse?: string
  position: { x: number; y: number }
  confidence: number
}

export default function AIAssistantPage() {
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0)
  const [userResponse, setUserResponse] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const [editTagValue, setEditTagValue] = useState("")

  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([
    {
      id: "1",
      name: "Stuffed Animal",
      suggestedTag: "Teddy Bear",
      aiQuestion: "Who gave you this teddy bear? What adventures did you two go on together?",
      position: { x: 25, y: 40 },
      confidence: 0.95,
    },
    {
      id: "2",
      name: "Framed Photo",
      suggestedTag: "Family Photo",
      aiQuestion: "What's the story behind this photo? Who's in it and when was it taken?",
      position: { x: 70, y: 30 },
      confidence: 0.88,
    },
    {
      id: "3",
      name: "Wooden Furniture",
      suggestedTag: "Study Desk",
      aiQuestion: "What memories do you have of using this desk? Did you do homework here or create something special?",
      position: { x: 45, y: 65 },
      confidence: 0.82,
    },
    {
      id: "4",
      name: "Book Collection",
      suggestedTag: "Favorite Books",
      aiQuestion: "Which of these books holds the most special meaning? What story or memory comes to mind?",
      position: { x: 15, y: 20 },
      confidence: 0.91,
    },
  ])

  const currentObject = detectedObjects[currentObjectIndex]

  const handleUserResponse = async (response: string) => {
    if (!response.trim()) return

    const updatedObjects = [...detectedObjects]
    updatedObjects[currentObjectIndex] = {
      ...currentObject,
      userResponse: response,
    }
    setDetectedObjects(updatedObjects)

    // Generate AI follow-up or summary
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `User said about their ${currentObject.suggestedTag}: "${response}". 
        Generate a brief, warm acknowledgment and suggest an updated tag if needed. 
        Keep it under 30 words and focus on the emotional connection.`,
        maxTokens: 50,
      })
      console.log("AI Response:", text)
    } catch (error) {
      console.error("Error generating AI response:", error)
    }

    setUserResponse("")

    // Move to next object or finish
    if (currentObjectIndex < detectedObjects.length - 1) {
      setTimeout(() => setCurrentObjectIndex(currentObjectIndex + 1), 1000)
    }
  }

  const handleEditTag = (objectId: string, newTag: string) => {
    const updatedObjects = detectedObjects.map((obj) => (obj.id === objectId ? { ...obj, suggestedTag: newTag } : obj))
    setDetectedObjects(updatedObjects)
    setEditingTag(null)
    setEditTagValue("")
  }

  const handleSkipObject = () => {
    if (currentObjectIndex < detectedObjects.length - 1) {
      setCurrentObjectIndex(currentObjectIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-25 to-rose-50">
      <Navigation />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-4">AI Memory Assistant</h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              I've detected {detectedObjects.length} objects in your room. Let's add the stories that make them special.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room Preview */}
            <Card className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-stone-100 to-amber-50">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Room preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Object Markers */}
                  {detectedObjects.map((obj, index) => (
                    <div
                      key={obj.id}
                      className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                        index === currentObjectIndex
                          ? "bg-rose-500 border-white animate-pulse scale-125"
                          : index < currentObjectIndex
                            ? "bg-emerald-500 border-white"
                            : "bg-amber-500 border-white hover:scale-110"
                      }`}
                      style={{
                        left: `${obj.position.x}%`,
                        top: `${obj.position.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => setCurrentObjectIndex(index)}
                    >
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Object List */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-stone-800 mb-4">Detected Objects</h3>
                  <div className="space-y-2">
                    {detectedObjects.map((obj, index) => (
                      <div
                        key={obj.id}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                          index === currentObjectIndex
                            ? "bg-rose-100 border border-rose-200"
                            : index < currentObjectIndex
                              ? "bg-emerald-100 border border-emerald-200"
                              : "bg-stone-100 hover:bg-stone-150 border border-stone-200"
                        }`}
                        onClick={() => setCurrentObjectIndex(index)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs font-bold text-white ${
                              index === currentObjectIndex
                                ? "bg-rose-500"
                                : index < currentObjectIndex
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                            }`}
                          >
                            {index < currentObjectIndex ? <Check className="w-3 h-3" /> : index + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              {editingTag === obj.id ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={editTagValue}
                                    onChange={(e) => setEditTagValue(e.target.value)}
                                    className="h-6 text-xs px-2"
                                    autoFocus
                                  />
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEditTag(obj.id, editTagValue)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Check className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingTag(null)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-amber-200 text-amber-700 bg-amber-50"
                                  >
                                    {obj.suggestedTag}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setEditingTag(obj.id)
                                      setEditTagValue(obj.suggestedTag)
                                    }}
                                    className="h-4 w-4 p-0"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                            <p className="text-xs text-stone-500">{Math.round(obj.confidence * 100)}% confident</p>
                          </div>
                        </div>
                        {obj.userResponse && <Heart className="w-4 h-4 text-rose-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Conversation */}
            <div className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-rose-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-800">AI Memory Guide</h3>
                      <p className="text-sm text-stone-600">Currently exploring: {currentObject?.suggestedTag}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-emerald-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-stone-800 leading-relaxed">{currentObject?.aiQuestion}</p>
                        <p className="text-xs text-stone-500 mt-2">
                          AI-generated question • Feel free to skip if needed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          value={userResponse}
                          onChange={(e) => setUserResponse(e.target.value)}
                          placeholder="Share your memory or story..."
                          className="pr-12 bg-white/70 border-stone-300 rounded-xl"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleUserResponse(userResponse)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0 ${
                            isRecording ? "text-red-500 bg-red-50" : "text-stone-400"
                          }`}
                          onClick={() => setIsRecording(!isRecording)}
                        >
                          <Mic className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={() => handleUserResponse(userResponse)}
                        disabled={!userResponse.trim()}
                        className="bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 hover:from-amber-600 hover:via-rose-600 hover:to-emerald-600 text-white rounded-xl px-6"
                      >
                        Share
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleSkipObject}
                        className="flex-1 rounded-xl bg-white/70 border-stone-300"
                      >
                        Skip This Object
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl bg-white/70 border-stone-300 px-6"
                        onClick={() => setCurrentObjectIndex(Math.max(0, currentObjectIndex - 1))}
                        disabled={currentObjectIndex === 0}
                      >
                        Previous
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className="bg-white/40 backdrop-blur-sm border border-stone-200/50 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-stone-700">Progress</span>
                    <span className="text-sm text-stone-600">
                      {currentObjectIndex + 1} of {detectedObjects.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${((currentObjectIndex + 1) / detectedObjects.length) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
