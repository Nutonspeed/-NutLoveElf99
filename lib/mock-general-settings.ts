export interface GeneralConfig {
  storeName: string
  logo: string
  language: string
}

export let generalConfig: GeneralConfig = {
  storeName: 'Sofa Store',
  logo: '/logo.png',
  language: 'th',
}

export function loadGeneralConfig() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('generalConfig')
    if (stored) generalConfig = JSON.parse(stored)
  }
}

export function setGeneralConfig(config: GeneralConfig) {
  generalConfig = config
  if (typeof window !== 'undefined') {
    localStorage.setItem('generalConfig', JSON.stringify(config))
  }
}
