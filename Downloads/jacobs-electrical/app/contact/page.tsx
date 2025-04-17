"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-primary to-blue-900"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl mb-8">
              Get in touch with our team for inquiries, quotes, or to discuss your electrical needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Call us directly</p>
                <a href="tel:+441234567890" className="text-primary hover:underline">
                  +44 123 456 7890
                </a>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Send us an email</p>
                <a href="mailto:info@jacobselectrical.com" className="text-primary hover:underline">
                  info@jacobselectrical.com
                </a>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Visit our office</p>
                <address className="not-italic text-primary">
                  123 Electrical Avenue
                  <br />
                  London, UK
                </address>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hours</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Our working hours</p>
                <p className="text-primary">
                  Monday - Friday: 8am - 6pm
                  <br />
                  Saturday: 9am - 1pm
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <Card className="border-green-500 bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center text-green-600 dark:text-green-400 mb-4">
                      <CheckCircle className="h-6 w-6 mr-2" />
                      <h3 className="text-xl font-semibold">Message Sent!</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Thank you for contacting us. We'll respond to your inquiry shortly.
                    </p>
                    <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+44 123 456 7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6">Our Location</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Visit our office or send us mail at the address below.
              </p>
              <div className="rounded-lg overflow-hidden h-[400px] bg-gray-200 mb-6">
                {/* This would be replaced with an actual map component */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <p>Interactive Map Would Be Displayed Here</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <address className="not-italic text-gray-600 dark:text-gray-300">
                      123 Electrical Avenue
                      <br />
                      London, SW1A 1AA
                      <br />
                      United Kingdom
                    </address>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Friday: 8am - 6pm
                      <br />
                      Saturday: 9am - 1pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Do you offer emergency services?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we provide 24/7 emergency electrical services. Call our emergency line at +44 123 456 7890 for
                  immediate assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">How quickly can you start a project?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our response time depends on the project scope and our current schedule. For small projects, we can
                  often begin within a few days. Larger projects may require more planning time.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Are your electricians certified?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, all our electricians are fully certified, licensed, and insured. We maintain rigorous training
                  standards to ensure the highest quality of work.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Do you provide free quotes?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we offer free quotes for all projects. Contact us with your requirements, and we'll provide a
                  detailed estimate with no obligation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll">Need Immediate Assistance?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-on-scroll">
            Call our customer service line for immediate help with your electrical needs.
          </p>
          <div className="text-3xl font-bold mb-8 animate-on-scroll">+44 123 456 7890</div>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 animate-on-scroll">
            Request a Callback
          </Button>
        </div>
      </section>
    </div>
  )
}

