const { GoogleGenAI } = require('@google/genai');

async function test() {
  try {
    const content = "Image Idea: A young happy family";
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Trích xuất phần "Image Idea" hoặc ý tưởng hình ảnh từ nội dung sau, sau đó viết một prompt thật chi tiết BẰNG TIẾNG ANH để đưa vào hệ thống AI vẽ ảnh (Stable Diffusion).
Yêu cầu prompt tiếng Anh: Ngắn gọn, miêu tả rõ ràng đối tượng, bối cảnh, ánh sáng, phong cách (ví dụ: photorealistic, 4k, highly detailed).
Chỉ trả về DUY NHẤT câu prompt tiếng Anh, không giải thích gì thêm.

Nội dung:
${content}
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    const imagePrompt = response.text?.trim() || "A professional image";
    console.log("Image prompt:", imagePrompt);
    const encodedPrompt = encodeURIComponent(imagePrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
    console.log("Image URL:", imageUrl);
    
    // Check if the URL returns an image
    const fetch = (await import('node-fetch')).default;
    const res = await fetch(imageUrl);
    console.log("Pollinations status:", res.status);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
