"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

interface HeroSectionProps {
  onSearch?: (query: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find Your Perfect
            <span className="text-primary block">Dream Home</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover exceptional properties in prime locations. From luxury condos to family homes, we have the perfect
            place for you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="animate-fade-in-up animate-delay-200">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter location, property type, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-card border-border"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 animate-fade-in-up animate-delay-300">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Properties Listed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Expert Agents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  )
}
