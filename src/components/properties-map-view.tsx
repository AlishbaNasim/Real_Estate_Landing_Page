"use client"

import { useState, useEffect } from "react"
import { PropertyMap } from "./property-map"
import { PropertyCard } from "./property-card"
import { PropertyService } from "@/lib/property-services"
import { PropertyCardSkeleton } from "./loadingSpinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Map, Grid3X3, X } from "lucide-react"
import type { Property } from "@/lib/types"

interface PropertiesMapViewProps {
  filters?: any
}

export function PropertiesMapView({ filters }: PropertiesMapViewProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true)
      try {
        const data = filters
          ? await PropertyService.searchProperties(filters)
          : await PropertyService.getAllProperties()
        setProperties(data)
      } catch (error) {
        console.error("Failed to load properties:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [filters])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 bg-muted rounded animate-pulse"></div>
            <div className="h-9 w-24 bg-muted rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2 transition-all duration-200 hover:scale-105"
          >
            <Grid3X3 className="h-4 w-4" />
            Grid View
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="gap-2 transition-all duration-200 hover:scale-105"
          >
            <Map className="h-4 w-4" />
            Map View
          </Button>
        </div>
        <div className="text-sm text-muted-foreground animate-slide-in-right">{properties.length} properties found</div>
      </div>

      {viewMode === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up animate-delay-100">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <PropertyMap properties={properties} height="h-96 lg:h-[600px]" />
          </div>

          {/* Property List */}
          <div className="order-1 lg:order-2 space-y-4 max-h-[600px] overflow-y-auto">
            {selectedProperty ? (
              <Card className="animate-scale-in">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold">Selected Property</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedProperty(null)}
                      className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <PropertyCard property={selectedProperty} />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold animate-fade-in-up">All Properties</h3>
                {properties.map((property, index) => (
                  <div
                    key={property.id}
                    className="cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-all duration-200 animate-fade-in-up hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Map className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{property.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {property.location.city}, {property.location.state}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {PropertyService.formatPrice(property.price, property.status)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div key={property.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <PropertyCard property={property} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
