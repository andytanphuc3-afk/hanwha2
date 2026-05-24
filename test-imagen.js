const { GoogleGenAI } = require('@google/genai');

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-fast-generate-001',
      prompt: 'A professional insurance consultant talking to a young family, warm lighting, 4k, photorealistic',
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
      }
    });
    console.log("Success! Generated image bytes length:", response.generatedImages[0].image.imageBytes.length);
  } catch(e) {
    console.error("Error:", e);
  }
}

test();
