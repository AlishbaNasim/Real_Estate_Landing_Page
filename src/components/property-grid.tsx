"use client"

import { useState, useEffect } from "react"
import { PropertyCard } from "./property-card"
import { PropertyService } from "@/lib/property-services"
import { PropertyCardSkeleton } from "./loadingSpinner"
import type { Property } from "@/lib/types"

interface PropertyGridProps {
  filters?: any
}

export function PropertyGrid({ filters }: PropertyGridProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = filters
          ? await PropertyService.searchProperties(filters)
          : await PropertyService.getAllProperties()
        setProperties(data)
      } catch (error) {
        console.error("Failed to load properties:", error)
        setError("Failed to load properties. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [filters])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 animate-fade-in-up">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Oops! Something went wrong</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-fade-in-up">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">No Properties Found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria to find more properties.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property, index) => (
        <div key={property.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          <PropertyCard property={property} index={index} />
        </div>
      ))}
    </div>
  )
}
