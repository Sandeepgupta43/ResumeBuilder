import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_Api_key });

export const geminiHelper = async (text) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: text }] }],
    });

    return response;
  } catch (error) {
    console.error("Gemini parsing failed:", error);
    throw new Error("Failed to parse resume using Gemini.");
  }
};
