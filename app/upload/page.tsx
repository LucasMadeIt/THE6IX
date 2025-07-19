"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Upload, Video, Clock, CheckCircle, ArrowRight, Camera, ImageIcon, X } from "lucide-react"
import Link from "next/link"

export default function UploadPage() {
  const [uploadStep, setUploadStep] = useState(1)
  const [roomTitle, setRoomTitle] = useState("")
  const [roomDescription, setRoomDescription] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setUploadStep(2)
    }
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeThumbnail = () => {
    setThumbnailFile(null)
    setThumbnailPreview(null)
  }

  const handleCreateRoom = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setUploadStep(3)
    setIsProcessing(false)
  }

  const triggerFileUpload = () => {
    document.getElementById("video-upload")?.click()
  }

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      <Navigation />

      {/* Decorative SVG Lines - Hidden on mobile */}
      <svg className="decorative-line top-40 right-20 w-28 h-28 hidden lg:block" viewBox="0 0 100 100">
        <path d="M10,30 Q50,10 90,30 Q70,70 30,90 Q10,50 10,30" />
      </svg>

      <div className="pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#43382F] mb-4 sm:mb-6 tracking-wide leading-tight">
              Create Your
              <br />
              <span className="italic">Memory Room</span>
            </h1>
            <p className="text-base sm:text-lg text-[#6B5B4F] max-w-2xl mx-auto leading-relaxed font-light px-4">
              Upload a 1-3 minute video of your special space and watch it transform into an immersive 3D gallery
            </p>
          </div>

          {uploadStep === 1 && (
            <div className="space-y-8 sm:space-y-12">
              {/* Upload Zone */}
              <Card className="bg-white border border-[#E4DCD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
                <CardContent className="p-8 sm:p-16">
                  <div className="text-center">
                    {/* Clickable Logo */}
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 cursor-pointer hover:bg-[#E4DCD0] smooth-transition hover:scale-105"
                      onClick={triggerFileUpload}
                    >
                      <img
                        src="/xperi3d-logo.png"
                        alt="XPERI3D Logo"
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                      />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#43382F] mb-3 sm:mb-4 tracking-wide">
                      Upload Your Video
                    </h3>
                    <p className="text-[#6B5B4F] mb-8 sm:mb-10 max-w-md mx-auto font-light leading-relaxed text-sm sm:text-base">
                      Choose a video file of your room or special space. We'll handle the magic of turning it into 3D.
                    </p>

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
                        size="lg"
                        className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-8 sm:px-10 py-3 sm:py-4 shadow-lg hover:shadow-xl smooth-transition font-medium tracking-wide w-full sm:w-auto"
                      >
                        <span className="cursor-pointer">
                          <Video className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Choose Video File
                        </span>
                      </Button>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements - Mobile Optimized */}
              <div className="grid grid-cols-1 gap-6 sm:gap-8">
                <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h4 className="font-serif text-lg font-semibold text-[#43382F] mb-4 sm:mb-6 flex items-center tracking-wide">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#8B745F]" />
                      Video Requirements
                    </h4>
                    <ul className="space-y-2 sm:space-y-3 text-sm text-[#6B5B4F] font-light">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        1-3 minutes duration
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        30fps frame rate
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        1080p resolution or higher
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        Max 500MB file size
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h4 className="font-serif text-lg font-semibold text-[#43382F] mb-4 sm:mb-6 flex items-center tracking-wide">
                      <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#8B745F]" />
                      Quick Tips
                    </h4>
                    <ul className="space-y-2 sm:space-y-3 text-sm text-[#6B5B4F] font-light">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        Move slowly and steadily
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        Capture all four walls
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        Good lighting is essential
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-[#8B745F] rounded-full mr-3 sm:mr-4"></div>
                        Start at the doorway
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Guide Link */}
              <div className="text-center">
                <p className="text-[#6B5B4F] mb-4 sm:mb-6 font-light text-sm sm:text-base">
                  Need help recording the perfect video?
                </p>
                <Link href="/how-to-record">
                  <Button
                    variant="outline"
                    className="rounded-full bg-white border-[#8B745F] text-[#8B745F] hover:bg-[#F0EBE5] px-6 sm:px-8 py-2 sm:py-3 smooth-transition font-medium tracking-wide w-full sm:w-auto"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    View Complete Recording Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {uploadStep === 2 && !isProcessing && (
            <Card className="bg-white border border-[#E4DCD0] rounded-2xl sm:rounded-3xl shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center mb-8 sm:mb-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B745F]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#43382F] mb-2 sm:mb-3 tracking-wide">
                    Video Uploaded Successfully
                  </h3>
                  <p className="text-[#6B5B4F] font-light text-sm sm:text-base">
                    Now let's add some details to make your memory room special
                  </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-[#43382F] mb-3 tracking-wide">Room Title</label>
                    <Input
                      value={roomTitle}
                      onChange={(e) => setRoomTitle(e.target.value)}
                      placeholder="e.g., Grandma's Kitchen, First Apartment..."
                      className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl py-3 sm:py-4 text-[#43382F] placeholder:text-[#8B745F]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#43382F] mb-3 tracking-wide">
                      Description (Optional)
                    </label>
                    <Textarea
                      value={roomDescription}
                      onChange={(e) => setRoomDescription(e.target.value)}
                      placeholder="Share what makes this space special to you..."
                      className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl resize-none py-3 sm:py-4 text-[#43382F] placeholder:text-[#8B745F]"
                      rows={4}
                    />
                  </div>

                  {/* Thumbnail Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-[#43382F] mb-3 tracking-wide">
                      Room Thumbnail (Optional)
                    </label>
                    {!thumbnailPreview ? (
                      <div className="border-2 border-dashed border-[#E4DCD0] rounded-xl p-6 text-center bg-[#F0EBE5]">
                        <ImageIcon className="w-8 h-8 text-[#8B745F] mx-auto mb-3" />
                        <p className="text-sm text-[#6B5B4F] mb-3">Upload a thumbnail image for your room</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label htmlFor="thumbnail-upload">
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
                    ) : (
                      <div className="relative">
                        <img
                          src={thumbnailPreview || "/placeholder.svg"}
                          alt="Room thumbnail"
                          className="w-full h-32 sm:h-40 object-cover rounded-xl"
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
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <Button
                      variant="outline"
                      onClick={() => setUploadStep(1)}
                      className="flex-1 rounded-xl bg-white border-[#8B745F] text-[#8B745F] hover:bg-[#F0EBE5] py-3 sm:py-4 smooth-transition font-medium tracking-wide"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleCreateRoom}
                      disabled={!roomTitle.trim()}
                      className="flex-1 bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl py-3 sm:py-4 smooth-transition font-medium tracking-wide"
                    >
                      Create Memory Room
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isProcessing && (
            <Card className="bg-white border border-[#E4DCD0] rounded-2xl sm:rounded-3xl shadow-lg">
              <CardContent className="p-12 sm:p-16 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-pulse">
                  <img
                    src="/xperi3d-logo.png"
                    alt="XPERI3D Logo"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain animate-spin"
                  />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#43382F] mb-4 sm:mb-6 tracking-wide">
                  Creating Your 3D Memory Room
                </h3>
                <p className="text-[#6B5B4F] mb-8 sm:mb-10 max-w-md mx-auto font-light leading-relaxed text-sm sm:text-base">
                  Our AI is analyzing your video and reconstructing it into a beautiful, navigable 3D space...
                </p>
                <div className="w-64 sm:w-80 h-1 bg-[#E4DCD0] rounded-full mx-auto">
                  <div
                    className="h-1 bg-[#8B745F] rounded-full animate-pulse smooth-transition"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-xs sm:text-sm text-[#8B745F] mt-4 sm:mt-6 font-light">
                  This usually takes 2-3 minutes
                </p>
              </CardContent>
            </Card>
          )}

          {uploadStep === 3 && (
            <Card className="bg-white border border-[#E4DCD0] rounded-2xl sm:rounded-3xl shadow-lg">
              <CardContent className="p-12 sm:p-16 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#8B745F]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#43382F] mb-4 sm:mb-6 tracking-wide">
                  Your Memory Room is Ready!
                </h3>
                <p className="text-[#6B5B4F] mb-8 sm:mb-10 max-w-md mx-auto font-light leading-relaxed text-sm sm:text-base">
                  {roomTitle} has been transformed into a beautiful 3D space. Ready to add your memories?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/my-memories">
                    <Button className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 smooth-transition font-medium tracking-wide w-full sm:w-auto">
                      View My Memories
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="rounded-full bg-white border-[#8B745F] text-[#8B745F] hover:bg-[#F0EBE5] px-6 sm:px-8 py-3 sm:py-4 smooth-transition font-medium tracking-wide w-full sm:w-auto"
                    >
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
