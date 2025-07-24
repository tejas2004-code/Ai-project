import {GoogleGenerativeAI} from '@google/generative-ai';
  
  const apiKey = import.meta.env.VITE_GEMINI_AI_API;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
 
   export const AichatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
 
