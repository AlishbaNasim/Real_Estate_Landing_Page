"use client"

import { useState } from "react"
import { HeroSection } from "@/components/heroSection"
import { PropertiesMapView } from "@/components/properties-map-view"
import { PropertyFilters } from "@/components/property-filters"
import { ScrollToTop } from "@/components/scroll-to-top"
import type { PropertyFilters as PropertyFiltersType } from "@/lib/types"

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState<Partial<PropertyFiltersType> | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchFilters({ location: query })
    } else {
      setSearchFilters(null)
    }
  }

  const handleFiltersChange = (filters: Partial<PropertyFiltersType>) => {
    setSearchFilters(filters)
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {searchFilters ? "Filtered Properties" : "Featured Properties"}
          </h2>
          <p className="text-muted-foreground">
            {searchFilters
              ? "Properties matching your criteria"
              : "Discover our handpicked selection of premium properties"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <PropertyFilters
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Properties Grid with Map View Option */}
          <div className="flex-1">
            <PropertiesMapView filters={searchFilters} />
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
