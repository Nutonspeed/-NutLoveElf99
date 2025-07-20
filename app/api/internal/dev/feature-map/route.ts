import { NextResponse } from 'next/server'
import { getFeatureMap } from '@/lib/feature-map'

export async function GET() {
  const data = getFeatureMap()
  return NextResponse.json(data)
}
