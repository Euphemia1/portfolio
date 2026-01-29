exports.handler = async (event) => {
    try {
        const { prompt, imageData } = JSON.parse(event.body);
        const API_KEY = process.env.GEMINI_API_KEY || process.env.gemini_api_key;

        if (!API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "API Key missing in Netlify settings." })
            };
        }

        // Using gemini-1.5-flash via v1beta as requested
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        // Prepare the standard contents structure
        const parts = [{ text: prompt }];

        if (imageData && imageData.includes('base64,')) {
            const [header, data] = imageData.split('base64,');
            const mimeType = header.split(':')[1].split(';')[0];

            parts.push({
                inline_data: {
                    mime_type: mimeType,
                    data: data
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
                body: JSON.stringify({ error: data.error?.message || "Gemini API Communication Error" })
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