"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Loader2, Sparkles, MessageSquare, User, Bot } from "lucide-react"
import { GenerationPanel } from "@/components/generation-panel"
import { useSession } from "@/components/session-provider"
import { gradients } from "@/lib/constants/colors"
// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Search, Mic } from "lucide-react"

export function V0Interface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
  })
  const { startWorkflowTimer } = useSession()
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [hasSentInitial, setHasSentInitial] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [searchMode, setSearchMode] = useState(false)
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    if (!hasSentInitial && messages.length === 0) {
      setHasSentInitial(true)
      append({ role: "user", content: "Hello!" })
    }
  }, [hasSentInitial, messages.length, append])

  useEffect(() => {
    if (transcript && listening === false) {
      handleInputChange({ target: { value: transcript } } as React.ChangeEvent<HTMLInputElement>)
    }
  }, [transcript, listening])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      if (f.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(f))
      } else {
        setFilePreview(null)
      }
    }
  }

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault()
    startWorkflowTimer()
    if (file) {
      const attachment = Object.assign(file, { url: filePreview || URL.createObjectURL(file) })
      await append({ role: "user", content: input || "[File attached]" }, { experimental_attachments: [attachment] })
      setFile(null)
      setFilePreview(null)
    } else {
      handleSubmit(e)
    }
  }

  const onSearch = () => {
    setSearchMode((prev) => !prev)
    // Placeholder: implement search logic or modal here
  }

  const onMicClick = () => {
    if (!browserSupportsSpeechRecognition) return
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: false })
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: gradients.background.main }}>
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Left Panel - Chat */}
      <div className="w-full lg:w-1/2 bg-gray-900/40 backdrop-blur-sm border-r border-gray-800/40 flex flex-col relative z-10">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-800/40 bg-gray-900/20 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: gradients.brand.primary }}
            >
              <MessageSquare className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Conversation</h1>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 custom-scrollbar">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-12 sm:mt-20">
              <div
                className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-3xl flex items-center justify-center backdrop-blur-sm"
                style={{ background: gradients.background.overlay }}
              >
                <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-blue-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Ready to Create Magic?</h2>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-md mx-auto px-4">
                Describe your workflow idea and watch it transform into reality
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}
                  style={{
                    background: message.role === "user" ? gradients.suggestions.code : gradients.suggestions.ai,
                  }}
                >
                  {message.role === "user" ? (
                    <User className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  ) : (
                    <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-xl backdrop-blur-sm ${
                    message.role === "user" ? "text-white" : "bg-gray-800/40 text-gray-100 border border-gray-700/30"
                  }`}
                  style={{
                    background: message.role === "user" ? gradients.suggestions.code : undefined,
                  }}
                >
                  <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: gradients.suggestions.ai }}
                >
                  <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-gray-700/30 flex items-center space-x-3">
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin text-purple-400" />
                  <span className="text-gray-300 text-sm sm:text-base">Crafting your workflow...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 sm:p-6 border-t border-gray-800/40 bg-gray-900/20 backdrop-blur-sm">
          <form onSubmit={onSend} className="mt-4">
            <div className="relative flex items-center gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Describe your workflow idea..."
                className="bg-gray-800/40 backdrop-blur-sm border-gray-700/40 text-white placeholder-gray-400 pr-32 sm:pr-36 py-3 sm:py-4 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 text-sm sm:text-base"
                disabled={isLoading}
              />
              <input
                type="file"
                accept="image/*,application/pdf,.doc,.docx,.txt,.csv,.xlsx,.zip,.rar,.json,.xml,.ppt,.pptx,.mp3,.mp4,.wav,.ogg,.webm"
                className="hidden"
                id="file-upload"
                onChange={onFileChange}
                disabled={isLoading}
              />
              <label htmlFor="file-upload" className="cursor-pointer p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                <Paperclip className="w-4 h-4" />
              </label>
              <button type="button" onClick={onSearch} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                <Search className="w-4 h-4" />
              </button>
              <button type="button" onClick={onMicClick} className={`p-2 rounded-lg transition-all duration-200 ${listening ? "bg-blue-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`} disabled={!browserSupportsSpeechRecognition}>
                <Mic className="w-4 h-4" />
              </button>
              <Button
                type="submit"
                size="sm"
                disabled={(!input.trim() && !file) || isLoading}
                className="p-2 text-white rounded-lg transition-all duration-200 disabled:opacity-50 shadow-lg"
                style={{ background: gradients.brand.primary }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {file && (
              <div className="mt-2 flex items-center gap-2">
                {filePreview ? (
                  <img src={filePreview} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-gray-700" />
                ) : (
                  <span className="text-gray-300">{file.name}</span>
                )}
                <button type="button" onClick={() => { setFile(null); setFilePreview(null); }} className="ml-2 text-red-400 hover:text-red-600">Remove</button>
              </div>
            )}
            {searchMode && (
              <div className="mt-2 p-2 bg-gray-800/80 rounded-lg text-gray-200">Search functionality coming soon...</div>
            )}
          </form>
        </div>
      </div>

      {/* Right Panel - Generation (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-950/40 backdrop-blur-sm relative z-10">
        <GenerationPanel
          messages={messages}
          isLoading={isLoading}
          selectedWorkflow={selectedWorkflow}
          onWorkflowSelect={setSelectedWorkflow}
        />
      </div>
    </div>
  )
}
