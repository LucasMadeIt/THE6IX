"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Lightbulb, Move, Clock, Smartphone, CheckCircle } from "lucide-react"

interface GuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const tips = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Camera Movement",
      description: "Move slowly and steadily around the space. Avoid quick movements or shaking.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Lighting",
      description: "Ensure good, even lighting throughout the room. Natural light works best.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: <Move className="w-6 h-6" />,
      title: "Coverage",
      description: "Capture all angles, corners, and important objects. Walk around the entire space.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Duration",
      description: "Record for 2-5 minutes for optimal 3D reconstruction quality.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Device Position",
      description: "Hold your device horizontally and keep it stable throughout recording.",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const examples = [
    {
      title: "Living Room",
      description: "Start from the entrance, slowly pan across furniture, capture corners and windows",
      quality: "Excellent",
    },
    {
      title: "Kitchen",
      description: "Focus on countertops, appliances, and dining areas with good lighting",
      quality: "Good",
    },
    {
      title: "Bedroom",
      description: "Capture bed, dresser, windows, and personal items with steady movement",
      quality: "Excellent",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-amber-50 to-orange-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-stone-800 flex items-center">
            <Camera className="w-6 h-6 mr-2 text-amber-600" />
            Recording Guide for Best Results
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tips Section */}
          <div>
            <h3 className="text-lg font-semibold text-stone-700 mb-4">Recording Tips</h3>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <Card key={index} className="bg-white/70 border-stone-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tip.color}`}>
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-800 mb-1">{tip.title}</h4>
                        <p className="text-sm text-stone-600">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Examples Section */}
          <div>
            <h3 className="text-lg font-semibold text-stone-700 mb-4">Example Recordings</h3>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <Card key={index} className="bg-white/70 border-stone-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-stone-800">{example.title}</h4>
                      <Badge
                        variant="outline"
                        className={`${
                          example.quality === "Excellent"
                            ? "border-green-200 text-green-700 bg-green-50"
                            : "border-blue-200 text-blue-700 bg-blue-50"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {example.quality}
                      </Badge>
                    </div>
                    <p className="text-sm text-stone-600">{example.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Best Practices */}
            <Card className="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Best Practices</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Start recording before entering the room</li>
                  <li>• Overlap your coverage areas by 30-50%</li>
                  <li>• Focus on objects you want to tag later</li>
                  <li>• Speak memories aloud while recording</li>
                  <li>• End with a wide shot of the entire space</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Requirements */}
        <Card className="bg-white/70 border-stone-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-stone-800 mb-3">Technical Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-stone-700">Video Format</h5>
                <p className="text-stone-600">MP4, MOV, or AVI</p>
              </div>
              <div>
                <h5 className="font-medium text-stone-700">Resolution</h5>
                <p className="text-stone-600">1080p or higher recommended</p>
              </div>
              <div>
                <h5 className="font-medium text-stone-700">File Size</h5>
                <p className="text-stone-600">Up to 500MB per video</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
