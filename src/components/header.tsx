"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Home, Heart, User, Phone } from "lucide-react"
import { SigninModal } from "@/components/signin-modal"
import { FavoritesModal } from "@/components/favorites-modal"
import { useFavorites } from "@/components/favorites-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSigninOpen, setIsSigninOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-primary hover:scale-105 transition-transform duration-200"
            >
              <Home className="h-6 w-6" />
              <span>EstateHub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
              >
                Properties
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/agents"
                className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
              >
                Agents
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-all duration-200 hover:scale-105 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:scale-110 transition-transform duration-200"
                onClick={() => setIsFavoritesOpen(true)}
              >
                <Heart className={`h-5 w-5 ${favorites.length > 0 ? "text-red-500 fill-current" : ""}`} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-bounce">
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-200"
                onClick={() => setIsSigninOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>

              <Link href="/agents">
                <Button className="hover:scale-105 transition-transform duration-200">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Agent
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:scale-110 transition-transform duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-slide-in-right">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary  py-2 hover:translate-x-2 transition-transform duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Properties
                </Link>
                <Link
                  href="/agents"
                  className="text-foreground hover:text-primary  py-2 hover:translate-x-2 transition-transform duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agents
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors py-2 hover:translate-x-2  duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors py-2 hover:translate-x-2  duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => {
                      setIsFavoritesOpen(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    <Heart className={`h-5 w-5 ${favorites.length > 0 ? "text-red-500 fill-current" : ""}`} />
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSigninOpen(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Link href="/agents" className="flex-1">
                    <Button className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Agent
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SigninModal isOpen={isSigninOpen} onClose={() => setIsSigninOpen(false)} />
      <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </>
  )
}
