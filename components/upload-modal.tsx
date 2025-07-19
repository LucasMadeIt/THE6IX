"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, Video, Camera, Sparkles, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (memory: { title: string; description: string; type: "room" | "object" }) => void
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<"room" | "object">("room")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setStep(2)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim()) return

    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    onUpload({ title, description, type })

    // Reset form
    setStep(1)
    setTitle("")
    setDescription("")
    setType("room")
    setUploadedFile(null)
    setIsProcessing(false)
  }

  const handleClose = () => {
    if (!isProcessing) {
      setStep(1)
      setTitle("")
      setDescription("")
      setType("room")
      setUploadedFile(null)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-stone-800 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-amber-600" />
            Create New Memory Space
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-stone-600 mb-6">
                Upload a video of a room or object to transform it into an immersive 3D memory space
              </p>
            </div>

            {/* Upload Area */}
            <Card className="border-2 border-dashed border-amber-300 bg-white/50">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-700 mb-2">Upload Your Video</h3>
                  <p className="text-stone-500 text-sm mb-4">Drag and drop your video file or click to browse</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      <span className="cursor-pointer">
                        <Video className="w-4 h-4 mr-2" />
                        Choose Video File
                      </span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <div className="bg-white/70 rounded-lg p-4 border border-stone-200">
              <h4 className="font-semibold text-stone-700 mb-2 flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Recording Tips
              </h4>
              <ul className="text-sm text-stone-600 space-y-1">
                <li>• Move slowly and steadily around the space</li>
                <li>• Ensure good lighting throughout the room</li>
                <li>• Capture all angles and corners</li>
                <li>• Keep the camera stable</li>
                <li>• Record for 2-5 minutes for best results</li>
              </ul>
            </div>
          </div>
        )}

        {step === 2 && !isProcessing && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-stone-600">Video uploaded successfully! Now let's add some details.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-stone-700 font-medium">
                  Memory Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Childhood Bedroom, Grandmother's Kitchen"
                  className="mt-1 bg-white/70 border-stone-200"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-stone-700 font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share what makes this space special..."
                  className="mt-1 bg-white/70 border-stone-200"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-stone-700 font-medium">Memory Type</Label>
                <RadioGroup value={type} onValueChange={(value: "room" | "object") => setType(value)} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="room" id="room" />
                    <Label htmlFor="room">Room or Space</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="object" id="object" />
                    <Label htmlFor="object">Object or Item</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-stone-200">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!title.trim()}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Create Memory Space
              </Button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-amber-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-stone-700 mb-2">Creating Your 3D Memory Space</h3>
            <p className="text-stone-600 text-sm mb-4">
              Our AI is processing your video and reconstructing it into a navigable 3D environment...
            </p>
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full animate-pulse"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-xs text-stone-500 mt-2">This usually takes 2-3 minutes</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
