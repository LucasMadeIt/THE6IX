"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import {
  Camera,
  Home,
  Sun,
  Move,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Smartphone,
  RotateCw,
  Package,
} from "lucide-react"
import Link from "next/link"

export default function HowToRecordPage() {
  const roomTips = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Start at the Doorway",
      description: "Begin recording from the entrance to give context and natural flow",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <RotateCw className="w-6 h-6" />,
      title: "Walk Slowly in a Loop",
      description: "Move steadily around the room, capturing all four walls in one continuous motion",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Use Natural Light",
      description: "Film during daylight hours or ensure all room lights are on for even illumination",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Capture Key Objects",
      description: "Pause briefly on important items you want to tag later - photos, furniture, decorations",
      color: "bg-rose-100 text-rose-600",
    },
  ]

  const objectTips = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "360° Object Coverage",
      description: "Walk completely around the object to capture all angles and details",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <Move className="w-6 h-6" />,
      title: "Multiple Heights",
      description: "Film from different heights - eye level, slightly above, and below if possible",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Close-up Details",
      description: "Capture texture, patterns, and small details that make the object unique",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Take Your Time",
      description: "Spend 30-60 seconds per object for best 3D reconstruction quality",
      color: "bg-teal-100 text-teal-600",
    },
  ]

  const examples = [
    {
      title: "Living Room",
      description: "Start at entrance, pan across sofa and coffee table, capture windows and artwork",
      quality: "Excellent",
      duration: "3-4 minutes",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Kitchen",
      description: "Focus on countertops, appliances, and dining area with good overhead lighting",
      quality: "Good",
      duration: "2-3 minutes",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Vintage Clock",
      description: "360° rotation showing face, sides, and intricate details of mechanisms",
      quality: "Excellent",
      duration: "45 seconds",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const commonMistakes = [
    "Moving too quickly or shaking the camera",
    "Recording in dim lighting or with harsh shadows",
    "Missing corners or important areas of the room",
    "Recording vertically instead of horizontally",
    "Not overlapping coverage areas sufficiently",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-25 to-rose-50">
      <Navigation />

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            section classNatext-4xl md:text-6xl font-bold text-stone-800 mb-6 font-sans<h2 className="font-serif text-3xl font-bold text-stone-800 mb-4">Recording Rooms & Spaces</h2>
              <p className="text-stone-600">Perfect for bedrooms, kitchens, living rooms, and special spaces</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {roomTips.map((tip, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tip.color}`}>
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-lg font-bold text-stone-800 mb-2">{tip.title}</h4>
                        <p className="text-stone-600 text-sm leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Object Recording Tips */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-stone-800 mb-4">Recording Objects & Items</h2>
              <p className="text-stone-600">Perfect for treasured items, heirlooms, and special possessions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {objectTips.map((tip, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tip.color}`}>
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-lg font-bold text-stone-800 mb-2">{tip.title}</h4>
                        <p className="text-stone-600 text-sm leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Example Videos */}
          <section className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-stone-800 text-center mb-8">Example Recordings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {examples.map((example, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-2xl">
                      <img
                        src={example.image || "/placeholder.svg"}
                        alt={example.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-serif text-lg font-bold text-stone-800">{example.title}</h4>
                        <Badge
                          variant="outline"
                          className={`${
                            example.quality === "Excellent"
                              ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                              : "border-amber-200 text-amber-700 bg-amber-50"
                          }`}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {example.quality}
                        </Badge>
                      </div>
                      <p className="text-stone-600 text-sm mb-3 leading-relaxed">{example.description}</p>
                      <div className="flex items-center text-xs text-stone-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {example.duration}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Technical Guidelines */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-stone-800 mb-4 flex items-center">
                    <Smartphone className="w-5 h-5 mr-2 text-amber-600" />
                    Technical Requirements
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Resolution</span>
                      <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
                        1080p+ recommended
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Frame Rate</span>
                      <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">
                        30fps required
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Duration</span>
                      <Badge variant="outline" className="bg-rose-50 border-rose-200 text-rose-700">
                        1-3 minutes
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">File Size</span>
                      <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                        Max 500MB
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Orientation</span>
                      <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                        Horizontal only
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border border-stone-200/50 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-stone-800 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-rose-600" />
                    Common Mistakes to Avoid
                  </h3>
                  <div className="space-y-3">
                    {commonMistakes.map((mistake, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-stone-600 text-sm">{mistake}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-amber-100 via-rose-100 to-emerald-100 border border-stone-200/50 rounded-3xl">
              <CardContent className="p-12">
                <h3 className="font-serif text-2xl font-bold text-stone-800 mb-4">Ready to Create Your Memory Room?</h3>
                <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
                  Now that you know the secrets to perfect recording, it's time to capture your special spaces and
                  transform them into 3D memories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/upload">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 hover:from-amber-600 hover:via-rose-600 hover:to-emerald-600 text-white rounded-full px-8 py-3"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-3 bg-white/70 border-stone-300">
                      Back to Gallery
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
