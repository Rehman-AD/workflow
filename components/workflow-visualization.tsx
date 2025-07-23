"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Settings, Zap, Database, Send, Filter } from "lucide-react"

interface WorkflowVisualizationProps {
  workflowId: string
}

export function WorkflowVisualization({ workflowId }: WorkflowVisualizationProps) {
  const workflowSteps = {
    "1": [
      {
        id: 1,
        name: "Trigger Event",
        type: "trigger",
        description: "User action detected",
        icon: Zap,
        details: "Webhook receives user signup event",
      },
      {
        id: 2,
        name: "Process Data",
        type: "action",
        description: "Format message content",
        icon: Database,
        details: "Extract user info and format notification",
      },
      {
        id: 3,
        name: "Send to Slack",
        type: "integration",
        description: "Post to #general channel",
        icon: Send,
        details: "Deliver formatted message to Slack",
      },
    ],
    "2": [
      {
        id: 1,
        name: "Schedule Trigger",
        type: "trigger",
        description: "Daily at 9:00 AM",
        icon: Zap,
        details: "Cron job triggers email sequence",
      },
      {
        id: 2,
        name: "Fetch Contacts",
        type: "action",
        description: "Get subscriber list",
        icon: Database,
        details: "Query database for active subscribers",
      },
      {
        id: 3,
        name: "Personalize Email",
        type: "action",
        description: "Add user-specific content",
        icon: Filter,
        details: "Apply personalization templates",
      },
      {
        id: 4,
        name: "Send Email",
        type: "integration",
        description: "Via SMTP server",
        icon: Send,
        details: "Deliver personalized emails",
      },
    ],
    "3": [
      {
        id: 1,
        name: "Alert Condition",
        type: "trigger",
        description: "System threshold exceeded",
        icon: Zap,
        details: "Monitor detects anomaly",
      },
      {
        id: 2,
        name: "Format Message",
        type: "action",
        description: "Create alert text",
        icon: Filter,
        details: "Generate contextual alert message",
      },
      {
        id: 3,
        name: "Send WhatsApp",
        type: "integration",
        description: "To admin group",
        icon: Send,
        details: "Deliver alert via WhatsApp API",
      },
    ],
  }

  const steps = workflowSteps[workflowId as keyof typeof workflowSteps] || []

  const getStepConfig = (type: string) => {
    switch (type) {
      case "trigger":
        return {
          color: "from-green-500 to-green-600",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          textColor: "text-green-400",
        }
      case "action":
        return {
          color: "from-blue-500 to-blue-600",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/30",
          textColor: "text-blue-400",
        }
      case "integration":
        return {
          color: "from-purple-500 to-purple-600",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/30",
          textColor: "text-purple-400",
        }
      default:
        return {
          color: "from-gray-500 to-gray-600",
          bgColor: "bg-gray-500/10",
          borderColor: "border-gray-500/30",
          textColor: "text-gray-400",
        }
    }
  }

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Play className="w-5 h-5 text-white" />
          </div>
          <span>Workflow Architecture</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {steps.map((step, index) => {
          const config = getStepConfig(step.type)
          const IconComponent = step.icon

          return (
            <div key={step.id} className="flex items-center space-x-4">
              <div
                className={`flex-1 p-6 rounded-xl border-2 ${config.bgColor} ${config.borderColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">{step.name}</h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${config.textColor} border-current`}>
                    {step.type}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm pl-13">{step.details}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-6 h-6 text-gray-500 mb-2" />
                  <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"></div>
                </div>
              )}
            </div>
          )
        })}

        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3 text-gray-300">
            <Settings className="w-5 h-5 text-blue-400" />
            <div>
              <h4 className="font-medium text-white">Execution Details</h4>
              <p className="text-sm text-gray-400">
                This workflow executes automatically based on configured triggers with built-in error handling and retry
                logic.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
