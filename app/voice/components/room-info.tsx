import type { Room } from "@/lib/room-manager"
import { Users, Wifi } from "lucide-react"

interface RoomInfoProps {
  room: Room | null
  isConnected: boolean
  themeColors?: {
    primary: string
    text: string
    secondaryText: string
    accent: string
  }
}

export function RoomInfo({ room, isConnected, themeColors }: RoomInfoProps) {
  if (!room) return null

  const defaultColors = {
    primary: '#1f2937',
    text: '#ffffff',
    secondaryText: '#9ca3af',
    accent: '#3b82f6'
  }

  const colors = themeColors || defaultColors

  return (
    <div 
      className="rounded-lg p-4 mb-6"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Users 
              className="h-5 w-5" 
              style={{ color: colors.accent }}
            />
            <span 
              className="font-medium"
              style={{ color: colors.text }}
            >
              Room {room.id.slice(-4)}
            </span>
          </div>
          <div 
            className="text-sm"
            style={{ color: colors.secondaryText }}
          >
            {room.userCount}/10 users
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Wifi 
            className="h-4 w-4" 
            style={{ color: isConnected ? '#10b981' : '#f59e0b' }}
          />
          <span 
            className="text-sm"
            style={{ color: isConnected ? '#10b981' : '#f59e0b' }}
          >
            {isConnected ? "Connected" : "Connecting"}
          </span>
        </div>
      </div>

      {/* Room Capacity Bar */}
      <div className="mt-3">
        <div 
          className="w-full rounded-full h-2"
          style={{ backgroundColor: colors.secondaryText }}
        >
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(room.userCount / 10) * 100}%`,
              backgroundColor: colors.accent
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
