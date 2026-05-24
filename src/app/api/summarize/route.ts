import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are an expert Korean-Vietnamese insurance instructor.
Summarize the following lesson content into 3-5 concise bullet points. 
For each point, provide a short Korean sentence followed by its Vietnamese translation.
Do NOT use markdown bold tags or asterisks (* or **). Just use plain text with a bullet point symbol (•).

Example format:
• 생명보험은 상부상조 정신을 바탕으로 합니다. (Bảo hiểm nhân thọ dựa trên tinh thần tương trợ lẫn nhau.)
• 근대 생명보험은 영국에서 시작되었습니다. (Bảo hiểm nhân thọ thời cận đại bắt đầu ở Anh.)

Content to summarize:
${text}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    let summaryText = '';
    try {
      summaryText = response.text;
    } catch (e) {
      summaryText = response.candidates?.[0]?.content?.parts?.[0]?.text || 'Nội dung tóm tắt bị chặn hoặc không thể tạo.';
    }

    return NextResponse.json({ summary: summaryText });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate summary' }, { status: 500 });
  }
}
