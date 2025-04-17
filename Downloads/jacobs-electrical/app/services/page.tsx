"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  PenToolIcon as Tool,
  Shield,
  Clock,
  Wrench,
  Lightbulb,
  Plug,
  WifiIcon,
  Camera,
  Sun,
  Thermometer,
  Cpu,
} from "lucide-react"

export default function ServicesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in")
            observer.unobserve(entry.target)
          }
          entry.target.classList.add("slide-in")
          observer.unobserve(entry.target)
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

  const mainServices = [
    {
      id: "residential",
      title: "Residential Electrical",
      description: "Complete electrical solutions for homes including installations, repairs, and upgrades.",
      icon: <Zap className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Home Electrical Wiring & Rewiring",
        "Electrical Panel Upgrades",
        "Lighting Installation & Repair",
        "Outlet & Switch Installation",
        "Ceiling Fan Installation",
        "Home Safety Inspections",
      ],
    },
    {
      id: "commercial",
      title: "Commercial Electrical",
      description: "Comprehensive electrical services for businesses, offices, and retail spaces.",
      icon: <Tool className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Commercial Wiring & Installation",
        "Office Lighting Solutions",
        "Electrical Maintenance",
        "Power Distribution Systems",
        "Emergency Lighting",
        "Energy Efficiency Upgrades",
      ],
    },
    {
      id: "industrial",
      title: "Industrial Solutions",
      description: "Specialized electrical solutions for industrial facilities and manufacturing plants.",
      icon: <Shield className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Industrial Power Systems",
        "Machine & Equipment Wiring",
        "Control Panel Installation",
        "Power Factor Correction",
        "Industrial Lighting",
        "Preventative Maintenance",
      ],
    },
    {
      id: "emergency",
      title: "Emergency Services",
      description: "24/7 emergency electrical services to address urgent electrical issues.",
      icon: <Clock className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "24/7 Emergency Response",
        "Power Outage Troubleshooting",
        "Electrical Fire Safety",
        "Circuit Breaker Repairs",
        "Emergency Lighting",
        "Temporary Power Solutions",
      ],
    },
    {
      id: "maintenance",
      title: "Maintenance & Repairs",
      description: "Regular maintenance and repair services to keep your electrical systems running smoothly.",
      icon: <Wrench className="h-12 w-12 text-primary" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Preventative Maintenance Programs",
        "Electrical Troubleshooting",
        "Circuit Repairs",
        "Equipment Testing",
        "Safety Inspections",
        "Code Compliance Updates",
      ],
    },
  ]

  const specializedServices = [
    {
      title: "Lighting Design & Installation",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      description: "Custom lighting solutions for homes and businesses.",
    },
    {
      title: "EV Charging Stations",
      icon: <Plug className="h-8 w-8 text-primary" />,
      description: "Installation of electric vehicle charging stations.",
    },
    {
      title: "Network & Data Cabling",
      icon: <WifiIcon className="h-8 w-8 text-primary" />,
      description: "Structured cabling for voice and data networks.",
    },
    {
      title: "Security Systems",
      icon: <Camera className="h-8 w-8 text-primary" />,
      description: "Installation of security cameras and alarm systems.",
    },
    {
      title: "Solar Panel Installation",
      icon: <Sun className="h-8 w-8 text-primary" />,
      description: "Clean energy solutions with solar panel systems.",
    },
    {
      title: "Smart Home Integration",
      icon: <Thermometer className="h-8 w-8 text-primary" />,
      description: "Integration of smart home devices and systems.",
    },
    {
      title: "Energy Audits",
      icon: <Cpu className="h-8 w-8 text-primary" />,
      description: "Comprehensive energy usage analysis and recommendations.",
    },
    {
      title: "Generator Installation",
      icon: <Zap className="h-8 w-8 text-primary" />,
      description: "Backup power solutions for homes and businesses.",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src="/placeholder.svg?height=800&width=1920" alt="Electrical services" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl mb-8">
              Comprehensive electrical solutions for residential, commercial, and industrial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Main Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              We offer a wide range of electrical services to meet all your needs.
            </p>
          </div>

          <div className="space-y-24">
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={`animate-on-scroll ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={800}
                    height={600}
                    className="rounded-lg shadow-xl"
                  />
                </div>
                <div className="animate-on-scroll">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button size="lg">Request This Service</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Specialized Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Beyond our main services, we offer specialized solutions to meet specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializedServices.map((service, index) => (
              <Card key={index} className="animate-on-scroll border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Our Process</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              We follow a structured approach to ensure quality and satisfaction in every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative animate-on-scroll">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Consultation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We discuss your needs and requirements to understand the scope of the project.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30"></div>
            </div>
            <div className="relative animate-on-scroll">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team conducts a thorough assessment and provides a detailed quote.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30"></div>
            </div>
            <div className="relative animate-on-scroll">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Implementation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our certified electricians complete the work with attention to detail and quality.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30"></div>
            </div>
            <div className="animate-on-scroll">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Final Inspection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We conduct a final inspection to ensure everything meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-on-scroll">
            Contact us today for a free consultation and quote on your electrical needs.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90 animate-on-scroll"
            asChild
          >
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

