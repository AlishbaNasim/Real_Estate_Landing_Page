
export interface Property {
    id: string
    title: string
    price: number
    location: {
      address: string
      city: string
      state: string
      zipCode: string
      coordinates: {
        lat: number
        lng: number
      }
    }
    images: string[]
    bedrooms: number
    bathrooms: number
    squareFootage: number
    propertyType: "house" | "apartment" | "condo" | "townhouse"
    description: string
    features: string[]
    yearBuilt: number
    status: "for-sale" | "for-rent" | "sold"
    agent: {
      name: string
      phone: string
      email: string
      image: string
    }
    createdAt: string
    updatedAt: string
  }
  
  export interface PropertyFilters {
    priceRange: {
      min: number
      max: number
    }
    propertyType: string[]
    bedrooms: number | null
    bathrooms: number | null
    location: string
  }
  