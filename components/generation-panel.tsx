"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, MessageSquare, Mail, Zap, Play, Settings, CheckCircle, Clock, Sparkles } from "lucide-react"
import { WorkflowVisualization } from "@/components/workflow-visualization"

interface GenerationPanelProps {
  messages: any[]
  isLoading: boolean
  selectedWorkflow: string | null
  onWorkflowSelect: (workflow: string) => void
}

export function GenerationPanel({ messages, isLoading, selectedWorkflow, onWorkflowSelect }: GenerationPanelProps) {
  const [generationStep, setGenerationStep] = useState<string>("")
  const [workflows, setWorkflows] = useState<any[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const steps = [
        "🧠 Analyzing your requirements...",
        "⚡ Generating workflow architecture...",
        "🔗 Configuring integrations...",
        "✨ Optimizing performance...",
        "🎯 Finalizing your workflow...",
      ]

      let currentStep = 0
      setProgress(0)

      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setGenerationStep(steps[currentStep])
          setProgress(((currentStep + 1) / steps.length) * 100)
          currentStep++
        } else {
          clearInterval(interval)
        }
      }, 1200)

      return () => clearInterval(interval)
    }
  }, [isLoading])

  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "assistant") {
        const mockWorkflows = [
          {
            id: "1",
            name: "Slack Notification Hub",
            description: "Intelligent notification system with smart routing and priority handling",
            integrations: ["Slack", "Webhooks"],
            status: "ready",
            complexity: "Simple",
            estimatedTime: "2 min",
            icon: MessageSquare,
            color: "from-green-500 to-green-600",
          },
          {
            id: "2",
            name: "Email Campaign Engine",
            description: "Advanced email automation with personalization and analytics",
            integrations: ["Email", "SMTP", "Analytics"],
            status: "ready",
            complexity: "Advanced",
            estimatedTime: "5 min",
            icon: Mail,
            color: "from-blue-500 to-blue-600",
          },
          {
            id: "3",
            name: "WhatsApp Alert System",
            description: "Real-time alerts with smart filtering and escalation rules",
            integrations: ["WhatsApp", "API"],
            status: "ready",
            complexity: "Medium",
            estimatedTime: "3 min",
            icon: MessageSquare,
            color: "from-purple-500 to-purple-600",
          },
        ]
        setWorkflows(mockWorkflows)
      }
    }
  }, [messages, isLoading])

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center text-gray-400 max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Workflow Generation</h3>
          <p className="text-gray-400 leading-relaxed">
            Your AI-powered workflows will appear here. Start a conversation to see the magic happen.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">Workflow Generation</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Loading State */}
        {isLoading && (
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Generating Your Workflow</h3>
                  <p className="text-gray-400">{generationStep}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-blue-400 font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Workflows */}
        {workflows.map((workflow) => {
          const IconComponent = workflow.icon
          return (
            <Card
              key={workflow.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-gray-800/30 backdrop-blur-sm border-gray-700/50 hover:border-gray-600/50 hover:shadow-2xl ${
                selectedWorkflow === workflow.id ? "ring-2 ring-blue-500/50 border-blue-500/50" : ""
              }`}
              onClick={() => onWorkflowSelect(workflow.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${workflow.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{workflow.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {workflow.status}
                        </Badge>
                        <Badge variant="outline" className="text-gray-400 border-gray-600">
                          {workflow.complexity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {workflow.estimatedTime}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-300 mb-4 leading-relaxed">{workflow.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {workflow.integrations.map((integration: string) => (
                    <Badge
                      key={integration}
                      variant="outline"
                      className="bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-600/50 transition-colors"
                    >
                      {integration === "Slack" && <MessageSquare className="w-3 h-3 mr-1" />}
                      {integration === "Email" && <Mail className="w-3 h-3 mr-1" />}
                      {integration === "WhatsApp" && <MessageSquare className="w-3 h-3 mr-1" />}
                      <span>{integration}</span>
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200">
                    <Play className="w-4 h-4 mr-2" />
                    Deploy Workflow
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Workflow Visualization */}
        {selectedWorkflow && <WorkflowVisualization workflowId={selectedWorkflow} />}
      </div>
    </div>
  )
}
