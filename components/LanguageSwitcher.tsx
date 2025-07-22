'use client'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useEffect } from 'react'

export default function LanguageSwitcher() {
  const [lang, setLang] = useLocalStorage('lang', '')
  useEffect(() => {
    if (lang) document.documentElement.lang = lang
  }, [lang])
  const toggle = () => setLang((l: string) => (l === 'en' ? 'th' : 'en'))
  return (
    <button onClick={toggle} className="fixed bottom-4 right-4 text-xs px-2 py-1 border rounded">
      {lang === 'en' ? 'TH' : 'EN'}
    </button>
  )
}
