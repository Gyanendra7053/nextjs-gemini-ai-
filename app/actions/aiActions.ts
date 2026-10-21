"use server"

import { GoogleGenAI } from "@google/genai"


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
})

export async function genrateTextAction(prompt:string): Promise<string> {
    // Server-side state (recommended)
    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input:prompt,
    });
   return interaction.output_text||"no output genrated";
}