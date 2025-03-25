"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Users, Clock, Briefcase } from "lucide-react"

export default function AboutPage() {
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

  const values = [
    {
      title: "Quality",
      description: "We are committed to delivering the highest quality workmanship in every project.",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
    {
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical business practices.",
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
    },
    {
      title: "Customer Focus",
      description: "We prioritize customer satisfaction and build lasting relationships.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Reliability",
      description: "We deliver on our promises and complete projects on time and within budget.",
      icon: <Clock className="h-10 w-10 text-primary" />,
    },
  ]

  const team = [
    {
      name: "Robert Jacobs",
      position: "Founder & CEO",
      image: "/placeholder.svg?height=400&width=400",
      bio: "With over 20 years of experience in the electrical industry, Robert founded Jacobs Electrical with a vision to provide exceptional service and quality workmanship.",
    },
    {
      name: "Sarah Thompson",
      position: "Operations Manager",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Sarah oversees all operations, ensuring projects are completed efficiently and to the highest standards.",
    },
    {
      name: "Michael Chen",
      position: "Lead Electrician",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Michael brings 15 years of experience and specialized knowledge in commercial and industrial electrical systems.",
    },
    {
      name: "Emily Rodriguez",
      position: "Customer Relations",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Emily ensures our clients receive exceptional service from initial consultation through project completion.",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="About Jacobs Electrical"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-8">Learn about our company, our mission, and the team behind Jacobs Electrical.</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Our Story"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">Our Story</h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 animate-on-scroll">
                  Founded in 2005, Jacobs Electrical began as a small family business with a simple mission: to provide
                  high-quality electrical services with integrity and professionalism.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 animate-on-scroll">
                  Over the years, we've grown into a full-service electrical contractor serving residential, commercial,
                  and industrial clients throughout the region. Despite our growth, we've maintained our commitment to
                  personalized service and exceptional quality.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 animate-on-scroll">
                  Today, with a team of certified electricians and a portfolio of successful projects, we continue to
                  build on our reputation for excellence and reliability in the electrical industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                To provide exceptional electrical services that exceed client expectations through quality workmanship,
                innovative solutions, and unwavering commitment to safety and customer satisfaction.
              </p>
            </div>
            <div className="animate-on-scroll">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                To be the leading electrical contractor known for excellence, integrity, and innovation, setting the
                standard for quality and service in the electrical industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              These core values guide everything we do at Jacobs Electrical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="animate-on-scroll border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Meet the experienced professionals behind Jacobs Electrical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="animate-on-scroll">
                <div className="rounded-lg overflow-hidden mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Our Achievements</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              We take pride in our accomplishments and recognition in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-on-scroll">
              <div className="text-5xl font-bold text-primary mb-4">15+</div>
              <h3 className="text-xl font-semibold mb-2">Years in Business</h3>
              <p className="text-gray-600 dark:text-gray-300">Serving clients with excellence since 2005</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-5xl font-bold text-primary mb-4">500+</div>
              <h3 className="text-xl font-semibold mb-2">Projects Completed</h3>
              <p className="text-gray-600 dark:text-gray-300">Successfully delivered across various sectors</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-5xl font-bold text-primary mb-4">98%</div>
              <h3 className="text-xl font-semibold mb-2">Client Satisfaction</h3>
              <p className="text-gray-600 dark:text-gray-300">Based on post-project client surveys</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start animate-on-scroll">
              <Award className="h-12 w-12 text-primary mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Best Electrical Contractor 2022</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Awarded by the Regional Business Association for excellence in service and quality.
                </p>
              </div>
            </div>
            <div className="flex items-start animate-on-scroll">
              <Briefcase className="h-12 w-12 text-primary mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Safety Excellence Award 2021</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Recognized for our outstanding commitment to workplace safety and zero incidents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">Join Our Team</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-on-scroll">
            We're always looking for talented electricians and professionals to join our growing team.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90 animate-on-scroll"
            asChild
          >
            <Link href="/careers">View Careers</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

