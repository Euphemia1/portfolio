window.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    initChatWidget();

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

/* --- Virtual Euphemia & Knowledge Base --- */
const knowledgeBase = {
    profile: {
        name: "Euphemia Chikungulu",
        role: "Software Engineer",
        experience: "1 Year",
        focus: "Community-driven, inclusive technology",
        mission: "Build accessible systems that empower communities",
        achievements: ["Hackathon Semi-Finalist", "Africa2Silicon Valley Semi-Finalist"],
        impact: "3 industries, 5+ projects",
        approach: [
            "User-first design thinking",
            "Accessibility-focused development",
            "Community impact driven",
            "Clean, maintainable code"
        ]
    },
    skills: {
        frontend: ["React", "JavaScript", "HTML/CSS", "Tailwind CSS", "TypeScript", "Next.js"],
        backend: ["Node.js", "Express", "PHP", "RESTful APIs", "Laravel"],
        databases: ["Supabase", "MySQL", "Firebase", "PostgreSQL"],
        tools: ["Git", "GitHub", "Netlify", "Postman", "Figma", "Vercel"],
        softSkills: ["Community engagement", "UX design", "Problem-solving", "Mentorship"]
    },
    projects: [
        {
            name: "Smart Logistics Dashboard",
            description: "Real-time logistics tracking and management system with predictive analytics for supply chain optimization.",
            problemSolved: "Optimizes supply chain efficiency and transparency for logistics providers, empowering vendors with real-time data.",
            techStack: { frontend: "React", backend: "Node.js (Serverless)", database: "Supabase" },
            features: ["Real-time delivery tracking", "Inventory management analytics", "Automated reporting"],
            role: "Full-stack Developer",
            link: "https://nyamula.com"
        },
        {
            name: "FlowCheck",
            description: "A modern web application for workflow management and process optimization.",
            problemSolved: "Reduces operational bottlenecks for small businesses, helping them scale more efficiently through automation.",
            techStack: { frontend: "React, JavaScript", backend: "Netlify Functions", database: "Supabase" },
            features: ["Process visualization", "Automated status updates", "Team collaboration tools"],
            role: "Lead Software Engineer",
            link: "https://flowcheck.netlify.app/"
        },
        {
            name: "EcoWaste",
            description: "Sustainable waste management platform with impact dashboard.",
            problemSolved: "Bridges the gap between waste collection and recycling data, promoting environmental sustainability in urban areas.",
            techStack: { frontend: "Next.js, TypeScript", backend: "Vercel Functions", database: "Supabase" },
            features: ["Carbon footprint tracker", "Impact visualization with Chart.js", "Community waste management maps"],
            role: "Frontend Specialist",
            link: "https://ecowaste-omega.vercel.app/"
        }
    ],
    challenge: {
        name: "New Year New Me",
        goals: [
            "Master Advanced React patterns",
            "Contribute to 5 major open-source projects",
            "Mentor 10 junior developers",
            "Build a personal AI assistant (Virtual Euphemia!)"
        ],
        status: "In Progress"
    },
    articles: [
        { title: "Building Inclusive Tech Solutions in Africa", date: "March 2025", category: "Tech Innovation", summary: "Exploring how technology can bridge gaps in healthcare, education, and financial services in the African context." },
        { title: "The Power of Purpose-Driven Development", date: "February 2025", category: "Community Impact", summary: "How focusing on community needs drives better software solutions and user empowerment." },
        { title: "From Student to Software Engineer", date: "January 2025", category: "Career Journey", summary: "Lessons learned through real-world software development experiences and the transition into the industry." }
    ]
};

let uploadedImage = null; // Global to store image for current session

async function initChatWidget() {
    if (!document.getElementById('chat-widget-container')) {
        createChatWidgetHTML();
    }

    const toggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input');

    setupImageUpload();

    // Toggle Chat Window
    document.body.addEventListener('click', function (e) {
        if (e.target.closest('#chat-toggle-btn') || e.target.closest('#chat-close-btn')) {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) {
                setTimeout(() => chatInput.focus(), 100);
            }
        }
    });

    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
}

function setupImageUpload() {
    const imageBtn = document.getElementById('chat-image-btn');
    const fileInput = document.getElementById('chat-image-upload');

    if (imageBtn && fileInput) {
        imageBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', function (e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (!file.type.match('image.*')) {
                    alert('Please select an image file.');
                    return;
                }
                const reader = new FileReader();
                reader.onload = function (readerEvent) {
                    uploadedImage = readerEvent.target.result;
                    imageBtn.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745;"></i>';
                    showImagePreview(uploadedImage);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function showImagePreview(imageData) {
    let preview = document.getElementById('image-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.id = 'image-preview';
        preview.style.cssText = `position: absolute; bottom: 80px; right: 0; width: 100px; height: 100px; border: 2px solid #3a59d1; border-radius: 8px; overflow: hidden; z-index: 1001; background: white;`;

        const img = document.createElement('img');
        img.src = imageData;
        img.style.cssText = `width: 100%; height: 100%; object-fit: cover;`;

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.style.cssText = `position: absolute; top: 2px; right: 2px; background: red; color: white; border: none; border-radius: 50%; cursor: pointer;`;

        removeBtn.onclick = function () {
            preview.remove();
            uploadedImage = null;
            document.getElementById('chat-image-btn').innerHTML = '<i class="fas fa-image"></i>';
        };

        preview.appendChild(img);
        preview.appendChild(removeBtn);
        document.body.appendChild(preview);
    }
}

async function handleSendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    if (!message && !uploadedImage) return;

    const imageToSend = uploadedImage;

    if (imageToSend) {
        appendMessageWithImage(message || 'Analyzing this image...', imageToSend);
    } else {
        appendMessage(message, 'user');
    }

    chatInput.value = '';
    uploadedImage = null;
    const preview = document.getElementById('image-preview');
    if (preview) preview.remove();
    document.getElementById('chat-image-btn').innerHTML = '<i class="fas fa-image"></i>';

    const typingId = showTypingIndicator();

    try {
        // If it's a persona selection, we can inject a slightly different persona-aware prompt
        const prompt = constructPrompt(message || "Please describe and analyze this image in the context of your work.");
        const response = await callGeminiAPI(prompt, imageToSend);

        removeTypingIndicator(typingId);
        appendMessage(response, 'ai');
    } catch (error) {
        removeTypingIndicator(typingId);
        appendMessage(`Error: ${error.message}`, 'ai');
    }
}

// Fixed function to handle Persona Clicks
async function handlePersonaSelection(persona) {
    const personaMessages = {
        'Developer': "I'm a fellow Developer! I'd love to know more about your tech stack and how you approach complex problems.",
        'Hiring': "I'm looking to hire or collaborate. Could you highlight your most impactful projects and your professional experience?",
        'Student': "I'm a Student looking for inspiration. Can you tell me about your journey and any advice you have for someone starting out?",
        'Business': "I have a Business Inquiry. I'm interested in your professional services or potential partnerships."
    };

    const userMessage = personaMessages[persona];
    appendMessage(userMessage, 'user');

    const typingId = showTypingIndicator();

    // Add specific context to the prompt for the persona
    const personaContext = `The user has identified as a ${persona}. Tailor your response and future answers to their specific interests as a ${persona}.`;
    const prompt = `[CONTEXT: ${personaContext}] ${constructPrompt(userMessage)}`;

    try {
        const response = await callGeminiAPI(prompt);
        removeTypingIndicator(typingId);
        appendMessage(response, 'ai');

        // Hide the persona buttons after selection for a cleaner look
        const container = document.getElementById('persona-buttons-container');
        if (container) {
            container.style.opacity = '0';
            setTimeout(() => container.remove(), 300);
        }
    } catch (error) {
        removeTypingIndicator(typingId);
        appendMessage(`Error: ${error.message}`, 'ai');
    }
}

async function callGeminiAPI(prompt, imageData = null) {
    try {
        // Detect environment to choose the right endpoint
        let apiEndpoint = '/.netlify/functions/chat';
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port === '5500') {
            apiEndpoint = 'api/ask.php';
        }

        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                imageData: imageData
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        // Handle both direct Gemini API responses and the Netlify/PHP wrapper structure
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.text) {
            return data.text;
        }

        return "I've processed your request but couldn't generate a text response. Please try again.";
    } catch (error) {
        console.error("AI Brain Connection Error:", error);
        return `I'm having a little trouble connecting to my AI brain. (Details: ${error.message})`;
    }
}

function constructPrompt(userQuery) {
    return `You are "Virtual Euphemia", an AI assistant for Euphemia Chikungulu, a Software Engineer.
    Context: ${JSON.stringify(knowledgeBase.profile)}
    Skills: ${JSON.stringify(knowledgeBase.skills)}
    Projects: ${JSON.stringify(knowledgeBase.projects)}
    Style: Professional, helpful, concise (max 4 sentences). Focus on community impact.
    
    User Query: ${userQuery}`;
}

function createChatWidgetHTML() {
    const div = document.createElement('div');
    div.id = 'chat-widget-container';
    div.style.cssText = "position: fixed; bottom: 30px; right: 30px; z-index: 10000;";
    div.innerHTML = `
        <button id="chat-toggle-btn" class="chat-toggle-btn"><i class="fas fa-comment-dots"></i></button>
        <div id="chat-window" class="chat-window hidden">
            <div class="chat-header"><h3>Virtual Euphemia</h3><button id="chat-close-btn">×</button></div>
            <div id="chat-messages" class="chat-messages">
                <div class="message ai-message">
                    <div class="message-content">Hi! I'm Euphemia's AI twin. To give you the best experience, tell me a bit about yourself:</div>
                </div>
                <div id="persona-buttons-container" class="persona-buttons-container">
                    <button class="persona-btn" onclick="handlePersonaSelection('Developer')">I'm a Developer</button>
                    <button class="persona-btn" onclick="handlePersonaSelection('Hiring')">I'm Looking to Hire</button>
                    <button class="persona-btn" onclick="handlePersonaSelection('Student')">I'm a Student</button>
                    <button class="persona-btn" onclick="handlePersonaSelection('Business')">Business Inquiry</button>
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Ask me anything...">
                <button id="chat-image-btn"><i class="fas fa-image"></i></button>
                <button id="chat-send-btn"><i class="fas fa-paper-plane"></i></button>
                <input type="file" id="chat-image-upload" accept="image/*" style="display: none;">
            </div>
        </div>`;
    document.body.appendChild(div);
}

function appendMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendMessageWithImage(text, imageData) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message user-message`;
    msgDiv.innerHTML = `
        <div class="message-content">
            <div>${text}</div>
            <img src="${imageData}" style="max-width: 150px; margin-top: 10px; border-radius: 5px;">
        </div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.className = 'message ai-message';
    typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}