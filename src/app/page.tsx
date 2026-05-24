import Link from "next/link";
import { BookOpen, Layers, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="py-20" style={{ 
        background: 'linear-gradient(135deg, var(--hanwha-orange-light) 0%, white 100%)', 
        borderBottom: '1px solid var(--slate-200)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract background shapes */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--hanwha-orange)', opacity: 0.05, filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--hanwha-orange)', opacity: 0.05, filter: 'blur(40px)' }}></div>
        
        <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
          <div className="inline-flex items-center gap-2 mb-6 font-bold" style={{ backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '999px', color: 'var(--hanwha-orange)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--slate-200)' }}>
            <Sparkles size={16} /> Phiên bản mới: Tích hợp AI Marketing
          </div>
          <h1 className="font-black mb-6" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', lineHeight: 1.1, color: 'var(--slate-900)', letterSpacing: '-0.03em' }}>
            <span style={{ whiteSpace: 'nowrap' }}>Làm Chủ Kiến Thức Bảo Hiểm</span> <br />
            <span style={{ color: 'var(--hanwha-orange)' }}>Dễ Dàng Hơn Bao Giờ Hết</span>
          </h1>
          <p className="mb-8 font-medium" style={{ fontSize: '1.25rem', color: 'var(--slate-600)', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            Hệ thống đào tạo độc quyền của Hanwha Academy. Kết hợp Bài giảng trực quan, Sổ tay từ vựng thông minh và Công cụ sáng tạo nội dung Viral bằng AI.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/courses" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem', borderRadius: '999px', boxShadow: '0 10px 25px -5px rgba(243, 112, 33, 0.4)' }}>
              Bắt Đầu Học Ngay <ArrowRight size={20} />
            </Link>
            <Link href="/viral-marketing" className="btn btn-outline flex items-center gap-2" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem', borderRadius: '999px', backgroundColor: 'white' }}>
              <Sparkles size={20} /> Trải nghiệm AI Content
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-black" style={{ fontSize: '3rem', letterSpacing: '-0.02em', color: 'var(--slate-900)' }}>Khám Phá Tính Năng</h2>
            <p className="text-slate mt-4 text-xl font-medium">Bộ công cụ hỗ trợ tối đa cho đại lý và chuyên viên tư vấn bảo hiểm.</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center flex flex-col items-center hover-scale" style={{ border: 'none', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <div style={{ backgroundColor: 'var(--hanwha-orange-light)', padding: '1.5rem', borderRadius: '24px', color: 'var(--hanwha-orange)', marginBottom: '1.5rem' }}>
                <Layers size={48} strokeWidth={1.5} />
              </div>
              <h3 className="font-black mb-3" style={{ fontSize: '1.75rem', color: 'var(--slate-800)' }}>Bài Giảng Trực Quan</h3>
              <p className="text-slate font-medium text-lg">Hệ thống video bài giảng chất lượng cao, kết hợp tài liệu PDF rõ ràng mạch lạc.</p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center flex flex-col items-center hover-scale" style={{ border: 'none', boxShadow: '0 20px 25px -5px rgba(243, 112, 33, 0.1), 0 8px 10px -6px rgba(243, 112, 33, 0.1)', position: 'relative', transition: 'transform 0.3s ease' }}>
              <div style={{ position: 'absolute', top: '-15px', backgroundColor: 'var(--hanwha-orange)', color: 'white', padding: '4px 16px', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold', boxShadow: 'var(--shadow-sm)' }}>MỚI NHẤT</div>
              <div style={{ backgroundColor: '#fff7ed', padding: '1.5rem', borderRadius: '24px', color: 'var(--hanwha-orange)', marginBottom: '1.5rem' }}>
                <Sparkles size={48} strokeWidth={1.5} />
              </div>
              <h3 className="font-black mb-3" style={{ fontSize: '1.75rem', color: 'var(--slate-800)' }}>Viral Marketing AI</h3>
              <p className="text-slate font-medium text-lg">Tạo ngay kịch bản TikTok, Facebook bùng nổ tương tác chỉ với 1 cú click nhờ sức mạnh AI.</p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center flex flex-col items-center hover-scale" style={{ border: 'none', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <div style={{ backgroundColor: 'var(--hanwha-orange-light)', padding: '1.5rem', borderRadius: '24px', color: 'var(--hanwha-orange)', marginBottom: '1.5rem' }}>
                <BookOpen size={48} strokeWidth={1.5} />
              </div>
              <h3 className="font-black mb-3" style={{ fontSize: '1.75rem', color: 'var(--slate-800)' }}>Sổ Tay Flashcard</h3>
              <p className="text-slate font-medium text-lg">Hệ thống ôn tập từ vựng chuẩn Quizlet với thẻ lật thông minh và danh sách từ chi tiết.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS for hover scale effect */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-scale:hover {
          transform: translateY(-8px);
        }
      `}} />
    </div>
  );
}
