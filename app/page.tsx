"use client"

import { useState } from "react"
import { ChatGPTInterface } from "@/components/chatgpt-interface"
import { V0Interface } from "@/components/v0-interface"
import { AuthDialog } from "@/components/auth-dialog"
import { SessionProvider } from "@/components/session-provider"

export default function Home() {
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)

  return (
    <SessionProvider onSessionExpired={() => setShowAuthDialog(true)}>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {!hasStartedChat ? <ChatGPTInterface onStartChat={() => setHasStartedChat(true)} /> : <V0Interface />}

        <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      </div>
    </SessionProvider>
  )
}
