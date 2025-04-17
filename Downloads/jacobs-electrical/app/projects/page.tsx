"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")

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

  const projects = [
    {
      title: "Modern Office Complex",
      category: "commercial",
      description:
        "Complete electrical installation for a new 5-story office building, including power distribution, lighting, and network infrastructure.",
      image: "/placeholder.svg?height=600&width=800",
      location: "London Business District",
      year: "2023",
    },
    {
      title: "Luxury Residential Development",
      category: "residential",
      description:
        "Electrical systems for a high-end residential complex with 25 units, featuring smart home integration and energy-efficient solutions.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Kensington, London",
      year: "2022",
    },
    {
      title: "Manufacturing Plant Upgrade",
      category: "industrial",
      description:
        "Comprehensive upgrade of electrical systems for a manufacturing facility, improving efficiency and safety compliance.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Manchester Industrial Park",
      year: "2023",
    },
    {
      title: "Retail Chain Lighting Retrofit",
      category: "commercial",
      description:
        "Energy-efficient lighting retrofit for a national retail chain across 15 locations, reducing energy consumption by 40%.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Multiple Locations, UK",
      year: "2022",
    },
    {
      title: "Smart Home Integration",
      category: "residential",
      description:
        "Complete smart home system installation for a luxury villa, including automated lighting, security, and climate control.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Surrey, UK",
      year: "2023",
    },
    {
      title: "Data Center Power Systems",
      category: "industrial",
      description:
        "Design and installation of redundant power systems for a new data center, ensuring 99.999% uptime reliability.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Birmingham Tech Park",
      year: "2021",
    },
    {
      title: "Hotel Renovation",
      category: "commercial",
      description:
        "Complete electrical renovation for a historic hotel, modernizing systems while preserving architectural integrity.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Edinburgh, Scotland",
      year: "2022",
    },
    {
      title: "Apartment Complex Rewiring",
      category: "residential",
      description:
        "Full rewiring project for a 50-unit apartment complex, upgrading outdated electrical systems to modern standards.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Liverpool, UK",
      year: "2021",
    },
    {
      title: "Solar Farm Installation",
      category: "industrial",
      description:
        "Electrical work for a 5MW solar farm, including inverter systems, monitoring equipment, and grid connection.",
      image: "/placeholder.svg?height=600&width=800",
      location: "Yorkshire, UK",
      year: "2023",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src="/placeholder.svg?height=800&width=1920" alt="Our Projects" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl mb-8">
              Explore our portfolio of successful electrical projects across various sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="min-w-[120px]"
            >
              All Projects
            </Button>
            <Button
              variant={filter === "residential" ? "default" : "outline"}
              onClick={() => setFilter("residential")}
              className="min-w-[120px]"
            >
              Residential
            </Button>
            <Button
              variant={filter === "commercial" ? "default" : "outline"}
              onClick={() => setFilter("commercial")}
              className="min-w-[120px]"
            >
              Commercial
            </Button>
            <Button
              variant={filter === "industrial" ? "default" : "outline"}
              onClick={() => setFilter("industrial")}
              className="min-w-[120px]"
            >
              Industrial
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="animate-on-scroll overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full capitalize">
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="text-sm text-gray-500">
                    <span>Location: {project.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Featured Case Studies</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Dive deeper into some of our most challenging and innovative projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-on-scroll">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Commercial Office Complex"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold mb-4">Commercial Office Complex</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This landmark project involved the complete electrical design and installation for a new 10-story office
                building in central London. Our team was responsible for all aspects of the electrical infrastructure,
                from power distribution to lighting, security, and network systems.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Challenge</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Integrating modern electrical systems while meeting strict energy efficiency requirements and tight
                    project timelines.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Solution</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Implemented a smart building management system with energy monitoring and automated controls to
                    optimize efficiency.
                  </p>
                </div>
              </div>
              <Button>Read Full Case Study</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-dense">
            <div className="animate-on-scroll lg:col-start-2">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Industrial Facility Upgrade"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold mb-4">Industrial Facility Upgrade</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This project involved a comprehensive electrical upgrade for a manufacturing facility that needed to
                maintain operations during the renovation. Our team developed a phased implementation plan to minimize
                disruption while modernizing all electrical systems.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Challenge</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Upgrading critical electrical systems without interrupting the 24/7 manufacturing operations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Solution</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Developed a detailed phasing plan with temporary power solutions and weekend work for critical
                    switchovers.
                  </p>
                </div>
              </div>
              <Button>Read Full Case Study</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Client Testimonials</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Here's what our clients say about our project work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-6">
                  "Jacobs Electrical exceeded our expectations on our office renovation project. Their team was
                  professional, responsive, and delivered exceptional quality work on time and within budget."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">David Wilson</h4>
                    <p className="text-sm text-gray-500">Facilities Manager, Wilson Enterprises</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-6">
                  "The team at Jacobs Electrical was instrumental in the success of our manufacturing plant upgrade.
                  Their expertise in industrial electrical systems and attention to detail made all the difference."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Jennifer Adams</h4>
                    <p className="text-sm text-gray-500">Operations Director, Adams Manufacturing</p>
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
            Contact us today to discuss how we can help with your electrical needs.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 animate-on-scroll">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  )
}

