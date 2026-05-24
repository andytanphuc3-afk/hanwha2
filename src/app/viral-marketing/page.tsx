"use client";

import { useState } from 'react';
import { Sparkles, Loader2, Copy, Check, Users, Image as ImageIcon } from 'lucide-react';

const TARGET_CUSTOMERS = [
  "Lao động E9",
  "Du học sinh D2/D4",
  "Kỹ sư E7",
  "Kết hôn di trú F6",
  "Mẹ bỉm sữa",
  "Dân văn phòng",
  "Người lớn tuổi",
];

export default function ViralMarketingPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generatingImage, setGeneratingImage] = useState(false);

  const [formData, setFormData] = useState({
    product_info: '',
    platform: 'TikTok',
    content_type: 'Video ngắn / Reel',
    content_length: 'Ngắn (< 1 phút)',
    tone_style: 'Kịch tính, giật gân nhẹ',
    language: 'Tiếng Việt'
  });

  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const toggleTarget = (target: string) => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter(t => t !== target));
    } else {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setImageUrl(null);
    
    const payload = {
      ...formData,
      target_customer: selectedTargets.length > 0 ? selectedTargets.join(', ') : 'Chung (Tất cả đối tượng)',
      marketing_goal: 'Tương tác, Inbox, Nhận tư vấn' 
    };

    try {
      const res = await fetch('/api/viral-marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.content) {
        setResult(data.content);
      } else {
        setResult('Có lỗi xảy ra khi tạo content. Vui lòng thử lại.');
      }
    } catch (error) {
      setResult('Có lỗi xảy ra khi gọi API.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateImage = async () => {
    if (!result) return;
    setGeneratingImage(true);
    setImageUrl(null);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: result }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingImage(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'var(--hanwha-orange)', 
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      minHeight: 'calc(100vh - 64px)', 
      padding: '3rem 0' 
    }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
            padding: '1rem', borderRadius: '50%', marginBottom: '1rem', 
            backgroundColor: 'white', color: 'var(--hanwha-orange)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <Sparkles size={32} />
          </div>
          <h1 style={{ fontWeight: 900, fontSize: '2.5rem', color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Viral Marketing AI
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem', maxWidth: '42rem', margin: '0 auto', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Công cụ sáng tạo nội dung độc quyền. Đánh trúng tâm lý khách hàng và bùng nổ tương tác.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* Form Input - 5 columns equivalent */}
          <div style={{ flex: '1 1 40%', minWidth: '350px' }}>
            <div style={{ 
              backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', 
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.02)' 
            }}>
              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Product Info */}
                  <div>
                    <label style={{ fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '1.125rem' }}>
                      <span>📦</span> Thông tin sản phẩm bảo hiểm <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea 
                      name="product_info" 
                      value={formData.product_info} 
                      onChange={handleChange}
                      required
                      style={{ 
                        width: '100%', padding: '1rem', borderRadius: '1rem', border: 'none', 
                        backgroundColor: '#f8fafc', color: '#334155', minHeight: '120px', 
                        fontSize: '0.95rem', outline: 'none', boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.02)' 
                      }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(243,112,33,0.5)'}
                      onBlur={(e) => e.target.style.boxShadow = 'inset 0 2px 4px 0 rgba(0,0,0,0.02)'}
                      placeholder="Dán thông tin sản phẩm (Hỗ trợ cả Tiếng Việt và Tiếng Hàn). VD: Bảo hiểm nhân thọ cho E9..."
                    />
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem', marginLeft: '0.25rem' }}>
                      💡 Mẹo: Bạn có thể dán trực tiếp tài liệu tiếng Hàn vào đây, AI sẽ tự hiểu.
                    </p>
                  </div>

                  {/* Target Customers (Chips) */}
                  <div>
                    <label style={{ fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '1.125rem' }}>
                      <Users size={20} color="#3b82f6" /> Đối tượng khách hàng
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {TARGET_CUSTOMERS.map(target => {
                        const isSelected = selectedTargets.includes(target);
                        return (
                          <button
                            key={target}
                            type="button"
                            onClick={() => toggleTarget(target)}
                            style={{ 
                              padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', 
                              fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                              backgroundColor: isSelected ? 'var(--hanwha-orange)' : '#f1f5f9',
                              color: isSelected ? 'white' : '#475569',
                              boxShadow: isSelected ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                              transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                            }}
                          >
                            {target}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '0.5rem 0' }} />

                  {/* Selectors Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nền tảng</label>
                      <select name="platform" value={formData.platform} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#f8fafc', fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none' }} onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(243,112,33,0.5)'} onBlur={(e) => e.target.style.boxShadow = 'none'}>
                        <option>TikTok</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>Threads</option>
                        <option>YouTube Shorts</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Loại Content</label>
                      <select name="content_type" value={formData.content_type} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#f8fafc', fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none' }} onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(243,112,33,0.5)'} onBlur={(e) => e.target.style.boxShadow = 'none'}>
                        <option>Video ngắn / Reel</option>
                        <option>Bài post kèm ảnh</option>
                        <option>Storytelling dài</option>
                        <option>Meme / Vui nhộn</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Độ dài</label>
                      <select name="content_length" value={formData.content_length} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#f8fafc', fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none' }} onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(243,112,33,0.5)'} onBlur={(e) => e.target.style.boxShadow = 'none'}>
                        <option>Rất ngắn (&lt; 30s)</option>
                        <option>Ngắn (&lt; 1 phút)</option>
                        <option>Vừa (1-2 phút)</option>
                        <option>Dài (&gt; 2 phút)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Ngôn ngữ</label>
                      <select name="language" value={formData.language} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#f8fafc', fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none' }} onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(243,112,33,0.5)'} onBlur={(e) => e.target.style.boxShadow = 'none'}>
                        <option>Tiếng Việt</option>
                        <option>Tiếng Hàn</option>
                        <option>Song ngữ Việt-Hàn</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Phong cách (Tone & Style)</label>
                    <select name="tone_style" value={formData.tone_style} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#f8fafc', fontWeight: 500, color: '#334155', cursor: 'pointer', outline: 'none' }} onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(243,112,33,0.5)'} onBlur={(e) => e.target.style.boxShadow = 'none'}>
                      <option>Kịch tính, giật gân nhẹ</option>
                      <option>Chân thành, tâm sự kể chuyện</option>
                      <option>Hài hước, châm biếm nhẹ</option>
                      <option>Chuyên gia tư vấn</option>
                      <option>Gây tranh cãi nhẹ (Debate)</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading || !formData.product_info}
                    style={{ 
                      width: '100%', marginTop: '1rem', padding: '1rem', borderRadius: '1rem', 
                      color: 'white', fontWeight: 'bold', fontSize: '1.125rem', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      border: 'none', cursor: (loading || !formData.product_info) ? 'not-allowed' : 'pointer',
                      backgroundColor: (loading || !formData.product_info) ? '#cbd5e1' : 'var(--hanwha-orange)',
                      boxShadow: (loading || !formData.product_info) ? 'none' : '0 8px 20px -6px rgba(243,112,33,0.5)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin" /> Đang phân tích Insight...</>
                    ) : (
                      <><Sparkles /> Tạo Content Viral Ngay</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Output Result - 7 columns equivalent */}
          <div style={{ flex: '1 1 55%', minWidth: '400px' }}>
            <div style={{ 
              backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', height: '100%', 
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.02)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.875rem' }}>✨</span> Bản thảo Content
                </h2>
                {result && (
                  <button 
                    onClick={handleCopy} 
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', 
                      borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.875rem', 
                      border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                      backgroundColor: copied ? '#dcfce7' : '#f1f5f9', 
                      color: copied ? '#16a34a' : '#475569' 
                    }}
                  >
                    {copied ? <><Check size={16}/> Đã Copy</> : <><Copy size={16}/> Copy Text</>}
                  </button>
                )}
              </div>
              
              <div style={{ 
                flex: 1, backgroundColor: '#f8fafc', borderRadius: '1rem', padding: '1.5rem', 
                overflowY: 'auto', border: '1px solid #f1f5f9', minHeight: '500px' 
              }}>
                {loading ? (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                      <Loader2 size={56} style={{ animation: 'spin 1s linear infinite', color: 'var(--hanwha-orange)', position: 'relative', zIndex: 10 }} />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#475569' }}>AI đang vận dụng tâm lý học...</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#64748b' }}>Viết hook, sắp xếp câu chữ, tìm insight...</p>
                  </div>
                ) : result ? (
                  <div style={{ color: '#1e293b', whiteSpace: 'pre-wrap', fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.8 }}>
                    {result}
                    
                    {formData.content_type.includes('ảnh') && (
                      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                        {!imageUrl ? (
                          <button
                            onClick={handleGenerateImage}
                            disabled={generatingImage}
                            style={{
                              padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1rem',
                              backgroundColor: 'white', color: 'var(--hanwha-orange)', border: '2px solid var(--hanwha-orange)',
                              cursor: generatingImage ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                              transition: 'all 0.2s', opacity: generatingImage ? 0.7 : 1
                            }}
                          >
                            {generatingImage ? <><Loader2 size={18} className="animate-spin" /> Đang vẽ ảnh...</> : <><ImageIcon size={18} /> Tạo ảnh minh họa bằng AI</>}
                          </button>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#334155' }}>Ảnh minh họa của bạn:</h3>
                            <img src={imageUrl} alt="AI Generated Illustration" style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                              <a href={imageUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', padding: '0.5rem 1rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem' }}>
                                Xem ảnh gốc
                              </a>
                              <button
                                onClick={handleGenerateImage}
                                disabled={generatingImage}
                                style={{
                                  padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem',
                                  backgroundColor: 'white', color: 'var(--hanwha-orange)', border: '1px solid var(--hanwha-orange)',
                                  cursor: generatingImage ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: generatingImage ? 0.7 : 1
                                }}
                              >
                                {generatingImage ? 'Đang tạo lại...' : 'Tạo lại ảnh khác'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>
                    <div style={{ width: '6rem', height: '6rem', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      <Sparkles size={40} color="#cbd5e1" />
                    </div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#475569' }}>Chưa có dữ liệu</p>
                    <p style={{ marginTop: '0.5rem', color: '#64748b', maxWidth: '20rem' }}>Nhập thông tin sản phẩm ở cột bên trái và bấm "Tạo Content" để AI giúp bạn viết bài.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
