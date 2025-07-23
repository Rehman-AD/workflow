"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Mail, Lock } from "lucide-react"
import { gradients } from "@/lib/constants/colors"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async (type: "login" | "signup") => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("auth_token", "mock_token")
      setIsLoading(false)
      onOpenChange(false)
      window.location.reload()
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
            style={{ background: gradients.brand.primary }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">Continue Your Journey</DialogTitle>
          <DialogDescription className="text-gray-400">
            Your free session has expired. Join thousands of users automating their workflows with AI.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
            <TabsTrigger value="signup" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="login" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Log In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              />
            </div>
            <Button
              onClick={() => handleAuth("signup")}
              className="w-full text-white font-medium py-3"
              disabled={isLoading}
              style={{ background: gradients.brand.primary }}
            >
              {isLoading ? "Creating Account..." : "Sign Up Free"}
            </Button>
          </TabsContent>

          <TabsContent value="login" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-gray-300 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-gray-300 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              />
            </div>
            <Button
              onClick={() => handleAuth("login")}
              className="w-full text-white font-medium py-3"
              disabled={isLoading}
              style={{ background: gradients.brand.primary }}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </TabsContent>
        </Tabs>

        <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <div className="flex items-center justify-center space-x-2 text-green-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Free Forever Plan</span>
          </div>
          <p className="text-gray-400 text-sm">Unlimited workflows • 50+ integrations • AI-powered automation</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
