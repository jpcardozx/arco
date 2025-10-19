/**
 * Hook: useAssetLoader
 * Carregamento progressivo de assets com fallback
 */

import { useEffect, useState } from 'react'

interface Asset {
  id: string
  primary: string
  fallback?: string
  loaded?: boolean
}

export function useAssetLoader(assets: Asset[]) {
  const [loadedAssets, setLoadedAssets] = useState<Record<string, boolean>>({})

  useEffect(() => {
    assets.forEach((asset) => {
      const img = new Image()

      // Try primary first
      img.onload = () => {
        setLoadedAssets((prev) => ({
          ...prev,
          [asset.id]: true,
        }))
      }

      img.onerror = () => {
        // Fall back to fallback image
        if (asset.fallback) {
          const fallbackImg = new Image()
          fallbackImg.onload = () => {
            setLoadedAssets((prev) => ({
              ...prev,
              [asset.id]: true,
            }))
          }
          fallbackImg.src = asset.fallback
        } else {
          setLoadedAssets((prev) => ({
            ...prev,
            [asset.id]: false,
          }))
        }
      }

      img.src = asset.primary
    })
  }, [assets])

  return {
    loadedAssets,
    isAllLoaded: Object.values(loadedAssets).every((v) => v === true),
  }
}
