export type ThemeName = 'light' | 'dark' | 'soft' | 'neon'

export interface ColorPalette {
  primary: string
  secondary: string
  background: string
  text: string
}

export interface ThemeConfig {
  theme: ThemeName
  colors: ColorPalette
}

export type LayoutComponentType = 'banner' | 'product' | 'cta' | 'review'

export interface LayoutComponent {
  id: string
  type: LayoutComponentType
}

export interface StorefrontConfig {
  theme: ThemeConfig
  layout: LayoutComponent[]
}
