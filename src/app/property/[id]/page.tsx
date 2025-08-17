"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PropertyMap } from "@/components/property-map"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import type { Property } from "@/lib/types"
import { PropertyService } from "@/lib/property-services"
import { PropertyCard } from "@/components/property-card"

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const loadProperty = async () => {
      if (!params.id) return

      setLoading(true)
      try {
        const propertyData = await PropertyService.getPropertyById(params.id as string)
        if (!propertyData) {
          router.push("/")
          return
        }

        setProperty(propertyData)

        // Load related properties (same city, different property)
        const allProperties = await PropertyService.getAllProperties()
        const related = allProperties
          .filter((p) => p.id !== propertyData.id && p.location.city === propertyData.location.city)
          .slice(0, 3)
        setRelatedProperties(related)
      } catch (error) {
        console.error("Failed to load property:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [params.id, router])

  const nextImage = () => {
    if (!property) return
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    if (!property) return
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
    

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in-up">
          <Link href="/" className="hover:text-primary transition-colors duration-200">
            Properties
          </Link>
          <span>/</span>
          <span className="text-foreground">{property.title}</span>
        </div>
      </div>

      {/* Back Button & Actions */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-between animate-fade-in-up animate-delay-100">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={`hover:scale-110 transition-all duration-200 ${isLiked ? "text-red-500" : ""}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="container mx-auto px-4 mb-12">
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden animate-scale-in">
          <Image
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
            onClick={() => openGallery(currentImageIndex)}
          />

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white hover:scale-110 transition-all duration-200"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white hover:scale-110 transition-all duration-200"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Status Badge */}
          <Badge
            variant={property.status === "for-sale" ? "default" : "secondary"}
            className="absolute top-6 left-6 bg-primary text-primary-foreground text-base px-4 py-2 animate-bounce"
          >
            {property.status === "for-sale" ? "For Sale" : "For Rent"}
          </Badge>

          {/* Image Counter */}
          <div className="absolute bottom-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm animate-fade-in-up">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {property.images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 animate-fade-in-up animate-delay-200">
            {property.images.map((image, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-300 hover:scale-110 ${
                  index === currentImageIndex ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="animate-fade-in-up animate-delay-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">
                      {property.location.address}, {property.location.city}, {property.location.state}{" "}
                      {property.location.zipCode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-primary">
                    {PropertyService.formatPrice(property.price, property.status)}
                  </p>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex items-center gap-8 text-lg">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <span>
                      {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-muted-foreground" />
                  <span>{property.squareFootage.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Built {property.yearBuilt}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="animate-fade-in-up animate-delay-400">
              <h2 className="text-2xl font-semibold text-foreground mb-4">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{property.description}</p>
            </div>

            <Separator />

            {/* Features */}
            <div className="animate-fade-in-up animate-delay-500">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Property Details */}
            <div className="animate-fade-in-up animate-delay-600">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Built</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Square Footage</span>
                    <span className="font-medium">{property.squareFootage.toLocaleString()} sqft</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bedrooms</span>
                    <span className="font-medium">{property.bedrooms || "Studio"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={property.status === "for-sale" ? "default" : "secondary"}>
                      {property.status === "for-sale" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card className="animate-fade-in-up animate-delay-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Agent</h3>
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={property.agent.image || "/placeholder.svg"}
                    alt={property.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{property.agent.name}</h4>
                    <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    {property.agent.phone}
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Mail className="h-4 w-4" />
                    Email Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="animate-fade-in-up animate-delay-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Location</h3>
                <PropertyMap property={property} height="h-48" />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>{property.location.address}</p>
                  <p>
                    {property.location.city}, {property.location.state} {property.location.zipCode}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16 animate-fade-in-up animate-delay-900">
            <h2 className="text-3xl font-bold text-foreground mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProperties.map((relatedProperty, index) => (
                <PropertyCard key={relatedProperty.id} property={relatedProperty} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

     
      <ScrollToTop />

      {/* Full Screen Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in-up">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
              onClick={() => setIsGalleryOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="relative max-w-4xl max-h-[80vh] w-full h-full animate-scale-in">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg animate-fade-in-up">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
