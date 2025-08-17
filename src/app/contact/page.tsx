import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Contact Us - EstateHub",
  description:
    "Get in touch with EstateHub. Contact our real estate experts for property inquiries, consultations, and professional assistance.",
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us during business hours",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@estatehub.com", "support@estatehub.com"],
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Real Estate Ave", "Downtown, NY 10001"],
      description: "Visit our main office",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9AM-7PM", "Sat-Sun: 10AM-5PM"],
      description: "We're here when you need us",
    },
  ]

  const agents = [
    {
      name: "Sarah Johnson",
      role: "Senior Agent",
      phone: "+1 (555) 123-4567",
      email: "sarah@estatehub.com",
      image: "/images/professional-realtor-women.png",
      specialties: ["Luxury Homes", "Investment Properties"],
    },
    {
      name: "Michael Chen",
      role: "Property Specialist",
      phone: "+1 (555) 234-5678",
      email: "michael@estatehub.com",
      image: "/images/professional-asian-man.png",
      specialties: ["First-Time Buyers", "Condominiums"],
    },
    {
      name: "Emily Rodriguez",
      role: "Market Analyst",
      phone: "+1 (555) 345-6789",
      email: "emily@estatehub.com",
      image: "/images/latina-realtor.png",
      specialties: ["Market Analysis", "Commercial Properties"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to find your dream property? Get in touch with our expert team for personalized assistance and
              professional real estate guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={info.title}
                className="text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="font-medium text-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-left">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                      <Input placeholder="Property Inquiry" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                      <Textarea placeholder="Tell us about your property needs or any questions you have..." rows={5} />
                    </div>
                    <Button className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="animate-fade-in-right">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Visit Our Office
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Come see us at our downtown location for in-person consultations.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-80 flex items-center justify-center mb-6">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">123 Real Estate Ave, Downtown, NY 10001</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">123 Real Estate Ave</p>
                        <p className="text-sm text-muted-foreground">Downtown, NY 10001</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-7PM, Weekends: 10AM-5PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Contact Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Contact Our Agents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Speak directly with our experienced agents who specialize in different areas of real estate.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <Card
                key={agent.name}
                className="hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <p className="text-primary font-medium">{agent.role}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm">{agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-sm">{agent.email}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty) => (
                        <span key={specialty} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact {agent.name.split(" ")[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
