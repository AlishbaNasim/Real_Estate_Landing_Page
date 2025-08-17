import type { Property, PropertyFilters } from "./types"
import { mockProperties } from "./mock-data"

export class PropertyService {
  static async getAllProperties(): Promise<Property[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockProperties
  }

  static async getPropertyById(id: string): Promise<Property | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockProperties.find((property) => property.id === id) || null
  }

  static async searchProperties(filters: Partial<PropertyFilters>): Promise<Property[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    let filteredProperties = [...mockProperties]

    if (filters.priceRange) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price >= filters.priceRange!.min && property.price <= filters.priceRange!.max,
      )
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.propertyType!.includes(property.propertyType),
      )
    }

    if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
      filteredProperties = filteredProperties.filter((property) => property.bedrooms >= filters.bedrooms!)
    }

    if (filters.bathrooms !== null && filters.bathrooms !== undefined) {
      filteredProperties = filteredProperties.filter((property) => property.bathrooms >= filters.bathrooms!)
    }

    if (filters.location) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.location.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
          property.location.address.toLowerCase().includes(filters.location!.toLowerCase()),
      )
    }

    return filteredProperties
  }

  static formatPrice(price: number, status: string): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    if (status === "for-rent") {
      return `${formatter.format(price)}/month`
    }

    return formatter.format(price)
  }
}
