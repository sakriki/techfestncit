import type { User } from "@/lib/room-manager"
import { useMemo } from "react"

interface UserAvatarProps {
  user: User
  isCurrentUser?: boolean
  isSpeaking?: boolean
  localAudioLevel?: number // 0-1, only for current user
  themeColors?: {
    primary: string
    text: string
    secondaryText: string
    accent: string
  }
}

export function UserAvatar({ user, isCurrentUser = false, isSpeaking = false, localAudioLevel, themeColors }: UserAvatarProps) {
  const defaultColors = {
    primary: '#1f2937',
    text: '#ffffff',
    secondaryText: '#9ca3af',
    accent: '#3b82f6'
  }

  const colors = themeColors || defaultColors
  // Extract last 4 digits from anonymousId (e.g., "User#1234" -> "1234")
  const displayId = user.anonymousId.split("#")[1] || user.anonymousId.slice(-4)

  // Music-video style: 24 bars in a perfect circle
  const bars = useMemo(() => Array.from({ length: 24 }), [])

  return (
    <div className="relative flex flex-col items-center space-y-2">
      {/* Music Video Style Audio Visualizer */}
      {isSpeaking && (
        <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-[70%] flex items-center justify-center pointer-events-none select-none">
          <svg width="96" height="96" viewBox="0 0 96 96" className="block">
            {bars.map((_, i) => {
              const angle = (i / bars.length) * 2 * Math.PI
              const r1 = 36 // larger inner radius
              const barMin = 5
              const barMax = 10 // larger bar
              const delay = (i / bars.length) * 1.2
              const cx = 50
              const cy = 48
              let dynamicHeight = barMax
              if (isCurrentUser && typeof localAudioLevel === 'number') {
                const wave = Math.sin(angle + (localAudioLevel * Math.PI * 2))
                dynamicHeight = barMin + (barMax - barMin) * (0.5 + 0.5 * wave * localAudioLevel)
              } else {
                dynamicHeight = barMin + (barMax - barMin) * 0.5
              }
              return (
                <rect
                  key={i}
                  x={cx + (r1 - barMin / 2) * Math.cos(angle) - 1.5}
                  y={cy + (r1 - barMin / 2) * Math.sin(angle) - dynamicHeight}
                  width={3}
                  height={dynamicHeight}
                  rx={1.5}
                  fill={`url(#gafadi-gradient)`}
                  opacity={0.85}
                  style={{
                    transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                    transformOrigin: `${cx + (r1) * Math.cos(angle)}px ${cy + (r1) * Math.sin(angle)}px`,
                    animation: !isCurrentUser ? `barWave 1.2s -${delay}s infinite ease-in-out` : undefined,
                  }}
                  className="audio-bar"
                />
              )
            })}
            <defs>
              <linearGradient id="gafadi-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFD600" />
                <stop offset="100%" stopColor="#7B002C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Avatar Circle */}
      <div
        className={`
          relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg
          transition-all duration-200 ease-in-out
          ${isSpeaking ? "ring-2 ring-opacity-40 shadow-md" : ""}
        `}
        style={{
          backgroundColor: isCurrentUser 
            ? (user.active ? colors.accent : colors.secondaryText)
            : (user.active ? colors.primary : colors.secondaryText),
          color: colors.text,
          boxShadow: isSpeaking ? `0 4px 20px ${colors.accent}30` : undefined,
          borderColor: isSpeaking ? colors.accent : undefined
        }}
      >
        {displayId}
      </div>

      {/* User Label */}
      <div className="text-center">
        <div 
          className="text-sm"
          style={{ color: user.active ? colors.text : colors.secondaryText }}
        >
          {isCurrentUser ? "You" : `User ${displayId}`}
        </div>
        {isSpeaking && (
          <div 
            className="text-xs font-medium animate-pulse"
            style={{ color: '#10b981' }}
          >
            Speaking...
          </div>
        )}
        {!isSpeaking && !user.active && (
          <div 
            className="text-xs font-medium"
            style={{ color: colors.secondaryText }}
          >
            Away
          </div>
        )}
      </div>

      {/* Glow effect when speaking */}
      {isSpeaking && (
        <div 
          className="absolute inset-0 rounded-full opacity-10 blur-md animate-none"
          style={{ backgroundColor: colors.accent }}
        ></div>
      )}
    </div>
  )
}

// Add this style block for the animation
<style jsx global>{`
@keyframes barWave {
  0%, 100% { height: 5px; }
  50% { height: 12px; }
}
.audio-bar {
  transform-box: fill-box;
  transform-origin: center bottom;
}
`}</style>
