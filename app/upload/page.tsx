"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/navigation";
import {
    Upload,
    Camera,
    Clock,
    Lightbulb,
    CheckCircle,
    ArrowRight,
    Smartphone,
    Video,
    Settings,
    Eye,
    Move,
    Zap,
    FileVideo,
    X,
} from "lucide-react";
import React from "react";

export default function UploadPage() {
    const [activeStep, setActiveStep] = useState(1);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
    const [roomTitle, setRoomTitle] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const imgRef = useRef<HTMLVideoElement>(null);

    const steps = [
        {
            id: 1,
            title: "Prepare Your Space",
            icon: Settings,
            duration: "15 minutes",
            description:
                "Clean and organize your room for the best 3D reconstruction",
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
    ];

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
    ];

    const generateVideoThumbnail = (file: File) => {
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        video.addEventListener("loadedmetadata", () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.currentTime = 1; // Get frame at 1 second
        });

        video.addEventListener("seeked", () => {
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.8);
                setVideoThumbnail(thumbnailDataUrl);
            }
        });

        video.src = URL.createObjectURL(file);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            generateVideoThumbnail(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith("video/")) {
            setUploadedFile(file);
            generateVideoThumbnail(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async () => {
        if (!uploadedFile || !videoThumbnail) return;

        setIsProcessing(true);
        setUploadProgress(1);

        // Convert base64 thumbnail string to Blob
        function base64ToBlob(base64: string, mime = "image/jpeg") {
            const byteString = atob(base64.split(",")[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mime });
        }

        try {
            // Prepare thumbnail form data
            const thumbnailBlob = base64ToBlob(videoThumbnail);
            const thumbnailFile = new File([thumbnailBlob], "thumbnail.jpg", {
                type: "image/jpeg",
            });
            const depthFormData = new FormData();
            depthFormData.append("image", thumbnailFile); // matches Flask /api/getdepth expects 'image'

            // Send thumbnail to /api/getdepth (expect GIF file back)
            const depthResponse = await fetch(
                "https://9d911d614f9f.ngrok-free.app/api/getdepth",
                {
                    method: "POST",
                    body: depthFormData,
                }
            );
            if (!depthResponse.ok)
                throw new Error(`Depth API error: ${depthResponse.status}`);
            const depthGifBlob = await depthResponse.blob();
            const depthGifUrl = URL.createObjectURL(depthGifBlob);
            console.log("Depth GIF URL:", depthGifUrl);

          
            // You can set this URL in state to show the GIF preview

            // Prepare video form data
            const videoFormData = new FormData();
            videoFormData.append("video", uploadedFile); // matches Flask /api/describe expects 'video'

            // Send video to /api/describe (expect JSON response)
            const describeResponse = await fetch(
                "https://9d911d614f9f.ngrok-free.app/api/describe",
                {
                    method: "POST",
                    body: videoFormData,
                }
            );

            if (!describeResponse.ok)
                throw new Error(
                    `Describe API error: ${describeResponse.status}`
                );
            const describeJson = await describeResponse.json();
            console.log("Description:", describeJson.answer);

            
            // Do whatever you want with depthGifUrl and describeJson.answer here
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setIsProcessing(false);
            setUploadProgress(0);
        }
    };

    // const newMemory = {
    //     id: "2", // or generate dynamically
    //     title: roomTitle || "Untitled Room",
    //     description: describeJson.answer || "No description available",
    //     thumbnail: depthGifUrl, // the GIF URL you got from depth API
    //     objectCount: 8, // example static number or calculate dynamically
    //     memories: 6, // example static or dynamic count
    //     contributors: ["You", "Roommate"], // example contributors
    //     lastVisited: "3 days ago", // example or dynamic date
    //     createdAt: new Date().toISOString().split("T")[0], // current date in YYYY-MM-DD
    //     tags: ["independence", "movies", "friends", "growth"], // example tags
    //     processing: false, // or true if still processing
    // };

    return (
        <div className="min-h-screen bg-[#F5F1ED]">
            <Navigation />

            <div className="pt-20 pb-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#43382F] mb-4 sm:mb-6 tracking-wide leading-tight italic">
                            Create Your
                            <br />
                            <span className="italic">Memory Room</span>
                        </h1>
                        <p className="text-base sm:text-lg text-[#6B5B4F] max-w-2xl mx-auto leading-relaxed font-light px-4">
                            Follow our guide to record the perfect video, then
                            upload it to create your 3D memory gallery
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
                        <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-6 h-6 text-[#8B745F]" />
                                </div>
                                <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-2">
                                    1-3 Minutes
                                </h3>
                                <p className="text-sm text-[#6B5B4F] font-light">
                                    Recording Duration
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Video className="w-6 h-6 text-[#8B745F]" />
                                </div>
                                <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-2">
                                    1080p+
                                </h3>
                                <p className="text-sm text-[#6B5B4F] font-light">
                                    Minimum Quality
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border border-[#E4DCD0] rounded-xl sm:rounded-2xl shadow-sm">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-[#F0EBE5] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-6 h-6 text-[#8B745F]" />
                                </div>
                                <h3 className="font-serif text-lg font-semibold text-[#43382F] mb-2">
                                    30 Min
                                </h3>
                                <p className="text-sm text-[#6B5B4F] font-light">
                                    Processing Time
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Recording Guide */}
                        <div>
                            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#43382F] mb-8 tracking-wide">
                                Recording Guide
                            </h2>

                            {/* Steps Navigation */}
                            <div className="space-y-4 mb-8">
                                {steps.map((step) => (
                                    <Card
                                        key={step.id}
                                        className={`cursor-pointer transition-all duration-300 border ${
                                            activeStep === step.id
                                                ? "bg-[#F0EBE5] border-[#8B745F] shadow-md"
                                                : "bg-white border-[#E4DCD0] hover:border-[#D4C4B0]"
                                        } rounded-xl`}
                                        onClick={() => setActiveStep(step.id)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start space-x-3">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                        activeStep === step.id
                                                            ? "bg-[#8B745F]"
                                                            : "bg-[#F0EBE5]"
                                                    }`}
                                                >
                                                    <step.icon
                                                        className={`w-5 h-5 ${
                                                            activeStep ===
                                                            step.id
                                                                ? "text-white"
                                                                : "text-[#8B745F]"
                                                        }`}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h3
                                                            className={`font-serif text-base font-semibold tracking-wide ${
                                                                activeStep ===
                                                                step.id
                                                                    ? "text-[#43382F]"
                                                                    : "text-[#6B5B4F]"
                                                            }`}
                                                        >
                                                            {step.title}
                                                        </h3>
                                                        <Badge
                                                            variant="outline"
                                                            className={`text-xs ${
                                                                activeStep ===
                                                                step.id
                                                                    ? "border-[#8B745F] text-[#8B745F] bg-white"
                                                                    : "border-[#D4C4B0] text-[#8B745F] bg-[#F0EBE5]"
                                                            }`}
                                                        >
                                                            {step.duration}
                                                        </Badge>
                                                    </div>
                                                    <p
                                                        className={`text-sm font-light leading-relaxed ${
                                                            activeStep ===
                                                            step.id
                                                                ? "text-[#43382F]"
                                                                : "text-[#8B745F]"
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
                            <Card className="bg-white border border-[#E4DCD0] rounded-xl shadow-lg mb-8">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-[#8B745F] rounded-full flex items-center justify-center">
                                            {React.createElement(
                                                steps[activeStep - 1].icon,
                                                {
                                                    className:
                                                        "w-6 h-6 text-white",
                                                }
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-lg font-semibold text-[#43382F] tracking-wide">
                                                {steps[activeStep - 1].title}
                                            </h3>
                                            <p className="text-[#6B5B4F] font-light text-sm">
                                                {
                                                    steps[activeStep - 1]
                                                        .description
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-medium text-[#43382F] mb-3">
                                            Key Tips:
                                        </h4>
                                        {steps[activeStep - 1].tips.map(
                                            (tip, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start space-x-2"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-[#8B745F] mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-[#6B5B4F] font-light leading-relaxed">
                                                        {tip}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <div className="flex gap-2 mt-6">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setActiveStep(
                                                    Math.max(1, activeStep - 1)
                                                )
                                            }
                                            disabled={activeStep === 1}
                                            size="sm"
                                            className="flex-1 bg-white border-[#E4DCD0] text-[#8B745F] hover:bg-[#F0EBE5] rounded-xl"
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setActiveStep(
                                                    Math.min(4, activeStep + 1)
                                                )
                                            }
                                            disabled={activeStep === 4}
                                            size="sm"
                                            className="flex-1 bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl"
                                        >
                                            Next Step
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Example Video */}
                            <Card className="bg-white border border-[#E4DCD0] rounded-xl shadow-lg mb-8">
                                <CardContent className="p-0">
                                    <div className="aspect-video bg-gradient-to-br from-[#F0EBE5] to-[#E4DCD0] flex items-center justify-center rounded-xl overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/jmdTfm3WX68"
                                            title="How to Record Perfect Videos"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="rounded-xl"
                                        ></iframe>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Common Mistakes */}
                            <div className="mb-8">
                                <h3 className="font-serif text-xl font-semibold text-[#43382F] mb-6 tracking-wide">
                                    Common Mistakes to Avoid
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {commonMistakes.map((item, index) => (
                                        <Card
                                            key={index}
                                            className="bg-white border border-[#E4DCD0] rounded-xl shadow-sm"
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                                                        <item.icon className="w-5 h-5 text-red-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-serif text-base font-semibold text-[#43382F] mb-1 tracking-wide">
                                                            {item.mistake}
                                                        </h4>
                                                        <p className="text-sm text-[#6B5B4F] font-light leading-relaxed">
                                                            <span className="font-medium text-[#8B745F]">
                                                                Solution:
                                                            </span>{" "}
                                                            {item.solution}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Upload Form */}
                        <div className="lg:sticky lg:top-24 lg:h-fit">
                            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#43382F] mb-8 tracking-wide">
                                Upload Your Video
                            </h2>

                            <Card className="bg-white border border-[#E4DCD0] rounded-xl shadow-lg">
                                <CardContent className="p-8">
                                    {!isProcessing ? (
                                        <div className="space-y-6">
                                            {/* Video Upload */}
                                            <div>
                                                <label className="block text-sm font-medium text-[#43382F] mb-3">
                                                    Video File
                                                </label>
                                                {!uploadedFile ? (
                                                    <div
                                                        className="border-2 border-dashed border-[#E4DCD0] rounded-xl p-8 text-center bg-[#F0EBE5] cursor-pointer hover:border-[#8B745F] transition-colors"
                                                        onDrop={handleDrop}
                                                        onDragOver={
                                                            handleDragOver
                                                        }
                                                    >
                                                        <FileVideo className="w-12 h-12 text-[#8B745F] mx-auto mb-4" />
                                                        <p className="text-[#6B5B4F] mb-4">
                                                            Drag and drop your
                                                            video here, or click
                                                            to browse
                                                        </p>
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={
                                                                handleFileUpload
                                                            }
                                                            className="hidden"
                                                            id="video-upload"
                                                        />
                                                        <label htmlFor="video-upload">
                                                            <Button
                                                                asChild
                                                                variant="outline"
                                                                className="rounded-full bg-white border-[#8B745F] text-[#8B745F] hover:bg-[#F0EBE5]"
                                                            >
                                                                <span className="cursor-pointer">
                                                                    <Upload className="w-4 h-4 mr-2" />
                                                                    Choose Video
                                                                    File
                                                                </span>
                                                            </Button>
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="bg-[#F0EBE5] rounded-xl p-4 flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <FileVideo className="w-8 h-8 text-[#8B745F]" />
                                                                <div>
                                                                    <p className="font-medium text-[#43382F]">
                                                                        {
                                                                            uploadedFile.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-[#6B5B4F]">
                                                                        {(
                                                                            uploadedFile.size /
                                                                            (1024 *
                                                                                1024)
                                                                        ).toFixed(
                                                                            2
                                                                        )}{" "}
                                                                        MB
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    setUploadedFile(
                                                                        null
                                                                    );
                                                                    setVideoThumbnail(
                                                                        null
                                                                    );
                                                                }}
                                                                className="text-red-500 hover:bg-red-50"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        </div>

                                                        {/* Video Thumbnail Preview */}
                                                        {videoThumbnail && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-[#43382F] mb-2">
                                                                    Video
                                                                    Preview
                                                                </label>
                                                                <div className="relative">
                                                                    <img
                                                                        src={
                                                                            videoThumbnail ||
                                                                            "/placeholder.svg"
                                                                        }
                                                                        alt="Video thumbnail"
                                                                        ref={
                                                                            imgRef
                                                                        }
                                                                        className="w-full h-32 object-cover rounded-xl"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                                                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                                                            <Video className="w-6 h-6 text-[#8B745F]" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Room Details */}
                                            <div>
                                                <label className="block text-sm font-medium text-[#43382F] mb-2">
                                                    Room Title
                                                </label>
                                                <Input
                                                    value={roomTitle}
                                                    onChange={(e) =>
                                                        setRoomTitle(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g., Grandma's Kitchen"
                                                    className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F]"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-[#43382F] mb-2">
                                                    Description
                                                </label>
                                                <Textarea
                                                    value={roomDescription}
                                                    onChange={(e) =>
                                                        setRoomDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Describe the memories and stories this room holds..."
                                                    className="bg-[#F0EBE5] border-[#E4DCD0] rounded-xl text-[#43382F] resize-none"
                                                    rows={3}
                                                />
                                            </div>

                                            <Button
                                                onClick={handleSubmit}
                                                disabled={
                                                    !uploadedFile || !roomTitle
                                                }
                                                className="w-full bg-[#8B745F] hover:bg-[#6B5B4F] text-white rounded-xl py-4 font-medium tracking-wide"
                                                size="lg"
                                            >
                                                Create Memory Room
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <img
                                                    src="/funny-processing.gif"
                                                    alt="Processing animation"
                                                    className="w-full h-full object-contain rounded-full"
                                                />
                                            </div>
                                            <h3 className="font-serif text-xl font-semibold text-[#43382F] mb-4 tracking-wide">
                                                Creating Your Memory Room
                                            </h3>
                                            <p className="text-[#6B5B4F] mb-6 font-light">
                                                We're processing your video and
                                                transforming it into a 3D memory
                                                gallery...
                                            </p>
                                            <Progress
                                                value={uploadProgress}
                                                className="w-full mb-4"
                                            />
                                            <p className="text-sm text-[#8B745F]">
                                                {uploadProgress}% complete -
                                                This might take a while!
                                            </p>
                                            <p className="text-xs text-[#6B5B4F] mt-2">
                                                Our AI is working hard to
                                                reconstruct your space in 3D.
                                                Feel free to grab a coffee! ☕
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
