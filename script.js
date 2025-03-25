document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
    
        // Toggle menu on click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    });
    

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Skills data
    const skills = [
        { name: 'HTML & CSS', tech: 'HTML5, CSS3, Responsive Design', description: 'Building structured, semantic HTML and styling with modern CSS techniques for responsive layouts.' },
        { name: 'JavaScript', tech: 'ES6+, DOM Manipulation', description: 'Creating interactive and dynamic web experiences with modern JavaScript.' },
        { name: 'PHP Development', tech: 'PHP 7+, OOP, MVC', description: 'Developing server-side logic and integrating with databases using PHP.' },
        { name: 'MySQL', tech: 'Database Design, SQL Queries', description: 'Designing efficient database schemas and writing optimized SQL queries for data management.' },
        { name: 'UI/UX Design', tech: 'Responsive Design, CSS Frameworks', description: 'Creating intuitive and visually appealing user interfaces with a focus on user experience.' },
        { name: 'Version Control', tech: 'Git, GitHub', description: 'Managing code versions efficiently and collaborating effectively through Git and GitHub.' },
        { name: 'Web Performance', tech: 'Optimization, SEO', description: 'Optimizing web applications for speed, accessibility, and search engine visibility.' },
        { name: 'Front-End Frameworks', tech: 'Bootstrap, jQuery', description: 'Utilizing popular front-end frameworks to build responsive and consistent user interfaces.' }
    ];

    // Populate skills section
    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <h3>${skill.name}</h3>
            <p><strong>${skill.tech}</strong></p>
            <p>${skill.description}</p>
        `;
        skillsGrid.appendChild(skillItem);
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Projects Section JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize projects section
    initProjectsSection()
  })
  
  function initProjectsSection() {
    // Get all project cards and filter buttons
    const projectCards = document.querySelectorAll(".project-card")
    const filterButtons = document.querySelectorAll(".filter-btn")
  
    // Add animation classes with delay to create staggered effect
    projectCards.forEach((card, index) => {
      // Set initial state for animation
      card.style.animationDelay = `${0.1 + index * 0.1}s`
    })
  
    // Add click event listeners to filter buttons
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Get filter value
        const filterValue = this.getAttribute("data-filter")
  
        // Filter projects
        filterProjects(filterValue, projectCards)
      })
    })
  
    // Add hover effects for project cards
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        // Add subtle floating animation
        this.style.transform = "translateY(-10px)"
        this.style.boxShadow = "0 15px 40px rgba(var(--primary-rgb), 0.15)"
      })
  
      card.addEventListener("mouseleave", function () {
        // Remove floating animation
        this.style.transform = "translateY(0)"
        this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
      })
    })
  
    // Add scroll reveal animation
    window.addEventListener("scroll", revealProjects)
  
    // Call once to check initial state
    revealProjects()
  }
  
  // Filter projects based on category
  function filterProjects(category, projectCards) {
    projectCards.forEach((card) => {
      // Get card categories
      const cardCategories = card.getAttribute("data-category")
  
      // Reset animations
      card.style.animation = "none"
      card.offsetHeight // Trigger reflow
  
      if (category === "all" || cardCategories.includes(category)) {
        // Show card with animation
        card.style.display = "block"
        card.style.animation = "fadeInUp 0.6s forwards"
  
        // Add small delay for staggered effect
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100)
      } else {
        // Hide card with animation
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
  
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  }
  
  // Reveal projects on scroll
  function revealProjects() {
    const projectsSection = document.getElementById("projects")
    const projectCards = document.querySelectorAll(".project-card")
  
    if (!projectsSection) return
  
    const sectionPosition = projectsSection.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3
  
    if (sectionPosition < screenPosition) {
      projectCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100 * index)
      })
    }
  }
  
  // Add parallax effect to projects section
  window.addEventListener("scroll", () => {
    const projectsSection = document.getElementById("projects")
  
    if (!projectsSection) return
  
    const scrollPosition = window.pageYOffset
    const sectionOffset = projectsSection.offsetTop
    const distance = scrollPosition - sectionOffset
  
    if (distance > -500 && distance < 500) {
      // Create subtle parallax effect for background
      projectsSection.style.backgroundPosition = `center ${distance * 0.05}px`
    }
  })
  
  // Add interactive hover effects for project cards
  document.addEventListener("mousemove", (e) => {
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenterX = cardRect.left + cardRect.width / 2
      const cardCenterY = cardRect.top + cardRect.height / 2
  
      const distanceX = (e.clientX - cardCenterX) / 20
      const distanceY = (e.clientY - cardCenterY) / 20
  
      // Only apply effect if mouse is relatively close to the card
      const distance = Math.sqrt(Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2))
  
      if (distance < 300) {
        // Apply subtle tilt effect based on mouse position
        card.style.transform = `perspective(1000px) rotateY(${distanceX * 0.2}deg) rotateX(${-distanceY * 0.2}deg) translateY(-5px)`
      } else {
        card.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)"
      }
    })
  })
  
  // Add this to your existing script.js file
  document.addEventListener("DOMContentLoaded", () => {
    // Add projects link to navigation
    const navLinks = document.getElementById("nav-links")
    const contactLink = document.querySelector('a[href="#contact"]').parentElement
  
    if (navLinks && contactLink) {
      const projectsLi = document.createElement("li")
      const projectsLink = document.createElement("a")
      projectsLink.href = "#projects"
      projectsLink.textContent = "Projects"
      projectsLi.appendChild(projectsLink)
  
      navLinks.insertBefore(projectsLi, contactLink)
    }
  })
  
  // Add this to your existing script.js file

// Variables for theme
const root = document.documentElement
const themeToggle = document.getElementById("theme-toggle")
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

// Theme colors
const lightTheme = {
  "--bg-color": "#ffffff",
  "--text-color": "#333333",
  "--text-muted": "#666666",
  "--primary-color": "#4a6cf7",
  "--primary-rgb": "74, 108, 247",
  "--accent-color": "#6e8eff",
  "--card-bg": "#ffffff",
  "--border-color": "#e0e0e0",
}

const darkTheme = {
  "--bg-color": "#121212",
  "--text-color": "#f5f5f5",
  "--text-muted": "#aaaaaa",
  "--primary-color": "#4a6cf7",
  "--primary-rgb": "74, 108, 247",
  "--accent-color": "#6e8eff",
  "--card-bg": "#1e1e1e",
  "--border-color": "#333333",
}

// Set initial theme based on user preference or saved theme
function setInitialTheme() {
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    applyTheme(darkTheme)
    document.body.classList.add("dark-theme")
  } else {
    applyTheme(lightTheme)
    document.body.classList.remove("dark-theme")
  }
}

// Apply theme by setting CSS variables
function applyTheme(theme) {
  for (const [property, value] of Object.entries(theme)) {
    root.style.setProperty(property, value)
  }
}

// Toggle between light and dark themes
function toggleTheme() {
  if (document.body.classList.contains("dark-theme")) {
    applyTheme(lightTheme)
    document.body.classList.remove("dark-theme")
    localStorage.setItem("theme", "light")
  } else {
    applyTheme(darkTheme)
    document.body.classList.add("dark-theme")
    localStorage.setItem("theme", "dark")
  }
}

// Dummy function for initProjectsSection to prevent errors. Replace with actual implementation.
function initProjectsSection() {
  // Your actual implementation for initializing the projects section would go here.
  console.log("Initializing projects section (placeholder)")
}

// Initialize theme
document.addEventListener("DOMContentLoaded", () => {
  setInitialTheme()

  // Add event listener for theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Initialize projects section
  initProjectsSection()
})

