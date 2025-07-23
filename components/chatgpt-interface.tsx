"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Paperclip,
  Search,
  Mic,
  Sparkles,
  Code,
  Mail,
  MessageSquare,
  Zap,
  Plus,
  Gift,
  FileText,
  Lightbulb,
  ChevronDown,
} from "lucide-react"
import { gradients } from "@/lib/constants/colors"

interface ChatGPTInterfaceProps {
  onStartChat: () => void
}

export function ChatGPTInterface({ onStartChat }: ChatGPTInterfaceProps) {
  const [input, setInput] = useState("")
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false)

  // Main 5 suggestions + More
  const mainSuggestions = [
    { icon: Code, text: "Code", prompt: "Help me write code for ", gradient: gradients.suggestions.code },
    {
      icon: Mail,
      text: "Email workflows",
      prompt: "Create an email workflow for ",
      gradient: gradients.suggestions.email,
    },
    {
      icon: MessageSquare,
      text: "Slack integration",
      prompt: "Set up Slack integration to ",
      gradient: gradients.suggestions.slack,
    },
    {
      icon: Zap,
      text: "Quick automation",
      prompt: "Create a quick automation that ",
      gradient: gradients.suggestions.automation,
    },
    { icon: Sparkles, text: "AI magic", prompt: "Use AI to help me ", gradient: gradients.suggestions.ai },
  ]

  // Additional suggestions shown when "More" is clicked
  const moreSuggestions = [
    { icon: Gift, text: "Surprise me", prompt: "Surprise me with ", gradient: gradients.suggestions.ai },
    { icon: FileText, text: "Summarize text", prompt: "Summarize this text: ", gradient: gradients.suggestions.code },
    {
      icon: Lightbulb,
      text: "Brainstorm",
      prompt: "Help me brainstorm ideas for ",
      gradient: gradients.suggestions.email,
    },
    {
      icon: MessageSquare,
      text: "WhatsApp alerts",
      prompt: "Create WhatsApp alerts for ",
      gradient: gradients.suggestions.slack,
    },
    {
      icon: Code,
      text: "API integration",
      prompt: "Help me integrate with API for ",
      gradient: gradients.suggestions.automation,
    },
    {
      icon: Mail,
      text: "Marketing campaign",
      prompt: "Design a marketing campaign for ",
      gradient: gradients.suggestions.ai,
    },
  ]

  // Feature cards that appear when "More" is expanded
  const featureCards = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate workflows in seconds with AI-powered automation",
      gradient: gradients.suggestions.automation,
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform",
      description: "Connect Slack, WhatsApp, Email, and 50+ integrations",
      gradient: gradients.suggestions.slack,
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Smart suggestions and optimization for maximum efficiency",
      gradient: gradients.suggestions.ai,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onStartChat()
    }
  }

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div
      className="min-h-screen text-white flex flex-col relative overflow-hidden"
      style={{ background: gradients.background.main }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-4 sm:p-6 border-b border-gray-800/30 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: gradients.brand.primary }}
          >
            <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="text-white">Work</span>
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradients.text.accent }}>
              flow
            </span>
            <span className="text-white">GPT</span>
          </h1>
        </div>
        <div className="flex space-x-2 sm:space-x-3">
          <Button
            variant="outline"
            className="text-xs sm:text-sm bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-600/50 transition-all duration-300"
          >
            Log in
          </Button>
          <Button
            className="text-xs sm:text-sm text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ background: gradients.brand.primary }}
          >
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradients.text.brand }}>
              Sign up for free
            </span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white">Work</span>
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradients.text.brand }}>
              flow
            </span>
            <span className="text-white">GPT</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Transform your ideas into powerful automated workflows. Connect Slack, WhatsApp, Email, and more with
            AI-powered intelligence.
          </p>
        </div>

        {/* Enhanced Input Section */}
        <div className="w-full max-w-4xl mb-6 sm:mb-8">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-gray-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-700/40 shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 hover:border-gray-600/50">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your workflow idea..."
                className="w-full bg-transparent border-0 text-white placeholder-gray-400 text-base sm:text-lg py-6 sm:py-8 px-6 sm:px-8 pr-24 sm:pr-28 rounded-2xl sm:rounded-3xl focus:ring-0 focus:outline-none"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 sm:p-3 rounded-xl transition-all duration-200"
                >
                  <Paperclip className="w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 sm:p-3 rounded-xl transition-all duration-200"
                >
                  <Search className="w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 sm:p-3 rounded-xl transition-all duration-200"
                >
                  <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Main suggestions */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-4xl mb-6">
          {mainSuggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSuggestionClick(suggestion.prompt)}
                className="group bg-gray-800/30 backdrop-blur-sm border-gray-700/40 text-gray-300 hover:bg-gray-700/40 hover:text-white hover:border-gray-600/50 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 flex items-center space-x-2 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
              >
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center"
                  style={{ background: suggestion.gradient }}
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="font-medium">{suggestion.text}</span>
              </Button>
            )
          })}

          {/* More button - only show if not expanded */}
          {!showMoreSuggestions && (
            <Button
              variant="outline"
              onClick={() => setShowMoreSuggestions(true)}
              className="group bg-gray-800/30 backdrop-blur-sm border-gray-700/40 text-gray-300 hover:bg-gray-700/40 hover:text-white hover:border-gray-600/50 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 flex items-center space-x-2 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
            >
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center"
                style={{ background: gradients.suggestions.more }}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="font-medium">More</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>

        {/* Additional suggestions and feature cards when expanded */}
        {showMoreSuggestions && (
          <div className="w-full max-w-5xl space-y-6 animate-in slide-in-from-top-2 duration-300">
            {/* Additional suggestion pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {moreSuggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleSuggestionClick(suggestion.prompt)}
                    className="group bg-gray-800/20 backdrop-blur-sm border-gray-700/30 text-gray-400 hover:bg-gray-700/30 hover:text-white hover:border-gray-600/40 rounded-full px-3 py-1.5 flex items-center space-x-1.5 transition-all duration-300 hover:scale-105"
                    style={{ fontSize: "11px" }}
                  >
                    <div
                      className="w-3 h-3 rounded flex items-center justify-center"
                      style={{ background: suggestion.gradient }}
                    >
                      <IconComponent className="w-2 h-2 text-white" />
                    </div>
                    <span className="font-medium">{suggestion.text}</span>
                  </Button>
                )
              })}
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {featureCards.map((card, index) => {
                const IconComponent = card.icon
                return (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-gray-800/15 backdrop-blur-sm border border-gray-700/20 hover:bg-gray-800/25 transition-all duration-300 hover:scale-105"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                      style={{ background: card.gradient }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2" style={{ fontSize: "13px" }}>
                      {card.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed" style={{ fontSize: "11px" }}>
                      {card.description}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Collapse button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowMoreSuggestions(false)}
                className="bg-gray-800/20 backdrop-blur-sm border-gray-700/30 text-gray-400 hover:bg-gray-700/30 hover:text-white hover:border-gray-600/40 rounded-full px-4 py-2 flex items-center space-x-2 transition-all duration-300"
                style={{ fontSize: "11px" }}
              >
                <span className="font-medium">Show less</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
