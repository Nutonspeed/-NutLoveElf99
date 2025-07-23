import bundleAnalyzer from '@next/bundle-analyzer'
import BundleSizePlugin from './lib/BundleSizePlugin.js'

const withAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  webpack(config) {
    config.plugins.push(new BundleSizePlugin())
    return config
  },
}

export default withAnalyzer(nextConfig)
