import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY environment variable not set");
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                suggestions: {
                    type: Type.ARRAY,
                    description: 'An array of 3 distinct suggestions. Each suggestion is the original text creatively embellished with icons.',
                    items: {
                        type: Type.STRING,
                        description: 'A single suggestion string with icons inserted into the original text.'
                    }
                },
            },
            required: ['suggestions'],
        };

        const systemInstruction = `You are an expert in communication and text decoration. Your task is to analyze the user's original text and creatively insert relevant icons (emojis, kaomojis, or symbols) to enhance its meaning and tone.
The core message of the original text must be preserved. You should insert icons at suitable positions within the text—at the beginning, middle, or end—where they add the most value.
Provide 3 distinct suggestions. Each suggestion should be a different creative take on embellishing the original text with icons.
Offer variety in your suggestions by using different icons or placements to convey different tones (e.g., professional, celebratory, playful).
You MUST respond with a JSON object containing an array of these suggestions, following the provided schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text: `Original text: "${text}"` }] }],
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema,
                temperature: 0.8,
            },
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (result.suggestions && Array.isArray(result.suggestions) && result.suggestions.length > 0) {
            return res.status(200).json(result.suggestions);
        } else {
            throw new Error("AI model returned an unexpected format.");
        }
    } catch (error) {
        console.error("Error suggesting icons:", error);
        return res.status(500).json({ error: "Failed to get suggestions from the AI. Please try again." });
    }
}
