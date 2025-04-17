"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Zap, PenToolIcon as Tool, Shield, Clock, Star } from "lucide-react"

export default function Home() {
  const animatedElementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  const services = [
    {
      title: "Residential Electrical",
      description: "Complete electrical solutions for homes including installations, repairs, and upgrades.",
      icon: <Zap className="h-10 w-10 text-primary" />,
      link: "/services#residential",
    },
    {
      title: "Commercial Electrical",
      description: "Comprehensive electrical services for businesses, offices, and retail spaces.",
      icon: <Tool className="h-10 w-10 text-primary" />,
      link: "/services#commercial",
    },
    {
      title: "Industrial Solutions",
      description: "Specialized electrical solutions for industrial facilities and manufacturing plants.",
      icon: <Shield className="h-10 w-10 text-primary" />,
      link: "/services#industrial",
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency electrical services to address urgent electrical issues.",
      icon: <Clock className="h-10 w-10 text-primary" />,
      link: "/services#emergency",
    },
  ]

  const projects = [
    {
      title: "Modern Office Complex",
      category: "Commercial",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Luxury Residential Development",
      category: "Residential",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Industrial Facility Upgrade",
      category: "Industrial",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Electrical services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 fade-in">
              Professional Electrical Services
            </h1>
            <p className="text-xl text-white/90 mb-8 fade-in animate-delay-200">
              Providing high-quality electrical solutions for residential, commercial, and industrial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 fade-in animate-delay-300">
              <Button size="lg" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                asChild
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              We offer a comprehensive range of electrical services to meet all your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="animate-on-scroll border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <Link href={service.link} className="inline-flex items-center text-primary hover:underline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="About Jacobs Electrical"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">About Jacobs Electrical</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 animate-on-scroll">
                With over 15 years of experience, Jacobs Electrical has been providing top-quality electrical services
                to residential, commercial, and industrial clients.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start animate-on-scroll">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold">Certified Professionals</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our team consists of fully certified and experienced electricians.
                    </p>
                  </div>
                </div>
                <div className="flex items-start animate-on-scroll">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold">Quality Guarantee</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      We stand behind our work with a 100% satisfaction guarantee.
                    </p>
                  </div>
                </div>
                <div className="flex items-start animate-on-scroll">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold">Timely Service</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      We value your time and always complete projects on schedule.
                    </p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="animate-on-scroll" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Our Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Take a look at some of our recent electrical projects across various sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg animate-on-scroll">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <span className="text-primary font-medium mb-2">{project.category}</span>
                  <h3 className="text-xl text-white font-semibold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="animate-on-scroll">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  "Jacobs Electrical provided exceptional service for our office renovation. Their team was
                  professional, efficient, and the quality of work was outstanding."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">John Smith</h4>
                    <p className="text-sm text-gray-500">CEO, Smith Enterprises</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  "We've been using Jacobs Electrical for all our residential projects. They are reliable,
                  knowledgeable, and always deliver on time and within budget."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Homeowner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  "The team at Jacobs Electrical helped us with a complex industrial installation. Their expertise and
                  attention to detail made the project a success."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Michael Brown</h4>
                    <p className="text-sm text-gray-500">Operations Manager, Brown Manufacturing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-on-scroll">
            Contact us today for a free consultation and quote on your electrical needs.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90 animate-on-scroll"
            asChild
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

