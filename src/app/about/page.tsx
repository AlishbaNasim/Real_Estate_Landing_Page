import type { Metadata } from "next"
import Image from "next/image"
import { Award, Users, Home, TrendingUp, Heart, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - EstateHub",
  description:
    "Learn about EstateHub, your trusted real estate partner with years of experience in helping clients find their dream homes.",
}

export default function AboutPage() {
  const stats = [
    { icon: Home, label: "Properties Sold", value: "2,500+" },
    { icon: Users, label: "Happy Clients", value: "1,800+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: TrendingUp, label: "Market Growth", value: "25%" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Client-Focused",
      description:
        "We put our clients first, understanding their unique needs and preferences to find the perfect property match.",
    },
    {
      icon: Shield,
      title: "Trusted Expertise",
      description:
        "With over 15 years in the market, our team brings unmatched knowledge and professional integrity to every transaction.",
    },
    {
      icon: TrendingUp,
      title: "Market Leaders",
      description:
        "We stay ahead of market trends and use cutting-edge technology to provide the best service and results.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/images/professional-realtor-women.png",
      bio: "With 15+ years in real estate, Sarah founded EstateHub to revolutionize property buying and selling experiences.",
    },
    {
      name: "Michael Chen",
      role: "Senior Agent",
      image: "/images/professional-asian-man.png",
      bio: "Michael specializes in luxury properties and has helped over 500 families find their dream homes.",
    },
    {
      name: "Emily Rodriguez",
      role: "Market Analyst",
      image: "/images/latina-realtor.png",
      bio: "Emily provides market insights and investment guidance, helping clients make informed property decisions.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">EstateHub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We&apos;re passionate about connecting people with their perfect homes. Our mission is to make real estate
              transactions seamless, transparent, and rewarding for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2009, EstateHub began with a simple vision: to transform the real estate experience through
                  technology, transparency, and genuine care for our clients.
                </p>
                <p>
                  What started as a small local agency has grown into a trusted name in real estate, serving thousands
                  of families and investors across the region. We&apos;ve embraced innovation while maintaining the personal
                  touch that sets us apart.
                </p>
                <p>
                  Today, we continue to push boundaries, using cutting-edge tools and market insights to deliver
                  exceptional results for our clients, whether they&apos;re first-time buyers or seasoned investors.
                </p>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/luxury-house.png"
                  alt="EstateHub office building"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we serve our clients.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced professionals are dedicated to helping you achieve your real estate goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="bg-card rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
