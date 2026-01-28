
window.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // 1.5 seconds
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        // Close nav when clicking a link (for better UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // Initialize Chat Widget
    initChatWidget();
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
            techStack: {
                frontend: "React",
                backend: "Node.js (Serverless)",
                database: "Supabase"
            },
            features: ["Real-time delivery tracking", "Inventory management analytics", "Automated reporting"],
            role: "Full-stack Developer",
            link: "https://nyamula.com"
        },
        {
            name: "FlowCheck",
            description: "A modern web application for workflow management and process optimization.",
            problemSolved: "Reduces operational bottlenecks for small businesses, helping them scale more efficiently through automation.",
            techStack: {
                frontend: "React, JavaScript",
                backend: "Netlify Functions",
                database: "Supabase"
            },
            features: ["Process visualization", "Automated status updates", "Team collaboration tools"],
            role: "Lead Software Engineer",
            link: "https://flowcheck.netlify.app/"
        },
        {
            name: "EcoWaste",
            description: "Sustainable waste management platform with impact dashboard.",
            problemSolved: "Bridges the gap between waste collection and recycling data, promoting environmental sustainability in urban areas.",
            techStack: {
                frontend: "Next.js, TypeScript",
                backend: "Vercel Functions",
                database: "Supabase"
            },
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
        {
            title: "Building Inclusive Tech Solutions in Africa",
            date: "March 2025",
            category: "Tech Innovation",
            summary: "Exploring how technology can bridge gaps in healthcare, education, and financial services in the African context."
        },
        {
            title: "The Power of Purpose-Driven Development",
            date: "February 2025",
            category: "Community Impact",
            summary: "How focusing on community needs drives better software solutions and user empowerment."
        },
        {
            title: "From Student to Software Engineer",
            date: "January 2025",
            category: "Career Journey",
            summary: "Lessons learned through real-world software development experiences and the transition into the industry."
        }
    ]
};

async function initChatWidget() {
    // 1. Inject Chat Widget HTML if it doesn't exist
    if (!document.getElementById('chat-widget-container')) {
        createChatWidgetHTML();
    }

    const toggleBtn = document.getElementById('chat-toggle-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Handle "Ask My Portfolio" section in projects.html
    const aiInput = document.getElementById('ai-input');
    const aiOutput = document.getElementById('ai-output');
    const aiBtn = document.querySelector('.ai-box button');

    if (aiInput && aiOutput && aiBtn) {
        aiBtn.addEventListener('click', async () => {
            const query = aiInput.value.trim();
            if (!query) return;

            aiOutput.textContent = "Thinking...";
            aiOutput.style.color = "#3a59d1";

            try {
                const prompt = constructPrompt(query);
                const response = await callGeminiAPI(prompt);
                aiOutput.textContent = response;
                aiOutput.style.color = "#333";
            } catch (error) {
                aiOutput.textContent = "Error: " + error.message;
                aiOutput.style.color = "red";
            }
        });
    }

    if (!toggleBtn || !chatWindow) return;

    // Toggle Chat Window
    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            setTimeout(() => chatInput.focus(), 100);
        }
    }

    // Event Delegation for Chat Toggle
    document.body.addEventListener('click', function (e) {
        if (e.target.closest('#chat-toggle-btn') || e.target.closest('#chat-close-btn')) {
            toggleChat();
        }
    });

    // Image Upload Setup
    let uploadedImage = null;

    function setupImageUpload() {
        const imageBtn = document.getElementById('chat-image-btn');
        const fileInput = document.getElementById('chat-image-upload');

        if (imageBtn && fileInput) {
            imageBtn.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', function (e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];

                    // Check if file is an image
                    if (!file.type.match('image.*')) {
                        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
                        return;
                    }

                    const reader = new FileReader();

                    reader.onload = function (readerEvent) {
                        uploadedImage = readerEvent.target.result;

                        // Add a visual indicator that an image has been uploaded
                        imageBtn.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745;"></i>';

                        // Optionally, show a preview of the uploaded image
                        showImagePreview(uploadedImage);
                    };

                    reader.readAsDataURL(file);
                }
            });
        }
    }

    function showImagePreview(imageData) {
        // Create a preview element if it doesn't exist
        let preview = document.getElementById('image-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'image-preview';
            preview.style.cssText = `
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 150px;
                height: 150px;
                border: 2px solid var(--primary-color);
                border-radius: 8px;
                overflow: hidden;
                z-index: 1001;
                background: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            `;

            const img = document.createElement('img');
            img.src = imageData;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
            `;

            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '×';
            removeBtn.style.cssText = `
                position: absolute;
                top: 2px;
                right: 2px;
                background: red;
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            removeBtn.onclick = function () {
                document.body.removeChild(preview);
                uploadedImage = null;

                // Reset the image button icon
                const imageBtn = document.getElementById('chat-image-btn');
                if (imageBtn) {
                    imageBtn.innerHTML = '<i class="fas fa-image"></i>';
                }
            };

            preview.appendChild(img);
            preview.appendChild(removeBtn);
            document.body.appendChild(preview);
        }
    }

    // Modified send message function to handle image
    async function handleSendMessage() {
        const message = chatInput.value.trim();

        // Check if there's an image to send
        if (!message && !uploadedImage) {
            return;
        }

        // Add User Message with Image if present
        if (uploadedImage) {
            appendMessageWithImage(message || 'User sent an image', uploadedImage);
            uploadedImage = null;

            // Reset image button icon
            const imageBtn = document.getElementById('chat-image-btn');
            if (imageBtn) {
                imageBtn.innerHTML = '<i class="fas fa-image"></i>';
            }

            // Remove preview if exists
            const preview = document.getElementById('image-preview');
            if (preview) {
                preview.remove();
            }
        } else if (message) {
            appendMessage(message, 'user');
            chatInput.value = '';
        }

        // Show Typing Indicator
        const typingId = showTypingIndicator();

        try {
            // Construct Prompt based on whether we have an image
            let prompt;
            if (uploadedImage) {
                // For multimodal requests, we need to use a different approach
                // Since we can't send base64 images directly to the API in this implementation,
                // we'll create a descriptive prompt that mentions the image
                prompt = constructMultimodalPrompt(message, uploadedImage);
            } else {
                prompt = constructPrompt(message);
            }

            // Call Gemini API
            const response = await callGeminiAPI(prompt);

            // Remove Typing Indicator
            removeTypingIndicator(typingId);

            // Add AI Response
            appendMessage(response, 'ai');

        } catch (error) {
            removeTypingIndicator(typingId);
            appendMessage(`Connection Error: ${error.message}. Please check console for details.`, 'ai');
            console.error("Gemini Error:", error);
        }
    }

    // Function to construct multimodal prompt
    function constructMultimodalPrompt(text, imageData) {
        // Note: In a real implementation, we would send the image to a multimodal model
        // For now, we'll simulate it by describing the image context
        const context = `
        You are "Virtual Euphemia", an enthusiastic and professional AI assistant for Euphemia Chikungulu's portfolio.
        
        A user has uploaded an image and wants to know how it relates to Euphemia's work.
        The user said: "${text || 'Please analyze this image'}"
        
        ABOUT EUPHEMIA:
        - Focus: ${knowledgeBase.profile.focus}
        - Mission: ${knowledgeBase.profile.mission}
        - Impact: ${knowledgeBase.profile.impact}
        - Approach: ${knowledgeBase.profile.approach.join(', ')}
        
        SKILLS:
        - Frontend: ${knowledgeBase.skills.frontend.join(', ')}
        - Backend: ${knowledgeBase.skills.backend.join(', ')}
        - Databases: ${knowledgeBase.skills.databases.join(', ')}
        - Tools: ${knowledgeBase.skills.tools.join(', ')}
        - Soft Skills: ${knowledgeBase.skills.softSkills.join(', ')}

        PROJECT DETAILS:
        ${JSON.stringify(knowledgeBase.projects, null, 2)}

        ARTICLES & FEATURES:
        ${JSON.stringify(knowledgeBase.articles, null, 2)}

        CHALLENGE GOALS (New Year New Me):
        ${knowledgeBase.challenge.goals.join('\n    - ')}

        INSTRUCTIONS:
        1. Analyze how the image content relates to Euphemia's work or expertise
        2. Suggest how Euphemia might approach similar challenges shown in the image
        3. If the image shows code, design, or tech concepts, explain how they connect to her skills
        4. If the image shows a problem, suggest how her projects might solve it
        5. Be enthusiastic and professional
        6. Keep responses engaging but concise (under 4 sentences) unless the user asks for more detail.

        Image context: User has uploaded an image and wants analysis.
        User Query: ${text || 'Please analyze this image'}
        `;
        return context;
    }

    // Function to append message with image
    function appendMessageWithImage(text, imageData) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');

        // Create content with image
        contentDiv.innerHTML = `
            <div>${text}</div>
            <div style="margin-top: 8px;">
                <img src="${imageData}" style="max-width: 100px; max-height: 100px; border-radius: 4px;" alt="Uploaded image">
            </div>
        `;

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = 'Just now';

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Setup image upload functionality
    setupImageUpload();
}

function createChatWidgetHTML() {
    const div = document.createElement('div');
    div.id = 'chat-widget-container';
    div.className = 'chat-widget-container';
    div.style.cssText = "position: fixed; bottom: 30px; right: 30px; z-index: 10000;";
    div.innerHTML = `
        <button id="chat-toggle-btn" class="chat-toggle-btn" aria-label="Open Chat">
            <i class="fas fa-comment-dots"></i>
        </button>

        <div id="chat-window" class="chat-window hidden">
            <div class="chat-header">
                <div class="chat-header-info">
                    <img src="images/WhatsApp Image 2025-08-21 at 14.28.06_35ba7d1d.jpg" alt="Virtual Euphemia"
                        class="chat-avatar">
                    <div class="chat-title">
                        <h3>Virtual Euphemia</h3>
                        <span class="status-indicator">Online</span>
                    </div>
                </div>
                <button id="chat-close-btn" class="chat-close-btn" aria-label="Close Chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div id="chat-messages" class="chat-messages">
                <div class="message ai-message">
                    <div class="message-content">
                        Hi there! I'm Virtual Euphemia using Google Gemini. Ask me about my projects, skills, or my "New
                        Year New Me" challenge!
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            </div>

            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Ask me anything..." autocomplete="off">
                <button id="chat-image-btn" class="chat-image-btn" aria-label="Upload Image">
                    <i class="fas fa-image"></i>
                </button>
                <button id="chat-send-btn" class="chat-send-btn" aria-label="Send Message">
                    <i class="fas fa-paper-plane"></i>
                </button>
                <input type="file" id="chat-image-upload" accept="image/*" style="display: none;">
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

function appendMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = 'Just now';

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const id = 'typing-' + Date.now();

    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.classList.add('message', 'ai-message');
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;

    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}

function constructPrompt(userQuery) {
    const context = `
    You are "Virtual Euphemia", an enthusiastic and professional AI assistant for Euphemia Chikungulu's portfolio.
    
    ABOUT EUPHEMIA:
    - Focus: ${knowledgeBase.profile.focus}
    - Mission: ${knowledgeBase.profile.mission}
    - Impact: ${knowledgeBase.profile.impact}
    - Approach: ${knowledgeBase.profile.approach.join(', ')}
    
    SKILLS:
    - Frontend: ${knowledgeBase.skills.frontend.join(', ')}
    - Backend: ${knowledgeBase.skills.backend.join(', ')}
    - Databases: ${knowledgeBase.skills.databases.join(', ')}
    - Tools: ${knowledgeBase.skills.tools.join(', ')}
    - Soft Skills: ${knowledgeBase.skills.softSkills.join(', ')}

    PROJECT DETAILS:
    ${JSON.stringify(knowledgeBase.projects, null, 2)}

    ARTICLES & FEATURES:
    ${JSON.stringify(knowledgeBase.articles, null, 2)}

    CHALLENGE GOALS (New Year New Me):
    ${knowledgeBase.challenge.goals.join('\n    - ')}

    INSTRUCTIONS:
    1. Answer questions enthusiastically and professionally.
    2. ALWAYS highlight the COMMUNITY IMPACT of Euphemia's work.
    3. Explain TECHNICAL DECISIONS (like using React or Supabase) when asked about how things were built.
    4. Show how projects EMPOWER users and solve real-world problems.
    5. If asked something outside this scope, politely suggest they reach out via the Contact page.
    6. Keep responses engaging but concise (under 4 sentences) unless the user asks for more detail.

    User Query: ${userQuery}
    `;
    return context;
}

async function callGeminiAPI(prompt) {
    // We no longer check for the key here because the browser shouldn't have it!

    try {
        // Point this to your new Netlify function path
        const response = await fetch('/.netlify/functions/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to get response from AI");
        }

        const data = await response.json();

        // Return the text response from the AI
        // If you use the standard Gemini format in your function:
        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("AI Error:", error);

        // Provide more detailed feedback to the user
        let friendlyMessage = "I'm having a little trouble connecting to my AI brain.";

        if (error.message.includes("404")) {
            friendlyMessage += " (Error 404: Netlify Function not found. Please ensure the site is fully deployed.)";
        } else if (error.message.includes("Unexpected token") || error.message.includes("JSON")) {
            friendlyMessage += " (Error: Invalid response from server. Check logs in Netlify.)";
        } else {
            friendlyMessage += ` (Details: ${error.message})`;
        }

        return friendlyMessage;
    }
}

// AI Resume Builder Functionality
async function generateResume() {
    const jobDescription = document.getElementById('job-description').value.trim();
    if (!jobDescription) {
        alert('Please enter a job description first.');
        return;
    }

    const resumeOutput = document.getElementById('resume-output');
    const generateBtn = document.getElementById('generate-resume-btn');
    const downloadBtn = document.getElementById('download-resume');

    // Show loading state
    resumeOutput.innerHTML = '<p>Generating your tailored resume... Please wait.</p>';
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    try {
        // Construct prompt for resume generation
        const prompt = `Based on the following job description, create a tailored resume for Euphemia Chikungulu:

Job Description: ${jobDescription}

Include sections for: Professional Summary, Technical Skills, Professional Experience, Projects, Education, and Certifications/Achievements. Format as HTML with appropriate headings.`;

        const response = await callGeminiAPI(prompt);

        // Display the generated resume
        resumeOutput.innerHTML = response;

        // Show download button
        downloadBtn.style.display = 'block';

    } catch (error) {
        console.error('Error generating resume:', error);
        resumeOutput.innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
        // Reset button state
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Tailored Resume';
    }
}

// Download resume as text file
function downloadResume() {
    const resumeContent = document.getElementById('resume-output').innerHTML;

    // Create a Blob with the resume content
    const blob = new Blob([resumeContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'euphemia-chikungulu-resume.html';
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

// Initialize event listeners after DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAIResumeBuilder);
    document.addEventListener('DOMContentLoaded', initializeProjectRecommendations);
    document.addEventListener('DOMContentLoaded', initializePersonalizedExperience);
} else {
    initializeAIResumeBuilder();
    initializeProjectRecommendations();
    initializePersonalizedExperience();
}

function initializeAIResumeBuilder() {
    const generateBtn = document.getElementById('generate-resume-btn');
    const downloadBtn = document.getElementById('download-resume');

    if (generateBtn) {
        generateBtn.addEventListener('click', generateResume);
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResume);
    }
}

// AI-Powered Project Recommendations
function initializeProjectRecommendations() {
    const tags = document.querySelectorAll('.interest-tags .tag');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove selected class from all tags
            tags.forEach(t => t.classList.remove('selected'));

            // Add selected class to clicked tag
            tag.classList.add('selected');

            const interest = tag.getAttribute('data-interest');
            generateProjectRecommendations(interest);
        });
    });
}

async function generateProjectRecommendations(interest) {
    const noSelectionMsg = document.querySelector('.no-selection');
    const container = document.getElementById('recommended-projects-container');

    // Hide no selection message and show container
    if (noSelectionMsg) noSelectionMsg.style.display = 'none';
    if (container) container.style.display = 'grid';

    // Show loading state
    if (container) {
        container.innerHTML = '<div class="loading-recommendations">Analyzing projects for your interests... <i class="fas fa-spinner fa-spin"></i></div>';
    }

    try {
        // Get project data from the knowledge base
        const projects = knowledgeBase.projects;

        // Create a prompt for the AI to select relevant projects
        const prompt = `Based on the user's interest in "${interest}", recommend the most relevant projects from this portfolio and explain why they match. Here are the projects: ${JSON.stringify(projects)}. Return only the project names that match the interest, along with a brief explanation of the match and how the technologies used relate to the interest area. Format as JSON with project name, description, relevance, and tech stack.`;

        const response = await callGeminiAPI(prompt);

        // Parse the AI response and display recommendations
        displayProjectRecommendations(response, interest);

    } catch (error) {
        console.error('Error generating project recommendations:', error);
        if (container) {
            container.innerHTML = `<div class="error-message">Error: Could not generate recommendations (${error.message})</div>`;
        }
    }
}

function displayProjectRecommendations(aiResponse, interest) {
    const container = document.getElementById('recommended-projects-container');

    if (!container) return;

    // Since the AI response might not be perfectly formatted JSON, we'll create recommendations based on the response
    const projects = knowledgeBase.projects;

    // Filter projects based on the interest (simplified approach)
    let filteredProjects = [];

    switch (interest) {
        case 'web':
            filteredProjects = projects.filter(p =>
                p.techStack.frontend ||
                p.techStack.backend ||
                p.description.toLowerCase().includes('web')
            );
            break;
        case 'ai':
            filteredProjects = projects.filter(p =>
                p.description.toLowerCase().includes('ai') ||
                p.description.toLowerCase().includes('intelligence') ||
                p.techStack.frontend.includes('React') // Using React as proxy for modern dev
            );
            break;
        case 'mobile':
            filteredProjects = projects.filter(p =>
                p.description.toLowerCase().includes('mobile') ||
                p.description.toLowerCase().includes('app')
            );
            break;
        case 'logistics':
            filteredProjects = projects.filter(p =>
                p.name.toLowerCase().includes('logistics') ||
                p.description.toLowerCase().includes('logistics') ||
                p.description.toLowerCase().includes('supply chain')
            );
            break;
        case 'sustainability':
            filteredProjects = projects.filter(p =>
                p.name.toLowerCase().includes('eco') ||
                p.description.toLowerCase().includes('sustain') ||
                p.description.toLowerCase().includes('environment')
            );
            break;
        case 'database':
            filteredProjects = projects.filter(p =>
                p.techStack.database ||
                p.description.toLowerCase().includes('database') ||
                p.techStack.backend.toLowerCase().includes('sql')
            );
            break;
        default:
            filteredProjects = projects;
    }

    // Limit to 3 projects
    const recommendations = filteredProjects.slice(0, 3);

    if (recommendations.length === 0) {
        container.innerHTML = '<div class="no-results">No projects match this interest. Try another category.</div>';
        return;
    }

    // Generate HTML for recommended projects
    let html = '';

    recommendations.forEach(project => {
        html += `
        <div class="project-card">
            <div class="project-content">
                <div class="project-category">Recommended for ${interest}</div>
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    <span class="tech-tag">${project.techStack.frontend}</span>
                    <span class="tech-tag">${project.techStack.backend}</span>
                    <span class="tech-tag">${project.techStack.database}</span>
                </div>
                <p class="project-match-reason">This project matches your interest in ${interest} because it involves ${project.problemSolved.substring(0, 60)}...</p>
                <a href="${project.link}" class="btn primary-btn" target="_blank">View Project</a>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// Personalized Portfolio Experience
function initializePersonalizedExperience() {
    const options = document.querySelectorAll('.exp-option');

    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            option.classList.add('selected');

            const userType = option.getAttribute('data-type');
            adaptPortfolioExperience(userType);

            // Store user preference in localStorage
            localStorage.setItem('userType', userType);
        });
    });

    // Check if user has previously selected a type
    const savedUserType = localStorage.getItem('userType');
    if (savedUserType) {
        // Highlight the saved option
        const savedOption = document.querySelector(`.exp-option[data-type="${savedUserType}"]`);
        if (savedOption) {
            savedOption.classList.add('selected');
            adaptPortfolioExperience(savedUserType);
        }
    }
}

function adaptPortfolioExperience(userType) {
    // Adapt the portfolio content based on user type
    switch (userType) {
        case 'developer':
            adaptForDevelopers();
            break;
        case 'recruiter':
            adaptForRecruiters();
            break;
        case 'student':
            adaptForStudents();
            break;
        case 'business':
            adaptForBusiness();
            break;
        default:
            resetToDefault();
    }

    // Update chatbot greeting based on user type
    updateChatbotGreeting(userType);
}

function adaptForDevelopers() {
    // Highlight technical aspects
    const techElements = document.querySelectorAll('.tech-tag, .skill-card, .project-tech');
    techElements.forEach(el => {
        el.style.border = '2px solid var(--primary-color)';
        el.style.backgroundColor = 'rgba(58, 89, 209, 0.1)';
    });

    // Show more technical details in projects
    const projectDescriptions = document.querySelectorAll('.project-content p');
    projectDescriptions.forEach(desc => {
        desc.style.fontWeight = '500';
    });

    // Update greeting
    updateHeroText('Developer', 'I specialize in modern web technologies and full-stack development. Check out my technical projects below!');
}

function adaptForRecruiters() {
    // Highlight professional experience
    const experienceCards = document.querySelectorAll('.edu-card, .company-item');
    experienceCards.forEach(card => {
        card.style.border = '3px solid var(--primary-color)';
        card.style.transform = 'scale(1.02)';
        card.style.transition = 'transform 0.3s';
    });

    // Emphasize achievements
    const achievementItems = document.querySelectorAll('.company-achievements li');
    achievementItems.forEach(item => {
        item.style.fontWeight = '600';
        item.style.color = 'var(--primary-color)';
    });

    // Update greeting
    updateHeroText('Hiring Manager', 'I bring 1 year of experience solving real-world problems. See my impact metrics below!');
}

function adaptForStudents() {
    // Highlight learning journey
    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach(card => {
        card.style.background = 'linear-gradient(135deg, #f0f4ff, #e6ebff)';
    });

    // Emphasize mentorship aspects
    const mentorshipElements = document.querySelectorAll('.about-details-list li');
    mentorshipElements.forEach(item => {
        if (item.textContent.toLowerCase().includes('mentor') || item.textContent.toLowerCase().includes('learn')) {
            item.style.backgroundColor = '#e6f7ff';
            item.style.padding = '8px';
            item.style.borderRadius = '4px';
        }
    });

    // Update greeting
    updateHeroText('Student', 'Learning and growing through hands-on projects. See how I transformed ideas into solutions!');
}

function adaptForBusiness() {
    // Highlight business impact
    const impactElements = document.querySelectorAll('.stat-item, .project-card');
    impactElements.forEach(el => {
        el.style.boxShadow = '0 8px 24px rgba(58, 89, 209, 0.2)';
        el.style.transition = 'all 0.3s';
    });

    // Emphasize ROI and problem-solving
    const problemSolved = document.querySelectorAll('.project-content p');
    problemSolved.forEach(p => {
        p.style.fontStyle = 'italic';
    });

    // Update greeting
    updateHeroText('Business Partner', 'Focused on solutions that drive impact and growth. Explore my portfolio of results!');
}

function resetToDefault() {
    // Reset all styles to default
    const techElements = document.querySelectorAll('.tech-tag, .skill-card, .project-tech');
    techElements.forEach(el => {
        el.style.border = '';
        el.style.backgroundColor = '';
    });

    const experienceCards = document.querySelectorAll('.edu-card, .company-item');
    experienceCards.forEach(card => {
        card.style.border = '';
        card.style.transform = '';
    });

    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach(card => {
        card.style.background = '';
    });

    // Reset to default greeting
    updateHeroText('Visitor', 'Welcome to my portfolio. Explore my projects and journey!');
}

function updateHeroText(userType, subText) {
    const heroTypedElement = document.querySelector('.hero-main-typed');
    if (heroTypedElement) {
        heroTypedElement.innerHTML = `I'm a <span class="typed-text">${subText}</span><span class="cursor">&nbsp;</span>`;
    }
}

function updateChatbotGreeting(userType) {
    // Update the initial chatbot message based on user type
    const initialMessage = document.querySelector('.ai-message .message-content');
    if (initialMessage) {
        switch (userType) {
            case 'developer':
                initialMessage.textContent = `Hi there! I'm Virtual Euphemia. As a fellow developer, I'd love to discuss technical implementations and architecture decisions. Ask me about my projects, tech stack, or coding practices!`;
                break;
            case 'recruiter':
                initialMessage.textContent = `Hello! I'm Virtual Euphemia. I can tell you about Euphemia's professional experience, achievements, and career journey. What would you like to know?`;
                break;
            case 'student':
                initialMessage.textContent = `Hey there! I'm Virtual Euphemia. I love connecting with students. Ask me about learning resources, career advice, or how to get started with projects!`;
                break;
            case 'business':
                initialMessage.textContent = `Greetings! I'm Virtual Euphemia. I can share insights about business impact, project outcomes, and ROI of technical solutions. How can I assist?`;
                break;
            default:
                initialMessage.textContent = `Hi there! I'm Virtual Euphemia using Google Gemini. Ask me about my projects, skills, or my "New Year New Me" challenge!`;
        }
    }
}

