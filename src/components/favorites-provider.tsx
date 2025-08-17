"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Property } from "@/lib/types"

interface FavoritesContextType {
  favorites: Property[]
  addToFavorites: (property: Property) => void
  removeFromFavorites: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean
  toggleFavorite: (property: Property) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Property[]>([])

  const addToFavorites = (property: Property) => {
    setFavorites((prev) => [...prev.filter((p) => p.id !== property.id), property])
  }

  const removeFromFavorites = (propertyId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const isFavorite = (propertyId: string) => {
    return favorites.some((p) => p.id === propertyId)
  }

  const toggleFavorite = (property: Property) => {
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id)
    } else {
      addToFavorites(property)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
