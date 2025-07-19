import { NextResponse } from 'next/server'
import { setLayout, setTheme } from '@/core/mock/store'
import type { LayoutComponent, ThemeConfig } from '@/types/storefront'

export async function POST(req: Request) {
  try {
    const { layout, theme } = await req.json()
    if (layout) setLayout(layout)
    if (theme) setTheme(theme)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Save layout error', e)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
