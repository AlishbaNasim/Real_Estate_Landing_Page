"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"

interface PropertyMapProps {
  property?: Property
  properties?: Property[]
  height?: string
  showControls?: boolean
}

export function PropertyMap({ property, properties, height = "h-64", showControls = true }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [zoom, setZoom] = useState(15)

  // Mock map implementation with interactive features
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 2, 20))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 2, 8))
  }

  const getMapUrl = () => {
    if (property) {
      const { lat, lng } = property.location.coordinates
      return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-home+0891b2(${lng},${lat})/${lng},${lat},${zoom}/600x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`
    }
    return ""
  }

  if (!property && !properties) {
    return (
      <div className={`${height} bg-muted rounded-lg flex items-center justify-center animate-fade-in-up`}>
        <div className="text-center">
          <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No location data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${height} bg-muted rounded-lg overflow-hidden animate-scale-in`}>
      {!isLoaded ? (
        // Loading state with animation
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Interactive Map Display */}
          <div
            ref={mapRef}
            className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
            style={{
              backgroundImage: property ? `url("${getMapUrl()}")` : "linear-gradient(135deg, #e0f2fe 0%, #f1f8e9 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Property Markers */}
            {property && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative animate-bounce">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
                </div>
              </div>
            )}

            {/* Multiple Properties Markers */}
            {properties && (
              <div className="absolute inset-0">
                {properties.map((prop, index) => (
                  <div
                    key={prop.id}
                    className="absolute animate-fade-in-up"
                    style={{
                      left: `${20 + ((index * 15) % 60)}%`,
                      top: `${30 + ((index * 10) % 40)}%`,
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    <div className="relative group cursor-pointer">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rotate-45"></div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {prop.title}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Map Controls */}
            {showControls && (
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
                  onClick={handleZoomIn}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-8 h-8 bg-white/90 hover:bg-white shadow-md"
                  onClick={handleZoomOut}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="w-8 h-8 bg-white/90 hover:bg-white shadow-md">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
              Zoom: {zoom}x
            </div>
          </div>

          {/* Map Attribution */}
          <div className="absolute bottom-0 right-0 bg-black/50 text-white text-xs px-2 py-1">Interactive Map</div>
        </>
      )}
    </div>
  )
}
