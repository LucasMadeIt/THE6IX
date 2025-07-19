"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  Camera,
  Clock,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Play,
  Smartphone,
  Video,
  Settings,
  Eye,
  Move,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function HowToRecordPage() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: "Prepare Your Space",
      icon: Settings,
      duration: "15 minutes",
      description: "Clean and organize your room for the best 3D reconstruction",
      tips: [
        "Remove clutter and unnecessary items",
        "Ensure good lighting throughout the room",
        "Open curtains or blinds for natural light",
        "Turn on all room lights for even illumination",
      ],
    },
    {
      id: 2,
      title: "Camera Setup",
      icon: Camera,
      duration: "1 minute",
      description: "Configure your device for optimal video quality",
      tips: [
        "Use landscape orientation (horizontal)",
        "Set video quality to 1080p or higher",
        "Enable image stabilization if available",
        "Clean your camera lens for clarity",
      ],
    },
    {
      id: 3,
      title: "Recording Technique",
      icon: Video,
      duration: "1-3 minutes",
      description: "Follow the proper recording pattern for best results",
      tips: [
        "Start at the room entrance/doorway",
        "Move slowly and steadily in a clockwise direction",
        "Keep the camera at chest height (4-5 feet)",
        "Overlap your shots by 30-50% for better stitching",
      ],
    },
    {
      id: 4,
      title: "Capture Everything",
      icon: Eye,
      duration: "Throughout recording",
      description: "Make sure to include all important details",
      tips: [
        "Film all four walls of the room",
        "Include the ceiling and floor in your shots",
        "Capture furniture and decorative items",
        "Don't forget corners and hidden areas",
      ],
    },
  ]

  const commonMistakes = [
    {
      mistake: "Moving too quickly",
      solution: "Take your time - slow, steady movements work best",
      icon: Move,
    },
    {
      mistake: "Poor lighting conditions",
      solution: "Record during daytime with all lights on",
      icon: Lightbulb,
    },
    {
      mistake: "Shaky footage",
      solution: "Use both hands and move smoothly",
      icon: Smartphone,
    },
    {
      mistake: "Missing areas",
      solution: "Follow a systematic pattern around the room",
      icon: Eye,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      <Navigation />

      <div className="pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#43382F] mb-4 sm:mb-6 tracking-wide leading-tight">
              How to Record
              <br />
              <span className="italic">Perfect Videos</span>
            </h1>
            <p className="text-base sm:text-lg text-[#6B5B4F] max-w-2xl mx-auto leading-relaxed font-light px-4">
              Follow our step-by-step guide to capture your space perfectly for 3D reconstruction
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-[#8B745F]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-2">1-3 Minutes</h3>
                <p className="text-sm text-[#6B5B4F] font-light">Recording Duration</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6 text-[#8B745F]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-2">1080p+</h3>
                <p className="text-sm text-[#6B5B4F] font-light">Minimum Quality</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-[#8B745F]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-2">30 Min</h3>
                <p className="text-sm text-[#6B5B4F] font-light">Processing Time</p>
              </CardContent>
            </Card>
          </div>

          {/* Step-by-Step Guide */}
          <div className="mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#43382F] mb-8 sm:mb-12 text-center tracking-wide">
              Step-by-Step Guide
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Steps Navigation */}
              <div className="space-y-4">
                {steps.map((step) => (
                  <Card
                    key={step.id}
                    className={`cursor-pointer transition-all duration-300 border ${
                      activeStep === step.id
                        ? "bg-[#F0EBE5] border-[#8B745F] shadow-md"
                        : "bg-white border-[#E4DCD0] hover:border-[#D4C4B0]"
                    } rounded-xl sm:rounded-2xl`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            activeStep === step.id ? "bg-[#8B745F]" : "bg-[#F0EBE5]"
                          }`}
                        >
                          <step.icon
                            className={`w-6 h-6 ${activeStep === step.id ? "text-white" : "text-[#8B745F]"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3
                              className={`font-serif text-lg font-semibold tracking-wide ${
                                activeStep === step.id ? "text-[#43382F]" : "text-[#6B5B4F]"
                              }`}
                            >
                              {step.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                activeStep === step.id
                                  ? "border-[#8B745F] text-[#8B745F] bg-white"
                                  : "border-[#D4C4B0] text-[#8B745F] bg-[#F0EBE5]"
                              }`}
                            >
                              {step.duration}
                            </Badge>
                          </div>
                          <p
                            className={`text-sm font-light leading-relaxed ${
                              activeStep === step.id ? "text-[#43382F]" : "text-[#8B745F]"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Step Details */}
              <div className="lg:sticky lg:top-24">
                <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-[#8B745F] rounded-full flex items-center justify-center">
                        {React.createElement(steps[activeStep - 1].icon, {
                          className: "w-8 h-8 text-white",
                        })}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-[#43382F] tracking-wide">
                          {steps[activeStep - 1].title}
                        </h3>
                        <p className="text-[#6B5B4F] font-light">{steps[activeStep - 1].description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-[#43382F] mb-4">Key Tips:</h4>
                      {steps[activeStep - 1].tips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#8B745F] mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-[#6B5B4F] font-light leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                        disabled={activeStep === 1}
                        className="flex-1 bg-white border-[#E4DCD0] text-[#8B745F] hover:bg-[#F0EBE5] rounded-xl"
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
                        disabled={activeStep === 4}
                        className="flex-1 bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#43382F] mb-8 sm:mb-12 text-center tracking-wide">
              Common Mistakes to Avoid
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {commonMistakes.map((item, index) => (
                <Card key={index} className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-lg font-semibold text-[#43382F] mb-2 tracking-wide">
                          {item.mistake}
                        </h4>
                        <p className="text-sm text-[#6B5B4F] font-light leading-relaxed mb-3">
                          <span className="font-medium text-[#8B745F]">Solution:</span> {item.solution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Video Example Placeholder */}
          <div className="mb-12 sm:mb-16">
            <Card className="bg-white border border-[#E4DCD0] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-[#F0EBE5] to-[#E4DCD0] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Play className="w-10 h-10 text-[#8B745F]" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#43382F] mb-2 tracking-wide">
                      Example Recording
                    </h3>
                    <p className="text-[#6B5B4F] font-light">
                      Watch how to properly record your room for 3D reconstruction
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ready to Start */}
          <div className="text-center">
            <Card className="bg-white border border-[#E4DCD0] rounded-2xl sm:rounded-3xl shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="w-16 h-16 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-[#8B745F]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#43382F] mb-4 tracking-wide">
                  Ready to Create Your Memory Room?
                </h3>
                <p className="text-[#6B5B4F] mb-8 max-w-md mx-auto font-light leading-relaxed">
                  Now that you know the techniques, start recording your special space and transform it into a 3D
                  memory.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/upload">
                    <Button className="bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-full px-8 py-4 smooth-transition font-medium tracking-wide w-full sm:w-auto">
                      Start Recording
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/my-memories">
                    <Button
                      variant="outline"
                      className="rounded-full bg-white border-[#8B745F] text-[#8B745F] hover:bg-[#F0EBE5] px-8 py-4 smooth-transition font-medium tracking-wide w-full sm:w-auto"
                    >
                      View My Memories
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
