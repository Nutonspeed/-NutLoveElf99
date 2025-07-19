import type { StorefrontConfig, ThemeConfig, LayoutComponent, TaxConfig } from '@/types/storefront'
import { loadFromStorage, saveToStorage } from './persist'

const KEY = 'mockStore_config'

const defaultConfig: StorefrontConfig = {
  theme: {
    theme: 'light',
    colors: {
      primary: '#2563eb',
      secondary: '#ec4899',
      background: '#ffffff',
      text: '#000000',
    },
  },
  layout: [],
  tax: { rate: 7, included: false },
}

let config: StorefrontConfig = loadFromStorage(KEY, defaultConfig)

function persist() {
  saveToStorage(KEY, config)
}

export function getConfig() {
  return config
}

export function setTheme(theme: ThemeConfig) {
  config.theme = theme
  persist()
}

export function setLayout(layout: LayoutComponent[]) {
  config.layout = layout
  persist()
}

export function setTax(tax: TaxConfig) {
  config.tax = tax
  persist()
}

export function resetConfig() {
  config = { ...defaultConfig }
  persist()
}
