// Color and gradient constants for easy theming
export const colors = {
  // Primary brand colors
  primary: {
    blue: "#3B82F6",
    purple: "#8B5CF6",
    pink: "#EC4899",
    cyan: "#06B6D4",
    green: "#10B981",
    orange: "#F59E0B",
    red: "#EF4444",
  },

  // Background colors
  background: {
    primary: "#030712",
    secondary: "#111827",
    tertiary: "#1F2937",
    card: "rgba(31, 41, 55, 0.5)",
    overlay: "rgba(17, 24, 39, 0.8)",
  },

  // Text colors
  text: {
    primary: "#FFFFFF",
    secondary: "#D1D5DB",
    tertiary: "#9CA3AF",
    muted: "#6B7280",
  },

  // Border colors
  border: {
    primary: "rgba(75, 85, 99, 0.3)",
    secondary: "rgba(75, 85, 99, 0.5)",
    accent: "rgba(59, 130, 246, 0.5)",
  },
}

// Gradient definitions
export const gradients = {
  // Brand gradients
  brand: {
    primary: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
    secondary: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
    accent: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
  },

  // Background gradients
  background: {
    main: "linear-gradient(135deg, #030712 0%, #111827 50%, #030712 100%)",
    card: "linear-gradient(135deg, rgba(31, 41, 55, 0.3) 0%, rgba(17, 24, 39, 0.5) 100%)",
    overlay: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
  },

  // Suggestion gradients
  suggestions: {
    code: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    email: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    slack: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    automation: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    ai: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    more: "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)",
  },

  // Text gradients
  text: {
    brand: "linear-gradient(135deg, #FFFFFF 0%, #3B82F6 50%, #8B5CF6 100%)",
    accent: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
    highlight: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
  },
}

// CSS custom properties for dynamic theming
export const cssVariables = `
  :root {
    --color-primary-blue: ${colors.primary.blue};
    --color-primary-purple: ${colors.primary.purple};
    --color-primary-pink: ${colors.primary.pink};
    --color-primary-cyan: ${colors.primary.cyan};
    --color-primary-green: ${colors.primary.green};
    --color-primary-orange: ${colors.primary.orange};
    
    --bg-primary: ${colors.background.primary};
    --bg-secondary: ${colors.background.secondary};
    --bg-tertiary: ${colors.background.tertiary};
    
    --text-primary: ${colors.text.primary};
    --text-secondary: ${colors.text.secondary};
    --text-tertiary: ${colors.text.tertiary};
    
    --gradient-brand: ${gradients.brand.primary};
    --gradient-text-brand: ${gradients.text.brand};
    --gradient-text-accent: ${gradients.text.accent};
  }
`
