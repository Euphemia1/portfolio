exports.handler = async (event) => {
    try {
        const { prompt, imageData } = JSON.parse(event.body);
        const API_KEY = process.env.GEMINI_API_KEY || process.env.gemini_api_key;

        if (!API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "API Key missing in Netlify environment." })
            };
        }

        // Use gemini-3-flash for 2026 production stability
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${API_KEY}`;

        // Prepare the contents structure for the Gemini API
        const parts = [{ text: prompt }];

        if (imageData) {
            const base64Data = imageData.split(',')[1];
            const mimeType = imageData.split(',')[0].split(':')[1].split(';')[0];

            parts.push({
                inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                }
            });
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: parts }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error?.message || "Gemini API Error" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error: " + error.message })
        };
    }
};