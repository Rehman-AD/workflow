import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Use environment variable for model selection, default to gpt-4o-mini
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini"
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.error("Missing OPENAI_API_KEY in environment variables.")
      return new Response("OpenAI API key not configured", { status: 500 })
    }

    const result = streamText({
      model: openai(model, { apiKey }),
      system: `You are WorkflowGPT, an AI assistant specialized in creating automated workflows and integrations. 

Your expertise includes:
- Slack integrations and bot development
- WhatsApp Business API automation
- Email marketing and SMTP workflows
- API integrations and webhooks
- Database automation and synchronization
- Multi-channel marketing campaigns
- Customer support automation
- AI-powered content generation

When users describe their workflow needs:
1. Understand their specific requirements
2. Suggest the best integration approach
3. Provide step-by-step implementation guidance
4. Offer optimization suggestions
5. Include error handling and best practices

Keep responses practical, actionable, and focused on workflow automation. Use clear, professional language and provide specific technical details when helpful.`,
      messages,
      maxSteps: 5,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
