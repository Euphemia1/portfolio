
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
        tagline: "Purpose-driven software engineer focused on building inclusive, user-friendly systems.",
        experience: "1 Year",
        location: "Lusaka, Zambia"
    },
    skills: [
        "Software Development", "Web Development", "UI/UX Design", "Community Building",
        "Python", "JavaScript", "HTML/CSS", "React", "Node.js", "Next.js", "TypeScript", "Supabase"
    ],
    projects: [
        {
            name: "Smart Logistics Dashboard",
            description: "Real-time logistics tracking and management system with predictive analytics for supply chain optimization. Built with React, Supabase, and Postman."
        },
        {
            name: "FlowCheck",
            description: "A modern web application for workflow management and process optimization. Built with React, JavaScript, CSS3, and Netlify."
        },
        {
            name: "EcoWaste",
            description: "Sustainable waste management platform with impact dashboard. Built with Next.js, TypeScript, Chart.js, and Vercel."
        },
        {
            name: "KMS",
            description: "Comprehensive management system solution for organizational efficiency. A web application designed to streamline business processes."
        },
        {
            name: "LT Construction Software",
            description: "Intelligent cost estimation and real-time reporting software for the construction industry. Provides analytics and project management tools."
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
    }
};

// GEMINI_API_KEY is defined in config.js


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

    // Send Message Logic
    async function handleSendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add User Message
        appendMessage(message, 'user');
        chatInput.value = '';

        // Show Typing Indicator
        const typingId = showTypingIndicator();

        try {
            // Construct Prompt
            const prompt = constructPrompt(message);

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

    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
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
                <button id="chat-send-btn" class="chat-send-btn" aria-label="Send Message">
                    <i class="fas fa-paper-plane"></i>
                </button>
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
    You are "Virtual Euphemia", an AI assistant for Euphemia Chikungulu's portfolio website.
    Your tone is friendly, professional, enthusiastic, and helpful.
    
    Use the following Knowledge Base to answer questions:
    ${JSON.stringify(knowledgeBase, null, 2)}
    
    If the user asks something not in the knowledge base, politely say you don't know but suggest they contact Euphemia directly through the Contact page.
    Keep answers concise (under 3 sentences usually) unless asked for details.
    
    User Query: ${userQuery}
    `;
    return context;
}

async function callGeminiAPI(prompt) {
    if (typeof GEMINI_API_KEY === 'undefined' || !GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        throw new Error("API Key not set. Please ensure js/config.js is created with your API key.");
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY.trim()}`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`HTTP error! status: ${response.status}. ${errorData.error?.message || ''}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Full Error Details:", error);
        throw error;
    }
}


