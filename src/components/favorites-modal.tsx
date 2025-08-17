"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/components/favorites-provider"
import { Heart, MapPin, Bed, Bath, Square, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FavoritesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, removeFromFavorites } = useFavorites()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            Your Favorites ({favorites.length})
          </DialogTitle>
        </DialogHeader>

        {favorites.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">Start exploring properties and add them to your favorites!</p>
            <Link href="/properties"><Button onClick={onClose}>Browse Properties</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((property, index) => (
              <div
                key={property.id}
                className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-200 animate-slide-in-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 truncate">{property.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">${property.price.toLocaleString()}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>{property.squareFootage} sq ft</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{property.location.address}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href={`/property/${property.id}`}>
                    <Button size="sm" className="w-full">
                      View
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFromFavorites(property.id)}
                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
