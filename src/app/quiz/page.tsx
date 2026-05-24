import { getCourseData } from '@/lib/data';
import QuizApp from '@/components/QuizApp';

import { CheckSquare, Target, Sparkles } from 'lucide-react';

export default function QuizPage() {
  const data = getCourseData();
  // Lấy ra tất cả các câu hỏi trắc nghiệm từ các bài học
  const allQuestions = data.lessons
    .filter(lesson => lesson.exam_question)
    .map(lesson => ({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonTitleVi: lesson.title_vi,
      ...lesson.exam_question
    }));

  return (
    <div className="container py-8" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Beautiful Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        marginBottom: '2.5rem',
        color: 'white',
        boxShadow: '0 20px 40px -10px rgba(124, 58, 237, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1, transform: 'scale(2)' }}>
          <Target size={200} />
        </div>
        <div style={{ position: 'absolute', bottom: '20px', right: '150px', opacity: 0.2 }}>
          <Sparkles size={60} />
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '50%', color: '#6366f1', flexShrink: 0, zIndex: 1, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <CheckSquare size={48} />
        </div>
        <div style={{ zIndex: 1 }}>
          <h1 className="font-black mb-3" style={{ fontSize: '2.5rem', letterSpacing: '-0.03em', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Hệ Thống Thi Trắc Nghiệm</h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '600px', lineHeight: 1.6, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Ôn tập toàn bộ kiến thức từ các bài giảng. Rèn luyện kỹ năng giải đề với các câu hỏi bám sát cấu trúc thi thực tế.
          </p>
        </div>
      </div>
      
      <QuizApp allQuestions={allQuestions} />
    </div>
  );
}
