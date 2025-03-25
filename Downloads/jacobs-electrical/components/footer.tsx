import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Jacobs Electrical</h3>
            <p className="mb-6 text-gray-300">
              Professional electrical services for residential and commercial needs. Quality work, reliable service, and
              customer satisfaction guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services#residential" className="text-gray-300 hover:text-primary transition-colors">
                  Residential Electrical
                </Link>
              </li>
              <li>
                <Link href="/services#commercial" className="text-gray-300 hover:text-primary transition-colors">
                  Commercial Electrical
                </Link>
              </li>
              <li>
                <Link href="/services#industrial" className="text-gray-300 hover:text-primary transition-colors">
                  Industrial Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#emergency" className="text-gray-300 hover:text-primary transition-colors">
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-gray-300 hover:text-primary transition-colors">
                  Maintenance & Repairs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 text-primary mt-1" size={18} />
                <span className="text-gray-300">123 Electrical Avenue, London, UK</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary" size={18} />
                <span className="text-gray-300">+44 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary" size={18} />
                <span className="text-gray-300">info@jacobselectrical.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Jacobs Electrical Limited. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="hover:text-primary transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

