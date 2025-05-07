// Import GSAP and AOS libraries
import gsap from "gsap"
import AOS from "aos"

// Preloader
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader")
  const counter = document.querySelector(".counter")
  let count = 0

  const interval = setInterval(() => {
    if (count < 100) {
      count++
      counter.textContent = count
    } else {
      clearInterval(interval)

      // GSAP Animation for preloader
      gsap.to(counter, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power2.out",
      })

      gsap.to(preloader, {
        duration: 1,
        y: "-100%",
        ease: "power2.inOut",
        delay: 0.5,
        onComplete: () => {
          preloader.style.display = "none"

          // Animate header elements
          gsap.from("header h1", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            delay: 0.2,
          })

          gsap.from(".intro-text", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            delay: 0.4,
          })

          gsap.from(".scroll-down", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            delay: 0.6,
          })
        },
      })
    }
  }, 20)

  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })
})

// Custom Cursor
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  cursor.style.left = e.clientX + "px"
  cursor.style.top = e.clientY + "px"

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px"
    cursorFollower.style.top = e.clientY + "px"
  }, 100)
})

// Cursor effects on links and buttons
const links = document.querySelectorAll("a, button")
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")

    cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)"
    cursorFollower.style.backgroundColor = "rgba(147, 112, 219, 0.2)"
    cursorFollower.style.border = "none"
  })

  link.addEventListener("mouseleave", () => {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")

    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.backgroundColor = "transparent"
    cursorFollower.style.border = "1px solid #9370DB"
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      })
    }
  })
})

// Active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
})

// Form submission
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Here you would typically add code to send the form data to a server
    // For now, we'll just show a success message

    const formElements = contactForm.elements
    let isValid = true

    // Simple validation
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].type !== "submit" && formElements[i].value.trim() === "") {
        isValid = false
        formElements[i].classList.add("is-invalid")
      } else {
        formElements[i].classList.remove("is-invalid")
      }
    }

    if (isValid) {
      // Success message
      const successMessage = document.createElement("div")
      successMessage.className = "alert alert-success mt-3"
      successMessage.textContent = "Your message has been sent successfully!"

      contactForm.appendChild(successMessage)
      contactForm.reset()

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove()
      }, 5000)
    }
  })
}

// Parallax effect for header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  const scrollPosition = window.scrollY

  if (scrollPosition < window.innerHeight) {
    header.style.backgroundPositionY = scrollPosition * 0.5 + "px"
  }
})

// Typing effect for intro text
const introText = document.querySelector(".intro-text p")
if (introText) {
  const text = introText.textContent
  introText.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      introText.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 50)
    }
  }

  // Start typing effect after preloader
  setTimeout(typeWriter, 2000)
}
