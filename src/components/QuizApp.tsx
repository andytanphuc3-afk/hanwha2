"use client";

import { useState, useEffect } from 'react';
import { ExamQuestion } from '@/lib/data';
import { stripViText } from '@/lib/utils';
import { Timer, CheckCircle2, XCircle, AlertCircle, RefreshCw, Languages } from 'lucide-react';

interface QuestionExtended extends ExamQuestion {
  lessonId: string;
  lessonTitle: string;
  lessonTitleVi: string;
}

type ScreenState = 'setup' | 'runner' | 'result';
type FeedbackMode = 'instant' | 'delayed';

export default function QuizApp({ allQuestions }: { allQuestions: QuestionExtended[] }) {
  const [screen, setScreen] = useState<ScreenState>('setup');
  const [showVi, setShowVi] = useState(false);
  
  // Cấu hình
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>('delayed');
  const [timeLimit, setTimeLimit] = useState<number>(5); // Tổng thời gian (Phút)
  
  // Trạng thái bài thi
  const [activeQuestions, setActiveQuestions] = useState<QuestionExtended[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  // Logic đếm ngược
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (screen === 'runner' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [screen, timeLeft]);

  // Format thời gian MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    // Xáo trộn và chọn câu hỏi
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numQuestions === -1 ? shuffled.length : numQuestions);
    setActiveQuestions(selected);
    setCurrentIdx(0);
    setAnswers({});
    setTimeLeft(timeLimit * 60); // Tính bằng tổng thời gian người dùng chọn
    setScreen('runner');
  };

  const handleSelectAnswer = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleFinish = () => {
    setScreen('result');
  };

  const isCorrect = (qIdx: number, optKo: string) => {
    const q = activeQuestions[qIdx];
    const optPrefix = optKo.trim().charAt(0);
    const ansPrefix = q.answer.trim().charAt(0);
    return optPrefix === ansPrefix;
  };

  // Tính điểm
  const score = activeQuestions.reduce((acc, q, idx) => {
    const ansIdx = answers[idx];
    if (ansIdx !== undefined) {
      const optKo = q.options![ansIdx];
      if (isCorrect(idx, optKo)) return acc + 1;
    }
    return acc;
  }, 0);

  // MÀN HÌNH SETUP
  if (screen === 'setup') {
    return (
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', borderTop: '6px solid var(--hanwha-orange)', padding: '2.5rem' }}>
        <h2 className="font-black mb-8 text-center" style={{ fontSize: '2rem', color: 'var(--slate-800)' }}>Cấu hình bài thi</h2>
        
        <div className="mb-8">
          <label className="font-bold mb-4" style={{ display: 'block', fontSize: '1.1rem', color: 'var(--slate-700)' }}>1. Số lượng câu hỏi</label>
          <div className="flex gap-4 flex-wrap">
            {[5, 10, 15, -1].map(n => (
              <button 
                key={n} 
                onClick={() => setNumQuestions(n)}
                className={`btn ${numQuestions === n ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, minWidth: '120px', padding: '1rem', fontSize: '1.1rem' }}
              >
                {n === -1 ? 'Tất cả' : `${n} câu`}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="font-bold mb-4" style={{ display: 'block', fontSize: '1.1rem', color: 'var(--slate-700)' }}>2. Chế độ hiển thị đáp án</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setFeedbackMode('delayed')}
              style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: feedbackMode === 'delayed' ? '3px solid var(--hanwha-orange)' : '3px solid var(--slate-200)',
                backgroundColor: feedbackMode === 'delayed' ? 'var(--hanwha-orange-light)' : 'white',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: feedbackMode === 'delayed' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              <div className="font-bold text-xl mb-2" style={{ color: feedbackMode === 'delayed' ? 'var(--hanwha-orange-hover)' : 'var(--slate-700)' }}>
                Thi Thật (Delayed)
              </div>
              <div style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Chỉ hiện đáp án sau khi nộp bài. Dành cho việc tự đánh giá năng lực chính xác.
              </div>
            </button>
            <button 
              onClick={() => setFeedbackMode('instant')}
              style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: feedbackMode === 'instant' ? '3px solid var(--hanwha-orange)' : '3px solid var(--slate-200)',
                backgroundColor: feedbackMode === 'instant' ? 'var(--hanwha-orange-light)' : 'white',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: feedbackMode === 'instant' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              <div className="font-bold text-xl mb-2" style={{ color: feedbackMode === 'instant' ? 'var(--hanwha-orange-hover)' : 'var(--slate-700)' }}>
                Luyện Tập (Instant)
              </div>
              <div style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Hiển thị giải thích Đúng/Sai ngay sau khi chọn. Phù hợp để ôn tập và ghi nhớ.
              </div>
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label className="font-bold mb-4" style={{ display: 'block', fontSize: '1.1rem', color: 'var(--slate-700)' }}>3. Tổng thời gian làm bài</label>
          <div className="flex gap-4 flex-wrap">
            {[5, 10, 15].map(n => (
              <button 
                key={n} 
                onClick={() => setTimeLimit(n)}
                className={`btn ${timeLimit === n ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, minWidth: '150px', padding: '1rem', fontSize: '1.1rem' }}
              >
                {n} phút
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={startQuiz} 
          className="btn btn-primary w-full text-center"
          style={{ padding: '1.25rem', fontSize: '1.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)' }}
        >
          🚀 Bắt Đầu Làm Bài
        </button>
      </div>
    );
  }

  // MÀN HÌNH THI
  if (screen === 'runner') {
    const q = activeQuestions[currentIdx];
    const options = q.options || [];
    const optionsVi = q.options_vi || [];
    const hasAnswered = answers[currentIdx] !== undefined;
    const isInstant = feedbackMode === 'instant';

    return (
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4" style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="font-bold text-slate-800" style={{ backgroundColor: 'var(--slate-100)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
            Câu {currentIdx + 1} / {activeQuestions.length}
          </div>
          <div className="flex items-center gap-2 font-black text-xl" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', color: timeLeft < 60 ? 'red' : 'var(--slate-800)', backgroundColor: timeLeft < 60 ? '#fef2f2' : 'var(--slate-100)' }}>
            <Timer size={24} /> {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2 font-bold" style={{ backgroundColor: 'var(--slate-50)', padding: '0.25rem 0.75rem', borderRadius: '50px', border: '1px solid var(--slate-200)' }}>
            <Languages size={18} className="text-orange" />
            <span style={{ fontSize: '0.875rem' }}>Dịch</span>
            <button 
              onClick={() => setShowVi(!showVi)}
              style={{
                width: '36px', height: '20px',
                backgroundColor: showVi ? 'var(--hanwha-orange)' : 'var(--slate-400)',
                borderRadius: '10px', position: 'relative', cursor: 'pointer',
                transition: 'background-color 0.3s', border: 'none', padding: 0, marginLeft: '0.25rem'
              }}
            >
              <div style={{
                width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%',
                position: 'absolute', top: '2px', left: showVi ? '18px' : '2px',
                transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </button>
          </div>

          <button onClick={handleFinish} className="btn" style={{ border: '2px solid red', color: 'red', backgroundColor: 'transparent' }}>
            Nộp bài sớm
          </button>
        </div>

        <div className="card" style={{ borderTop: '6px solid var(--hanwha-orange)' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--hanwha-orange-light)', color: 'var(--hanwha-orange-hover)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Thuộc Bài: {q.lessonId}
          </div>
          
          <div className="mb-6">
            <div className="font-bold text-xl mb-2 text-slate-800">{stripViText(q.question_ko, showVi)}</div>
            {showVi && <div className="text-orange font-bold mb-4">{q.question_vi}</div>}

            {q.context_ko && (
              <div style={{ padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--slate-200)' }}>
                <div className="italic text-slate-700">{stripViText(q.context_ko, showVi)}</div>
                {(showVi && q.context_vi) && (
                  <div className="italic text-slate-500 mt-2 pt-2" style={{ borderTop: '1px solid var(--slate-200)' }}>{q.context_vi}</div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {options.map((opt, idx) => {
              let bgColor = "white";
              let borderColor = "var(--slate-200)";
              let textColor = "var(--text-primary)";

              if (isInstant && hasAnswered) {
                if (isCorrect(currentIdx, opt)) {
                  bgColor = "#ecfdf5"; borderColor = "#10b981"; textColor = "#047857";
                } else if (answers[currentIdx] === idx) {
                  bgColor = "#fef2f2"; borderColor = "#ef4444"; textColor = "#b91c1c";
                }
              } else if (answers[currentIdx] === idx) {
                bgColor = "var(--hanwha-orange-light)";
                borderColor = "var(--hanwha-orange)";
                textColor = "var(--hanwha-orange-hover)";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isInstant && hasAnswered}
                  style={{
                    padding: '1rem',
                    borderRadius: '1rem',
                    backgroundColor: bgColor,
                    border: `2px solid ${borderColor}`,
                    color: textColor,
                    cursor: (isInstant && hasAnswered) ? 'default' : 'pointer',
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    boxShadow: (isInstant && hasAnswered) ? 'none' : 'var(--shadow-sm)'
                  }}
                >
                  <div className="font-bold text-lg">{stripViText(opt, showVi)}</div>
                  {(showVi && optionsVi[idx]) && (
                    <div className="mt-1 font-medium" style={{ color: 'var(--slate-600)' }}>{optionsVi[idx]}</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Giải thích nếu chế độ Instant */}
          {isInstant && hasAnswered && (
            <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: 'var(--slate-50)', border: '1px solid var(--slate-200)', marginBottom: '2rem' }}>
              <div className="font-bold mb-2 text-slate-800">Giải thích đáp án:</div>
              <div className="font-bold text-slate-700">{stripViText(q.answer, showVi)}</div>
              {(showVi && q.answer_vi) && (
                <div className="mt-2 font-bold" style={{ color: 'var(--hanwha-orange-hover)', backgroundColor: 'var(--hanwha-orange-light)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f9d5c1' }}>
                  {q.answer_vi}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-6" style={{ borderTop: '1px solid var(--slate-200)' }}>
            <button 
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="btn"
              style={{ backgroundColor: currentIdx === 0 ? 'var(--slate-100)' : 'white', color: currentIdx === 0 ? 'var(--slate-400)' : 'var(--hanwha-orange)', border: currentIdx === 0 ? 'none' : '2px solid var(--hanwha-orange)' }}
            >
              &larr; Câu trước
            </button>

            {currentIdx < activeQuestions.length - 1 ? (
              <button 
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="btn btn-primary"
              >
                Câu tiếp theo &rarr;
              </button>
            ) : (
              <button onClick={handleFinish} className="btn" style={{ backgroundColor: '#10b981', color: 'white' }}>
                Hoàn thành & Nộp bài
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MÀN HÌNH KẾT QUẢ
  if (screen === 'result') {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    let message = "Cần cố gắng hơn!";
    let colorHex = "#ef4444";
    if (percentage >= 80) { message = "Xuất sắc!"; colorHex = "#10b981"; }
    else if (percentage >= 60) { message = "Khá tốt!"; colorHex = "#f59e0b"; }

    return (
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card text-center mb-8" style={{ padding: '3rem' }}>
          <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--slate-50)', marginBottom: '1.5rem', border: '8px solid var(--slate-100)' }}>
            <span className="font-black" style={{ fontSize: '2.5rem', color: colorHex }}>{score}/{activeQuestions.length}</span>
          </div>
          <h2 className="font-black mb-2" style={{ fontSize: '2rem', color: colorHex }}>{message}</h2>
          <p className="text-xl mb-8" style={{ color: 'var(--slate-600)' }}>Bạn đã hoàn thành bài thi với độ chính xác {percentage}%</p>
          
          <button onClick={() => setScreen('setup')} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.25rem' }}>
            <RefreshCw size={24} /> Làm lại bài thi mới
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-slate-800" style={{ fontSize: '1.5rem' }}>Chi tiết đáp án</h3>
          
          <div className="flex items-center gap-2 font-bold" style={{ backgroundColor: 'white', padding: '0.25rem 0.75rem', borderRadius: '50px', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
            <Languages size={18} className="text-orange" />
            <span style={{ fontSize: '0.875rem' }}>Dịch</span>
            <button 
              onClick={() => setShowVi(!showVi)}
              style={{
                width: '36px', height: '20px', backgroundColor: showVi ? 'var(--hanwha-orange)' : 'var(--slate-400)',
                borderRadius: '10px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s', border: 'none', padding: 0, marginLeft: '0.25rem'
              }}
            >
              <div style={{
                width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%',
                position: 'absolute', top: '2px', left: showVi ? '18px' : '2px',
                transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {activeQuestions.map((q, idx) => {
            const ansIdx = answers[idx];
            const hasAnswered = ansIdx !== undefined;
            const userOptKo = hasAnswered ? q.options![ansIdx] : "";
            const correct = hasAnswered && isCorrect(idx, userOptKo);

            return (
              <div key={idx} className="card" style={{ borderLeft: correct ? '6px solid #10b981' : '6px solid #ef4444', padding: '1.5rem' }}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {correct ? <CheckCircle2 color="#10b981" size={28} /> : <XCircle color="#ef4444" size={28} />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 mb-1" style={{ fontSize: '1.1rem' }}>Câu {idx + 1}: {stripViText(q.question_ko, showVi)}</div>
                    {showVi && <div className="font-bold mb-4" style={{ color: 'var(--hanwha-orange)' }}>{q.question_vi}</div>}
                    
                    <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--slate-200)' }}>
                      <div className="mb-2">
                        <span className="font-bold" style={{ color: 'var(--slate-600)' }}>Bạn chọn:</span>
                        <span className="font-bold ml-2" style={{ color: correct ? '#10b981' : '#ef4444' }}>
                          {hasAnswered ? stripViText(userOptKo, showVi) : "Chưa trả lời"}
                        </span>
                      </div>
                      {!correct && (
                        <div>
                          <span className="font-bold" style={{ color: 'var(--slate-600)' }}>Đáp án đúng:</span>
                          <span className="font-bold ml-2" style={{ color: '#10b981' }}>{stripViText(q.answer, showVi)}</span>
                          {(showVi && q.answer_vi) && <div className="mt-1 font-bold" style={{ color: 'var(--hanwha-orange)', fontSize: '0.875rem' }}>{q.answer_vi}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
