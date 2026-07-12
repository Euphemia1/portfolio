// Tried in order; if one model has no quota left, the next is attempted automatically.
const CANDIDATE_MODELS = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

function isQuotaOrRateError(status, data) {
    const message = data?.error?.message || "";
    return status === 429 || /quota|rate.?limit|resource_exhausted/i.test(message);
}

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

        let lastError = null;

        for (const model of CANDIDATE_MODELS) {
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": API_KEY
                },
                body: JSON.stringify({
                    contents: [{ parts: parts }]
                })
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(data)
                };
            }

            console.error(`Gemini API error (model: ${model}):`, data.error?.message || data);
            lastError = data;

            if (!isQuotaOrRateError(response.status, data)) {
                return {
                    statusCode: response.status,
                    body: JSON.stringify({ error: "AI_UNAVAILABLE" })
                };
            }
            // Otherwise fall through and try the next model.
        }

        return {
            statusCode: 429,
            body: JSON.stringify({ error: "AI_BUSY" })
        };
    } catch (error) {
        console.error("Internal Server Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "AI_UNAVAILABLE" })
        };
    }
};