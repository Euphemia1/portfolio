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

        // Always use v1beta for Gemini 1.5 Flash to avoid "Model not found" errors
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        // Prepare parts: Start with the text prompt
        const parts = [{ text: prompt }];

        // If an image is provided, add it to the parts array
        if (imageData) {
            const base64Data = imageData.split(',')[1]; // Remove the data:image/png;base64, prefix
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