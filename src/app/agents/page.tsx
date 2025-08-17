import type { Metadata } from "next"
import Image from "next/image"
import { Phone, Mail, Star, Award, Home, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Our Agents - EstateHub",
  description:
    "Meet our experienced real estate agents. Find the perfect agent to help you buy, sell, or rent your next property.",
}

export default function AgentsPage() {
  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Real Estate Agent",
      image: "/images/professional-realtor-women.png",
      rating: 4.9,
      reviews: 127,
      propertiesSold: 245,
      yearsExperience: 8,
      specialties: ["Luxury Homes", "Investment Properties", "First-Time Buyers"],
      bio: "Sarah is a dedicated professional with over 8 years of experience in luxury real estate. She has helped hundreds of families find their dream homes and has consistently been a top performer in our agency.",
      phone: "+1 (555) 123-4567",
      email: "sarah@estatehub.com",
      languages: ["English", "Spanish"],
      certifications: ["Certified Residential Specialist", "Luxury Home Marketing Specialist"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Specialist",
      image: "/images/asian-realtor.png",
      rating: 4.8,
      reviews: 89,
      propertiesSold: 178,
      yearsExperience: 6,
      specialties: ["Condominiums", "Commercial Properties", "Investment Analysis"],
      bio: "Michael brings analytical expertise and market knowledge to every transaction. His background in finance helps clients make informed investment decisions in today's competitive market.",
      phone: "+1 (555) 234-5678",
      email: "michael@estatehub.com",
      languages: ["English", "Mandarin", "Cantonese"],
      certifications: ["Commercial Real Estate License", "Investment Property Specialist"],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Market Analyst & Agent",
      image: "/images/latina-realtor.png",
      rating: 4.9,
      reviews: 156,
      propertiesSold: 203,
      yearsExperience: 7,
      specialties: ["Market Analysis", "Residential Sales", "Relocation Services"],
      bio: "Emily combines deep market insights with personalized service. Her analytical approach and warm personality make her a favorite among clients looking for data-driven real estate decisions.",
      phone: "+1 (555) 345-6789",
      email: "emily@estatehub.com",
      languages: ["English", "Spanish", "Portuguese"],
      certifications: ["Relocation Specialist", "Market Analysis Expert"],
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Luxury Property Expert",
      image: "/images/luxury-realtor.png",
      rating: 4.9,
      reviews: 94,
      propertiesSold: 156,
      yearsExperience: 10,
      specialties: ["Luxury Estates", "Waterfront Properties", "High-End Condos"],
      bio: "David specializes in luxury properties and has an extensive network of high-net-worth clients. His attention to detail and discretion make him the go-to agent for premium real estate.",
      phone: "+1 (555) 456-7890",
      email: "david@estatehub.com",
      languages: ["English", "French"],
      certifications: ["Luxury Home Marketing Specialist", "Certified Luxury Home Marketing Specialist"],
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "First-Time Buyer Specialist",
      image: "/images/friendly-asian.png",
      rating: 4.8,
      reviews: 112,
      propertiesSold: 189,
      yearsExperience: 5,
      specialties: ["First-Time Buyers", "FHA Loans", "Affordable Housing"],
      bio: "Lisa is passionate about helping first-time buyers navigate the complex process of purchasing their first home. Her patient approach and extensive knowledge of financing options make homeownership accessible.",
      phone: "+1 (555) 567-8901",
      email: "lisa@estatehub.com",
      languages: ["English", "Korean"],
      certifications: ["First-Time Buyer Specialist", "FHA Loan Expert"],
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Commercial Real Estate Agent",
      image: "/images/hispanic-realtor.png",
      rating: 4.7,
      reviews: 73,
      propertiesSold: 134,
      yearsExperience: 9,
      specialties: ["Commercial Properties", "Industrial Real Estate", "Investment Properties"],
      bio: "Robert focuses on commercial real estate transactions and has helped numerous businesses find the perfect locations. His understanding of zoning laws and commercial financing is unmatched.",
      phone: "+1 (555) 678-9012",
      email: "robert@estatehub.com",
      languages: ["English", "Spanish"],
      certifications: ["Commercial Real Estate License", "Industrial Property Specialist"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Meet Our <span className="text-primary">Agents</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our experienced team of real estate professionals is here to guide you through every step of your property
              journey with expertise and personalized service.
            </p>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <Card
                key={agent.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <p className="text-primary font-medium">{agent.role}</p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{agent.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({agent.reviews} reviews)</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Home className="w-4 h-4 text-primary" />
                        <span className="font-bold text-lg">{agent.propertiesSold}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Properties Sold</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="font-bold text-lg">{agent.yearsExperience}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Years Experience</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{agent.bio}</p>

                  {/* Specialties */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {agent.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{agent.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Languages:</p>
                    <p className="text-sm text-muted-foreground">{agent.languages.join(", ")}</p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>

                  <Button className="w-full" size="sm">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Work with Our Team?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you&apos;re buying, selling, or investing, our agents are here to provide expert guidance and
              personalized service tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Users className="w-4 h-4 mr-2" />
                Contact Our Team
              </Button>
              <Button variant="outline" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
