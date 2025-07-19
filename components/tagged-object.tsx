"use client"

import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart } from "lucide-react"
import type * as THREE from "three"

interface TaggedObjectProps {
  position: [number, number, number]
  name: string
  description: string
  color: string
  scale?: [number, number, number]
}

export function TaggedObject({ position, name, description, color, scale = [1, 1, 1] }: TaggedObjectProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = hovered ? state.clock.elapsedTime * 0.5 : 0
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Floating Tag */}
      {hovered && (
        <Html position={[0, scale[1] + 0.5, 0]} center distanceFactor={10} occlude>
          <Card className="bg-white/95 backdrop-blur-sm border-amber-200 shadow-lg">
            <CardContent className="p-3 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
                  {name}
                </Badge>
                <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
                  <Heart className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-stone-600 mb-2">{description}</p>
              <Button
                size="sm"
                className="w-full text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                Add Memory
              </Button>
            </CardContent>
          </Card>
        </Html>
      )}

      {/* Glow Effect */}
      {hovered && (
        <mesh position={[0, 0, 0]} scale={[scale[0] * 1.2, scale[1] * 1.2, scale[2] * 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  )
}
