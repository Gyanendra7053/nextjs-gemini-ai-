"use server"

import { GoogleGenAI } from "@google/genai"


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
})

export async function genrateTextAction(prompt: String): Promise<String> {
    // Server-side state (recommended)
    const interaction1 = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: "I have 2 dogs in my house.",
    });
    console.log("Response 1:", interaction1.output_text);

    const interaction2 = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: "How many paws are in my house?",
        previous_interaction_id: interaction1.id,
    });
    console.log("Response 2:", interaction2.output_text);
}