import { MessageReactions } from "./message-reactions"
import { censorProfanity } from "@/lib/utils"
import { profaneWords } from "@/lib/profanity-config"

interface MessageBubbleProps {
  message: {
    id: string
    text: string
    sender: string
    timestamp: any
    isAdmin?: boolean
    reactions?: { [emoji: string]: string[] }
  }
  isCurrentUser: boolean
  currentUserId: string
  onAddReaction: (messageId: string, emoji: string) => void
  themeColors: {
    messageBackground: string
    userMessageBackground: string
    text: string
    secondaryText: string
    secondary: string
    accent: string
  }
}

export function MessageBubble({
  message,
  isCurrentUser,
  currentUserId,
  onAddReaction,
  themeColors,
}: MessageBubbleProps) {
  const formatTime = (timestamp: any) => {
    if (!timestamp) return "now"

    if (typeof timestamp === "number") {
      // For more concise timestamps
      const date = new Date(timestamp)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    if (timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return "now"
  }

  const handleAddReaction = (emoji: string) => {
    onAddReaction(message.id, emoji)
  }

  return (
    <div
      className={`max-w-[80%] py-1.5 px-2.5 rounded-lg text-sm break-words animate-in slide-in-from-bottom-2 ${
        isCurrentUser ? "ml-auto" : message.isAdmin ? "mx-auto text-center" : "mr-auto"
      }`}
      style={{
        backgroundColor: isCurrentUser
          ? themeColors.userMessageBackground
          : message.isAdmin
            ? "transparent"
            : themeColors.messageBackground,
        color: themeColors.text,
      }}
    >
      {message.isAdmin && <p className="font-bold mb-0.5 text-xs">ADMIN SAKSHAM</p>}
      {/* Profanity filter only for non-admin messages */}
      <p className="whitespace-pre-wrap leading-tight">
        {message.isAdmin
          ? message.text
          : censorProfanity(message.text, profaneWords)}
      </p>
      <div className="flex justify-between items-center mt-0.5">
        {/* Message Reactions - Compact */}
        {!message.isAdmin && Object.keys(message.reactions || {}).length > 0 && (
          <MessageReactions
            reactions={message.reactions || {}}
            currentUserId={currentUserId}
            onAddReaction={handleAddReaction}
            themeColors={{
              secondary: themeColors.secondary,
              text: themeColors.text,
              accent: themeColors.accent,
            }}
          />
        )}

        <span className="text-xs opacity-70 ml-auto" style={{ color: themeColors.secondaryText }}>
          {message.isAdmin ? "ADMIN" : formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}
