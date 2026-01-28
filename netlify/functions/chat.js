// netlify/functions/chat.js
// Netlify functions have global fetch in Node 18+ environment.

exports.handler = async (event) => {
    try {
        const { prompt } = JSON.parse(event.body);
        // Try both uppercase and lowercase versions
        const API_KEY = process.env.GEMINI_API_KEY || process.env.gemini_api_key;

        if (!API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "GEMINI_API_KEY is not set in Netlify Environment Variables." })
            };
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error?.message || "Error from Gemini API" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error("Function Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error: " + error.message })
        };
    }
};