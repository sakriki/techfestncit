"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff, PhoneOff } from "lucide-react"

interface VoiceControlsProps {
  isMuted: boolean
  onToggleMute: () => void
  onLeaveRoom: () => void
  isConnected: boolean
  connectedPeers: number
  themeColors?: {
    primary: string
    text: string
    secondaryText: string
    accent: string
  }
}

export function VoiceControls({ isMuted, onToggleMute, onLeaveRoom, isConnected, connectedPeers, themeColors }: VoiceControlsProps) {
  const defaultColors = {
    primary: '#1f2937',
    text: '#ffffff',
    secondaryText: '#9ca3af',
    accent: '#3b82f6'
  }

  const colors = themeColors || defaultColors

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Connection Status */}
      <div className="text-center">
        <div 
          className="text-sm font-medium"
          style={{ color: isConnected ? '#10b981' : '#f59e0b' }}
        >
          {isConnected ? "Connected" : "Connecting..."}
        </div>
        <div 
          className="text-xs"
          style={{ color: colors.secondaryText }}
        >
          {connectedPeers} peer{connectedPeers !== 1 ? "s" : ""} connected
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-4">
        {/* Mute/Unmute Button */}
        <Button
          onClick={onToggleMute}
          variant={isMuted ? "destructive" : "default"}
          size="lg"
          className={`
            w-14 h-14 rounded-full transition-all duration-200
            ${
              isMuted
                ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30"
                : "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30"
            }
          `}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {/* Leave Room Button */}
        <Button
          onClick={onLeaveRoom}
          variant="destructive"
          size="lg"
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30"
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>

      {/* Control Labels */}
      <div 
        className="flex items-center space-x-8 text-xs"
        style={{ color: colors.secondaryText }}
      >
        <span>{isMuted ? "Unmute" : "Mute"}</span>
        <span>Leave</span>
      </div>
    </div>
  )
}
