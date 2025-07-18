export type EnvMode = 'development' | 'preview' | 'production'

interface Config {
  env: EnvMode
}

const defaultConfig: Config = {
  env: 'development',
}

let config: Config = { ...defaultConfig }

export function loadConfig() {
  if (typeof window === 'undefined') return config
  const stored = localStorage.getItem('system_config')
  if (stored) {
    try {
      config = { ...config, ...JSON.parse(stored) }
    } catch {}
  }
  return config
}

export function saveConfig(newConfig: Partial<Config>) {
  config = { ...config, ...newConfig }
  if (typeof window !== 'undefined') {
    localStorage.setItem('system_config', JSON.stringify(config))
  }
}

export function getEnv() {
  return loadConfig().env
}

export function setEnv(env: EnvMode) {
  saveConfig({ env })
}
