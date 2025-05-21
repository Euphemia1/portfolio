document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or prefer color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      body.classList.add('dark-mode');
      icon.classList.replace('fa-moon', 'fa-sun');
  }
  
  // Theme toggle button
  themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
          icon.classList.replace('fa-moon', 'fa-sun');
      } else {
          localStorage.setItem('theme', 'light');
          icon.classList.replace('fa-sun', 'fa-moon');
      }
  });
  
  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
      });
  });
  
  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Skills Filter
  const skillCategories = document.querySelectorAll('.skill-category');
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCategories.forEach(category => {
      category.addEventListener('click', () => {
          // Update active category
          skillCategories.forEach(c => c.classList.remove('active'));
          category.classList.add('active');
          
          const categoryName = category.dataset.category;
          
          // Filter skills
          skillCards.forEach(card => {
              if (categoryName === 'all' || card.classList.contains(categoryName)) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });
  
  // Form submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const formData = new FormData(this);
          const data = {};
          formData.forEach((value, key) => {
              data[key] = value;
          });
          
          // Here you would typically send the data to a server
          console.log('Form submitted:', data);
          
          // Show success message
          alert('Thank you for your message! I will get back to you soon.');
          this.reset();
      });
  }
  
  // Animate elements when they come into view
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.section, .project-card, .timeline-item, .skill-card');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.classList.add('animate__animated', 'animate__fadeInUp');
          }
      });
  };
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Typewriter effect for hero section
  const typewriterText = document.querySelector('.typewriter h2');
  if (typewriterText) {
      const texts = ["Front-End Developer", "UI/UX Enthusiast", "Problem Solver"];
      let count = 0;
      let index = 0;
      let currentText = "";
      let letter = "";
      
      (function type() {
          if (count === texts.length) {
              count = 0;
          }
          
          currentText = texts[count];
          letter = currentText.slice(0, ++index);
          
          typewriterText.textContent = letter;
          
          if (letter.length === currentText.length) {
              count++;
              index = 0;
              setTimeout(type, 2000);
          } else {
              setTimeout(type, 100);
          }
      })();
  }
  
  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const angleX = (y - centerY) / 20;
          const angleY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
      
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
  });
});