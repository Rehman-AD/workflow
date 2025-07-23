"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { Clock } from "lucide-react"
import { gradients } from "@/lib/constants/colors"

interface SessionContextType {
  timeRemaining: number
  isExpired: boolean
  isAuthenticated: boolean
  startWorkflowTimer: () => void
}

const SessionContext = createContext<SessionContextType>({
  timeRemaining: 300,
  isExpired: false,
  isAuthenticated: false,
  startWorkflowTimer: () => {},
})

interface SessionProviderProps {
  children: ReactNode
  onSessionExpired: () => void
}

export function SessionProvider({ children, onSessionExpired }: SessionProviderProps) {
  const [timeRemaining, setTimeRemaining] = useState(300)
  const [isExpired, setIsExpired] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token")
    if (authToken) {
      setIsAuthenticated(true)
      return
    }
  }, [])

  const startWorkflowTimer = () => {
    if (!timerStarted && !isAuthenticated && !isExpired) {
      setTimerStarted(true)
    }
  }

  useEffect(() => {
    if (!timerStarted || isAuthenticated || isExpired) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsExpired(true)
          onSessionExpired()
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerStarted, isAuthenticated, isExpired, onSessionExpired])

  const contextValue = {
    timeRemaining,
    isExpired,
    isAuthenticated,
    startWorkflowTimer,
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
      {timerStarted && !isAuthenticated && !isExpired && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: gradients.brand.primary }}
            >
              <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-xs sm:text-sm">Free Session Active</p>
              <p className="text-gray-400 text-xs">{formatTime(timeRemaining)} remaining</p>
            </div>
            <div className="w-10 sm:w-14 h-10 sm:h-14 relative">
              <svg className="w-10 sm:w-14 h-10 sm:h-14 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-700"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-400"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(timeRemaining / 300) * 100}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-400">{Math.round((timeRemaining / 300) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
