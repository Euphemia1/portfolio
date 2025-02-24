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