"use client"

import Link from "next/link"
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">EstateHub</span>
            </div>
            <p className="text-muted-foreground">
              Your trusted partner in finding the perfect home. We connect buyers, sellers, and renters with their ideal
              properties.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors duration-200">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors duration-200">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors duration-200">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary transition-colors duration-200">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in-up animate-delay-100">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors duration-200">
                Properties
              </Link>
              <Link
                href="/agents"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Our Agents
              </Link>
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 animate-fade-in-up animate-delay-200">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <div className="space-y-2">
              <Link
                href="/buy"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Buy Property
              </Link>
              <Link
                href="/sell"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Sell Property
              </Link>
              <Link
                href="/rent"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Rent Property
              </Link>
              <Link
                href="/valuation"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Property Valuation
              </Link>
              <Link
                href="/management"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Property Management
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 animate-fade-in-up animate-delay-300">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest property listings and market insights.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" className="bg-background" />
              <Button className="w-full hover:scale-105 transition-transform duration-200">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 animate-fade-in-up animate-delay-400">
              <Phone className="h-4 w-4 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 animate-fade-in-up animate-delay-500">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@estatehub.com</span>
            </div>
            <div className="flex items-center gap-2 animate-fade-in-up animate-delay-600">
              <MapPin className="h-4 w-4 text-primary" />
              <span>123 Real Estate Ave, City, State 12345</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground animate-fade-in-up animate-delay-700">
          <p>&copy; 2024 EstateHub. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
