"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Mic, Sparkles } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface MemorySpace {
  id: string
  title: string
  description: string
  tags: string[]
  memories: string[]
}

interface AIConversationProps {
  memory: MemorySpace
}

export function AIConversation({ memory }: AIConversationProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Welcome to your ${memory.title}! I can see you've tagged some interesting objects here. What's your fondest memory in this space?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string) => {
    try {
      const context = `You are an AI memory assistant helping users explore their 3D memory space: "${memory.title}". 
      The space contains these tagged objects: ${memory.tags.join(", ")}.
      Description: ${memory.description}
      
      Your role is to:
      1. Ask thoughtful, emotional questions about memories
      2. Help users recall specific details
      3. Suggest memory completion prompts
      4. Be warm, nostalgic, and encouraging
      5. Focus on storytelling and emotional connections
      
      User just said: "${userMessage}"
      
      Respond in a warm, conversational way that encourages them to share more memories.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: context,
        maxTokens: 150,
      })

      return text
    } catch (error) {
      return "I'd love to hear more about your memories in this space. What story would you like to share?"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputValue)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedPrompts = [
    "Tell me about the teddy bear",
    "Who gave you this item?",
    "What's your earliest memory here?",
    "Who else spent time in this space?",
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-stone-200 bg-white/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-800">Memory Assistant</h3>
            <p className="text-xs text-stone-600">Helping you capture memories</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback
                  className={
                    message.type === "user"
                      ? "bg-stone-200 text-stone-700"
                      : "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                  }
                >
                  {message.type === "user" ? "You" : <Sparkles className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              <Card
                className={`${
                  message.type === "user"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                    : "bg-white border-stone-200"
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.type === "user" ? "text-amber-100" : "text-stone-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white border-stone-200">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 2 && (
        <div className="p-4 border-t border-stone-200 bg-white/50">
          <p className="text-xs text-stone-600 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                size="sm"
                className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                onClick={() => setInputValue(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-stone-200 bg-white/80">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share a memory or ask about this space..."
              className="pr-12 bg-white/70 border-stone-200"
              disabled={isLoading}
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
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full w-10 h-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
