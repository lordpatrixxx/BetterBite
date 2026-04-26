import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getIngredientExplanation(ingredient: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain this ingredient in simple English for an Indian consumer in 1-2 short sentences: ${ingredient}`,
      config: {
        systemInstruction: "You are a nutrition expert helping Indian consumers understand food labels. Keep explanations simple, plain-English, and focus on health impact.",
        maxOutputTokens: 80,
        temperature: 0.4,
      },
    });
    return response.text?.trim() || "No explanation available.";
  } catch (error) {
    console.error("Gemini Error (Ingredient):", error);
    return "Failed to generate explanation.";
  }
}

export async function getProductSummary(productName: string, score: number, sugar: number): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Product: ${productName} | Health Score: ${score}/100 | Sugar: ${sugar}g/100g. Write a 2-3 sentence health summary and recommendation.`,
      config: {
        systemInstruction: "You are BetterBite, a friendly nutrition assistant for India. Provide a concise, clear health summary for the given product.",
        maxOutputTokens: 120,
        temperature: 0.5,
      },
    });
    return response.text?.trim() || "No summary available.";
  } catch (error) {
    console.error("Gemini Error (Summary):", error);
    return "Failed to generate summary.";
  }
}
