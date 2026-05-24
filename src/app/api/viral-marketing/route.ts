import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { 
      product_info,
      platform,
      content_type,
      content_length,
      tone_style,
      target_customer,
      marketing_goal,
      language
    } = await request.json();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `Nhiệm vụ của bạn là:
- Phân tích thông tin sản phẩm bảo hiểm
- Hiểu insight khách hàng
- Viết content marketing có khả năng viral cao
- Tối ưu theo nền tảng: ${platform}

Mục tiêu content:
- Thu hút sự chú ý ngay 3 giây đầu
- Tạo cảm xúc mạnh
- Khiến người xem muốn comment/share/inbox
- Không viết quá nhàm chán kiểu brochure bảo hiểm
- Viết tự nhiên như creator/influencer thật

QUY TẮC VIẾT
1. Hook đầu cực mạnh
2. Luôn dùng tâm lý khách hàng (sợ rủi ro, sợ mất tiền, lo cho con cái, áp lực gia đình, bệnh tật, tai nạn, tương lai, người già, áp lực tài chính)
3. Không dùng văn phong quá doanh nghiệp.
4. Viết như người thật đang kể chuyện.
5. Ưu tiên: storytelling, tình huống thật, so sánh, sốc nhẹ, tranh cãi nhẹ, cảm xúc
6. CTA cuối bài phải tự nhiên

ĐẦU VÀO
Thông tin sản phẩm: ${product_info || 'Bảo hiểm Hanwha'}
Nền tảng: ${platform || 'Facebook'}
Loại content: ${content_type || 'Kể chuyện'}
Độ dài: ${content_length || 'Vừa phải'}
Phong cách: ${tone_style || 'Tự nhiên, chia sẻ'}
Đối tượng khách hàng: ${target_customer || 'Người đi làm'}
Mục tiêu: ${marketing_goal || 'Tăng tương tác'}
Ngôn ngữ: ${language || 'Tiếng Việt'}

YÊU CẦU OUTPUT
Trả kết quả rõ ràng bằng markdown:

# Hook
(Nội dung hook)

# Content
(Nội dung chính hoàn chỉnh)

# CTA
(Nội dung CTA)

# Hashtags
(Các hashtag)

# Video Idea
(Gợi ý visual/video: cảnh quay, biểu cảm, text overlay, nhạc)

# Viral Tips
(Mẹo tối ưu cho ${platform} như pattern interrupt, comment, retention...)
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return NextResponse.json({ content: response.text });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: 'Failed to generate viral content' }, { status: 500 });
  }
}
