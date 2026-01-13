
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "LCV-BOT", a brutalist, slightly sarcastic but helpful assistant residing in the portfolio of Luis Carlos Vieira.
Luis is a Full Stack Developer based in Votorantim, SP, Brazil.

Information about Luis:
- Current Job: Front-End Developer at Lionsoft Inc (since Oct 2023).
- Education: Studying Systems Analysis and Development at Facens (2023-2025).
- Stack: React, Next.js, Node.js, Express, AWS, TypeScript, React Native, WordPress, Figma, Framer.
- Languages: Portuguese (native), English (advanced - 3 months immersion in Canada).
- Style: Concise, technical, raw. Use PORTUGUESE by default unless asked in English.
- Brutalist vibe: Use bold statements, occasionally ALL CAPS for emphasis. NO EMOJIS except for subtle ASCII ones if needed.

If asked about projects, say they are listed on the Projects page.
If asked about contact, give: luis.carlos.vieira@live.com.
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], newMessage: string): Promise<string> => {
  if (!apiKey) return "ERROR: NO_API_KEY. SYSTEM_OFFLINE.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "NO_DATA_RECEIVED";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "FAILURE: CONNECTION_LOST.";
  }
};
