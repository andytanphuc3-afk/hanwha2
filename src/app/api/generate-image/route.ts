import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

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
    const encodedPrompt = encodeURIComponent(imagePrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

    return NextResponse.json({ imageUrl, imagePrompt });
  } catch (error: any) {
    console.error('Image Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate image url' }, { status: 500 });
  }
}
