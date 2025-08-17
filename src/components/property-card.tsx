"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react"
import type { Property } from "@/lib/types"
import { PropertyService } from "@/lib/property-services"
import { useFavorites } from "@/components/favorites-provider"

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imageLoading, setImageLoading] = useState(true)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(property)
  }

  const isLiked = isFavorite(property.id)

  return (
    <Card
      className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-card animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/property/${property.id}`}>
        <div className="relative overflow-hidden">
          {/* Image Carousel */}
          <div className="relative h-64 bg-muted">
            <Image
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={property.title}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoading ? "blur-sm" : "blur-0"
              }`}
              onLoad={() => setImageLoading(false)}
            />

            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image Indicators */}
            {property.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {property.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Status Badge */}
            <Badge
              variant={property.status === "for-sale" ? "default" : "secondary"}
              className="absolute top-3 left-3 bg-primary text-primary-foreground"
            >
              {property.status === "for-sale" ? "For Sale" : "For Rent"}
            </Badge>

            {/* Like Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 bg-black/20 hover:bg-black/40 transition-all duration-300 hover:scale-110 ${
                isLiked ? "text-red-500" : "text-white"
              }`}
              onClick={toggleLike}
            >
              <Heart className={`h-4 w-4 transition-all duration-200 ${isLiked ? "fill-current scale-110" : ""}`} />
            </Button>
          </div>

          <CardContent className="p-6">
            {/* Price */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-primary">
                {PropertyService.formatPrice(property.price, property.status)}
              </p>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {property.title}
            </h3>

            {/* Location */}
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {property.location.address}, {property.location.city}
              </span>
            </div>

            {/* Property Details */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>
                      {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>
                    {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.squareFootage.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {property.features.slice(0, 3).map((feature, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>

            {/* Agent Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Image
                  src={property.agent.image || "/placeholder.svg"}
                  alt={property.agent.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{property.agent.name}</p>
                  <p className="text-xs text-muted-foreground">Real Estate Agent</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-transparent"
              >
                Contact
              </Button>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  )
}
