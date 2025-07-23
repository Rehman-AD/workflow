"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Zap, MessageSquare, Mail, Settings, Code } from "lucide-react"
import { gradients } from "@/lib/constants/colors"

interface SuggestionBoxProps {
  onSuggestionClick: (suggestion: string) => void
}

export function SuggestionBox({ onSuggestionClick }: SuggestionBoxProps) {
  const suggestions = [
    {
      text: "Create a Slack notification workflow for new user signups",
      icon: MessageSquare,
      gradient: gradients.suggestions.slack,
      category: "Slack",
    },
    {
      text: "Set up automated email sequences for customer onboarding",
      icon: Mail,
      gradient: gradients.suggestions.email,
      category: "Email",
    },
    {
      text: "Build a WhatsApp alert system for system monitoring",
      icon: Zap,
      gradient: gradients.suggestions.automation,
      category: "WhatsApp",
    },
    {
      text: "Design a multi-channel marketing campaign workflow",
      icon: Sparkles,
      gradient: gradients.suggestions.ai,
      category: "Marketing",
    },
    {
      text: "Create an automated customer support ticket routing system",
      icon: Settings,
      gradient: gradients.suggestions.more,
      category: "Support",
    },
    {
      text: "Generate code snippets and API integrations automatically",
      icon: Code,
      gradient: gradients.suggestions.code,
      category: "Development",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <p className="text-sm text-gray-300 font-semibold">Suggested workflows</p>
      </div>
      {/* <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto custom-scrollbar">
        {suggestions.map((suggestion, index) => {
          const IconComponent = suggestion.icon
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => onSuggestionClick(suggestion.text)}
              className="group justify-start h-auto p-4 bg-gray-800/20 backdrop-blur-sm border-gray-700/30 text-gray-300 hover:bg-gray-700/30 hover:text-white hover:border-gray-600/40 transition-all duration-300 hover:scale-[1.02] rounded-xl"
            >
              <div className="flex items-center space-x-4 w-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300"
                  style={{ background: suggestion.gradient }}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium leading-relaxed">{suggestion.text}</div>
                  <div className="text-xs text-gray-500 mt-1">{suggestion.category}</div>
                </div>
              </div>
            </Button>
          )
        })}
      </div> */}
    </div>
  )
}
