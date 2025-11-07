import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnimalType, NameStyle, GeneratedNames } from '../types';

/**
 * Encodes a string to Base64.
 * This is a placeholder function, as actual API key handling is managed by the environment.
 * Do not call this directly for the API key.
 */
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decodes a Base64 string.
 * This is a placeholder function.
 */
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Generates a list of pet names using the Gemini API.
 * @param animalType The type of animal.
 * @param nameStyle The desired style for the names (cute or cool).
 * @returns A promise that resolves to an array of generated pet names.
 */
export const generatePetNames = async (
  animalType: AnimalType,
  nameStyle: NameStyle,
): Promise<string[]> => {
  // Ensure the API key is available. It's assumed to be pre-configured in the environment.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in the environment variables.");
  }

  // Create a new GoogleGenAI instance for each call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `「${animalType}」の「${nameStyle === NameStyle.Cute ? 'かわいい' : 'かっこいい'}」系統で、日本語発音しやすく、親しみやすいカタカナのペットの名前を5つ提案してください。名前はユニークで、具体的な意味や由来は不要です。`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using gemini-2.5-flash for basic text generation
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            names: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: 'A pet name in Katakana.',
              },
              description: 'A list of pet names.',
            },
          },
          required: ['names'],
          propertyOrdering: ["names"],
        },
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster, direct responses for simple prompts
      },
    });

    const jsonStr = response.text.trim();
    const result: GeneratedNames = JSON.parse(jsonStr);
    return result.names;
  } catch (error) {
    console.error("Error generating pet names:", error);
    throw new Error("Failed to generate pet names. Please try again.");
  }
};
