// Preloader: Show bouncing letters for 5 seconds, then hide preloader and show site
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

// Hamburger menu for mobile nav
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
        "Python", "JavaScript", "HTML/CSS", "React", "Node.js"
    ],
    projects: [
        {
            name: "Community Connect",
            description: "A platform connecting local volunteers with community service opportunities."
        },
        {
            name: "EduTrack",
            description: "A student performance tracking system for local schools."
        },
        {
            name: "HealthBridge",
            description: "An app improving access to basic health information in rural areas."
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

const GEMINI_API_KEY = "AIzaSyD2v5-tMuuDNhis89CR75lk8qArmabDQJk"; // Placeholder for the User to fill

async function initChatWidget() {
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!toggleBtn || !chatWindow) return;

    // Toggle Chat Window
    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            setTimeout(() => chatInput.focus(), 100);
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

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
    if (GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        throw new Error("API Key not set");
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY.trim()}`;

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