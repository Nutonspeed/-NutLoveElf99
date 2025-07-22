'use client'
import { useEffect } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

export default function LanguageSetter() {
  const [lang] = useLocalStorage<string>('lang', '')
  useEffect(() => {
    const preferred = lang || (navigator.language || '').includes('en') ? 'en' : 'th'
    document.documentElement.lang = preferred
    if (!lang) localStorage.setItem('lang', preferred)
  }, [lang])
  return null
}
