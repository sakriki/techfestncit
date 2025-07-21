export type ThemeOption = {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    messageBackground: string
    userMessageBackground: string
    text: string
    secondaryText: string
    accent: string
  }
}

export const themes: ThemeOption[] = [
  {
    id: "dark",
    name: "Dark",
    colors: {
      primary: "#1a1a1a",
      secondary: "#2d2d2d",
      background: "#121212",
      messageBackground: "#2d2d2d",
      userMessageBackground: "#8a1538", // Maroon from logo
      text: "#ffffff",
      secondaryText: "#a8a8a8",
      accent: "#f7b731", // Yellow from logo
    },
  },
  {
    id: "light",
    name: "Light",
    colors: {
      primary: "#ffffff",
      secondary: "#f0f2f5",
      background: "#f0f2f5",
      messageBackground: "#ffffff",
      userMessageBackground: "#fff5d7", // Light yellow
      text: "#111111",
      secondaryText: "#65676b",
      accent: "#8a1538", // Maroon from logo
    },
  },
  {
    id: "gafadi",
    name: "Gafadi",
    colors: {
      primary: "#1a0910", // Very dark maroon
      secondary: "#2d1520", // Dark maroon
      background: "#0f0608", // Almost black with maroon tint
      messageBackground: "#2d1520", // Dark maroon
      userMessageBackground: "#8a1538", // Maroon from logo
      text: "#ffffff",
      secondaryText: "#d0a0a8", // Light maroon
      accent: "#f7b731", // Yellow from logo
    },
  },
  {
    id: "gold",
    name: "Gold",
    colors: {
      primary: "#2d2000", // Dark gold
      secondary: "#3d2d10", // Darker gold
      background: "#1a1400", // Very dark gold
      messageBackground: "#3d2d10", // Darker gold
      userMessageBackground: "#f7b731", // Yellow from logo
      text: "#ffffff",
      secondaryText: "#d5c096", // Light gold
      accent: "#8a1538", // Maroon from logo
    },
  },
  {
    id: "purple",
    name: "Purple",
    colors: {
      primary: "#1e1e2e",
      secondary: "#313244",
      background: "#181825",
      messageBackground: "#313244",
      userMessageBackground: "#9d7cd8",
      text: "#ffffff",
      secondaryText: "#a8a8a8",
      accent: "#cba6f7",
    },
  },
]

export const getTheme = (themeId: string): ThemeOption => {
  return themes.find((theme) => theme.id === themeId) || themes[0]
}
