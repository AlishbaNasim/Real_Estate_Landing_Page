"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Filter, SlidersHorizontal, MapPin, Home, Building, Building2, Castle } from "lucide-react"
import type { PropertyFilters as PropertyFiltersType } from "@/lib/types"

interface PropertyFiltersProps {
  onFiltersChange: (filters: Partial<PropertyFiltersType>) => void
  isOpen: boolean
  onToggle: () => void
}

const propertyTypeOptions = [
  { value: "house", label: "House", icon: Home },
  { value: "apartment", label: "Apartment", icon: Building },
  { value: "condo", label: "Condo", icon: Building2 },
  { value: "townhouse", label: "Townhouse", icon: Castle },
]

export function PropertyFilters({ onFiltersChange, isOpen, onToggle }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<Partial<PropertyFiltersType>>({
    priceRange: { min: 0, max: 3000000 },
    propertyType: [],
    bedrooms: null,
    bathrooms: null,
    location: "",
  })

  const [priceRange, setPriceRange] = useState([0, 3000000])
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  useEffect(() => {
    // Count active filters
    let count = 0
    if (filters.location && filters.location.trim()) count++
    if (filters.propertyType && filters.propertyType.length > 0) count++
    if (filters.bedrooms !== null) count++
    if (filters.bathrooms !== null) count++
    if (priceRange[0] > 0 || priceRange[1] < 3000000) count++

    setActiveFiltersCount(count)
  }, [filters, priceRange])

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
    const updatedFilters = {
      ...filters,
      priceRange: { min: value[0], max: value[1] },
    }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.propertyType || []
    const updatedTypes = checked ? [...currentTypes, type] : currentTypes.filter((t) => t !== type)

    const updatedFilters = {
      ...filters,
      propertyType: updatedTypes,
    }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleBedroomsChange = (value: string) => {
    const bedrooms = value === "any" ? null : Number.parseInt(value)
    const updatedFilters = {
      ...filters,
      bedrooms,
    }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleBathroomsChange = (value: string) => {
    const bathrooms = value === "any" ? null : Number.parseInt(value)
    const updatedFilters = {
      ...filters,
      bathrooms,
    }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleLocationChange = (location: string) => {
    const updatedFilters = {
      ...filters,
      location,
    }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: { min: 0, max: 3000000 },
      propertyType: [],
      bedrooms: null,
      bathrooms: null,
      location: "",
    }
    setFilters(clearedFilters)
    setPriceRange([0, 3000000])
    onFiltersChange(clearedFilters)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price}`
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button onClick={onToggle} variant="outline" className="w-full justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`lg:block ${isOpen ? "block" : "hidden"} animate-slide-in-right`}>
        <Card className="sticky top-24">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
                {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
              </CardTitle>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Location Filter */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter city, address, or ZIP code"
                  value={filters.location || ""}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-4">
              <Label>Price Range</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={3000000}
                  min={0}
                  step={50000}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-3">
              <Label>Property Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypeOptions.map((option) => {
                  const Icon = option.icon
                  const isChecked = filters.propertyType?.includes(option.value) || false

                  return (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isChecked ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handlePropertyTypeChange(option.value, !isChecked)}
                    >
                      <Checkbox id={option.value} checked={isChecked} onChange={() => {}} />
                      <Icon className="h-4 w-4" />
                      <Label htmlFor={option.value} className="text-sm cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Select value={filters.bedrooms?.toString() || "any"} onValueChange={handleBedroomsChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1+ Bedroom</SelectItem>
                  <SelectItem value="2">2+ Bedrooms</SelectItem>
                  <SelectItem value="3">3+ Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms Filter */}
            <div className="space-y-2">
              <Label>Bathrooms</Label>
              <Select value={filters.bathrooms?.toString() || "any"} onValueChange={handleBathroomsChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+ Bathroom</SelectItem>
                  <SelectItem value="2">2+ Bathrooms</SelectItem>
                  <SelectItem value="3">3+ Bathrooms</SelectItem>
                  <SelectItem value="4">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium">Active Filters</Label>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-auto p-1 text-xs">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.location && (
                    <Badge variant="secondary" className="text-xs">
                      {filters.location}
                    </Badge>
                  )}
                  {filters.propertyType?.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {propertyTypeOptions.find((opt) => opt.value === type)?.label}
                    </Badge>
                  ))}
                  {filters.bedrooms !== null && (
                    <Badge variant="secondary" className="text-xs">
                      {filters.bedrooms === 0 ? "Studio" : `${filters.bedrooms}+ bed`}
                    </Badge>
                  )}
                  {filters.bathrooms !== null && (
                    <Badge variant="secondary" className="text-xs">
                      {filters.bathrooms}+ bath
                    </Badge>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 3000000) && (
                    <Badge variant="secondary" className="text-xs">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
