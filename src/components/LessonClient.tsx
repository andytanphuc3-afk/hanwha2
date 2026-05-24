"use client";

import { useState } from 'react';
import { Lesson } from '@/lib/data';
import { stripViText } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Languages, Sparkles, Loader2 } from 'lucide-react';
import QuizComponent from './QuizComponent';

// Hàm đệ quy để render nội dung JSON động
const renderContent = (data: any, showVi: boolean, keyPrefix = ""): React.ReactNode => {
  if (!data) return null;

  if (typeof data === 'string') {
    return <span>{stripViText(data, showVi)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="flex flex-col gap-4 ml-4 mt-2">
        {data.map((item, idx) => (
          <div key={`${keyPrefix}-${idx}`} className="p-4" style={{ backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--hanwha-orange)' }}>
            {renderContent(item, showVi, `${keyPrefix}-${idx}`)}
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === 'object') {
    // Nếu object có đuôi _ko và _vi ở cùng 1 cấp (Ví dụ: 내용_ko, 내용_vi)
    const keys = Object.keys(data);
    const koKeys = keys.filter(k => k.endsWith('_ko') || k === 'ko');
    
    if (koKeys.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {keys.map(k => {
            if (k.endsWith('_vi') || k === 'vi') return null; // Bỏ qua vì sẽ được render chung với _ko
            if (k.endsWith('_ko') || k === 'ko') {
              const baseKey = k.replace('_ko', '').replace('ko', '');
              const viKey = baseKey ? `${baseKey}_vi` : 'vi';
              const viText = data[viKey];
              const koText = data[k];
              
              return (
                <div key={k} className="mb-2">
                  <div className="font-bold text-slate-800" style={{ fontSize: '1.1rem' }}>{stripViText(koText, showVi)}</div>
                  {showVi && viText && (
                    <div className="mt-1 p-2" style={{ backgroundColor: '#fff8f3', color: '#d95a12', borderLeft: '3px solid #f37021', borderRadius: '0 4px 4px 0' }}>
                      {viText}
                    </div>
                  )}
                </div>
              );
            }
            
            // Render key thông thường (Ví dụ: 시대, 연도)
            return (
              <div key={k} className="mb-2">
                <span className="font-black text-orange" style={{ display: 'inline-block', minWidth: '100px' }}>{stripViText(k, showVi).replace('_', ' ').toUpperCase()}:</span>
                <span className="font-bold ml-2">{typeof data[k] === 'string' ? stripViText(data[k], showVi) : renderContent(data[k], showVi, k)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    // Object lồng nhau thông thường
    return (
      <div className="flex flex-col gap-4 mt-2">
        {keys.map(k => {
          const koKey = k.split(' (')[0];
          const viKey = k.includes('(') ? k.split('(')[1].replace(')', '') : '';

          return (
            <div key={k} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-800 text-lg">{koKey}</h3>
                {showVi && viKey && <span className="text-orange font-bold">({viKey})</span>}
              </div>
              <div className="pl-4" style={{ borderLeft: '2px solid var(--slate-200)' }}>
                {renderContent(data[k], showVi, k)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export default function LessonClient({ lesson, prevId, nextId }: { lesson: Lesson, prevId: string | null, nextId: string | null }) {
  const [showVi, setShowVi] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: JSON.stringify(lesson.content) })
      });
      const data = await response.json();
      if (data.summary) {
        setAiSummary(data.summary);
      } else {
        alert('Lỗi: ' + (data.error || 'Không thể tạo tóm tắt'));
      }
    } catch (e) {
      console.error(e);
      alert('Có lỗi xảy ra khi kết nối tới AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Snake SVG */}
      <svg 
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
      >
        <path 
          d="M-100,100 C200,300 800,-100 1100,200 C1200,400 800,600 500,600 C200,600 -100,900 200,1100 C500,1300 900,1000 1100,1100" 
          fill="none" 
          stroke="var(--hanwha-orange)" 
          strokeWidth="60" 
          strokeLinecap="round"
          className="snake-animation"
        />
      </svg>
      
      <div className="container py-8" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        {/* Header controls */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 font-bold transition-all hover:scale-105"
          style={{ padding: '0.5rem 1.25rem', backgroundColor: 'var(--hanwha-orange)', color: 'white', borderRadius: '50px', fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(243, 112, 33, 0.3)' }}
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </Link>

        {/* Nút Toggle ON/OFF */}
        <div className="flex items-center gap-2 font-bold text-slate-800" style={{ backgroundColor: 'var(--slate-50)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
          <Languages size={20} className="text-orange" />
          <span>Dịch Tiếng Việt</span>
          <button 
            onClick={() => setShowVi(!showVi)}
            style={{
              width: '44px', height: '24px', backgroundColor: showVi ? 'var(--hanwha-orange)' : 'var(--slate-400)',
              borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s', border: 'none', padding: 0, marginLeft: '0.5rem'
            }}
          >
            <div style={{
              width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%',
              position: 'absolute', top: '2px', left: showVi ? '22px' : '2px',
              transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }} />
          </button>
        </div>
      </div>

      {/* Book Layout Card */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '20px', 
        border: '3px solid #4a3b69', /* Tím đậm giống sách */
        padding: '2rem 2.5rem',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem'
      }}>
        
        {/* Title Section */}
        <div style={{ borderBottom: '2px solid #4a3b69', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center" style={{ gap: '0.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9ba3b5' }}>{lesson.id}</span>
                <span style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b' }}>· {lesson.title}</span>
              </div>
              {showVi && (
                <div className="mt-2 text-orange font-bold" style={{ fontSize: '1.25rem' }}>
                  {lesson.title_vi}
                </div>
              )}
            </div>
            
            <button 
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="btn flex items-center gap-2 transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)'
              }}
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {isGenerating ? 'Đang tóm tắt...' : 'AI Tóm tắt'}
            </button>
          </div>
        </div>

        {/* AI Summary Box */}
        {aiSummary && (
          <div style={{
            background: 'linear-gradient(to right, #fdf4ff, #f3e8ff)',
            border: '2px solid #e879f9',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(232, 121, 249, 0.15)'
          }}>
            <div className="flex items-center gap-2 mb-4 font-bold" style={{ color: '#a21caf', fontSize: '1.2rem' }}>
              <Sparkles size={24} /> ✨ AI Tóm Tắt Ý Chính
            </div>
            <div style={{ lineHeight: '1.8', color: '#4a044e', fontSize: '1.05rem', fontWeight: '500' }}>
              {aiSummary.split('\n').map((line, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>{line}</div>
              ))}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="content-section" style={{ fontSize: '1.05rem', color: '#334155' }}>
          {renderContent(lesson.content, showVi)}
        </div>

        {/* Exam Question Section */}
        {lesson.exam_question && (
          <div className="mt-12 pt-8" style={{ borderTop: '2px dashed var(--slate-300)' }}>
            <div className="flex items-start gap-3 mb-6">
              <div style={{ 
                backgroundColor: '#4a3b69', color: 'white', 
                width: '28px', height: '28px', borderRadius: '4px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '0.9rem', flexShrink: 0, marginTop: '0.25rem'
              }}>
                문
              </div>
              <div>
                <div className="font-bold text-slate-800 text-lg mb-2">{lesson.exam_question.question_ko}</div>
                {showVi && <div className="text-orange font-bold mb-4">{lesson.exam_question.question_vi}</div>}
              </div>
            </div>
            
            <QuizComponent exam_question={lesson.exam_question} showVi={showVi} />
          </div>
        )}
      </div>

      {/* Điều hướng bài học */}
      <div className="flex items-center justify-between">
        {prevId ? (
          <Link href={`/courses/${prevId}`} className="btn btn-outline" style={{ border: '2px solid var(--hanwha-orange)', color: 'var(--hanwha-orange)' }}>
            &larr; Bài trước
          </Link>
        ) : <div></div>}

        {nextId && (
          <Link href={`/courses/${nextId}`} className="btn" style={{ backgroundColor: 'var(--hanwha-orange)', color: 'white' }}>
            Bài tiếp theo &rarr;
          </Link>
        )}
      </div>
      </div>
    </div>
  );
}
