"use client";

import { useState } from "react";
import { ExamQuestion } from "@/lib/data";
import { stripViText } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

export default function QuizComponent({ exam_question, showVi }: { exam_question: ExamQuestion, showVi: boolean }) {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Gộp options_ko và options_vi
  const options = exam_question.options || [];
  const optionsVi = exam_question.options_vi || [];
  
  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt !== null) {
      setIsSubmitted(true);
    }
  };

  const handleRetry = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);
  };

  const isCorrect = (optKo: string) => {
    // Kiểm tra đáp án bằng cách xem ký tự đầu tiên (VD: ①)
    const optPrefix = optKo.trim().charAt(0);
    const ansPrefix = exam_question.answer.trim().charAt(0);
    return optPrefix === ansPrefix;
  };

  return (
    <div className="card" style={{ border: '2px solid var(--hanwha-orange-light)' }}>
      <div className="mb-6 pb-4" style={{ borderBottom: '2px dashed var(--slate-200)' }}>
        <h2 className="font-black text-2xl mb-2 flex items-center gap-2 text-slate-800">
          📝 Trắc nghiệm cuối bài
        </h2>
        <p className="text-slate">Kiểm tra lại kiến thức bạn vừa học.</p>
      </div>

      <div className="mb-6">
        <div className="font-bold text-lg mb-2">{stripViText(exam_question.question_ko, showVi)}</div>
        {showVi && exam_question.question_vi && (
          <div className="text-orange font-bold mb-4">{exam_question.question_vi}</div>
        )}

        {exam_question.context_ko && (
          <div className="p-4 bg-slate-50 rounded-lg mb-6 border border-slate-200">
            <div className="mb-2 italic">{stripViText(exam_question.context_ko, showVi)}</div>
            {showVi && exam_question.context_vi && (
              <div className="italic text-slate-500 pt-2 border-t border-slate-200">{exam_question.context_vi}</div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {options.map((opt, idx) => {
          let bgColor = "white";
          let borderColor = "var(--slate-200)";
          let textColor = "var(--text-primary)";

          if (isSubmitted) {
            if (isCorrect(opt)) {
              bgColor = "#ecfdf5";
              borderColor = "#10b981";
              textColor = "#047857";
            } else if (selectedOpt === idx) {
              bgColor = "#fef2f2";
              borderColor = "#ef4444";
              textColor = "#b91c1c";
            }
          } else if (selectedOpt === idx) {
            bgColor = "var(--hanwha-orange-light)";
            borderColor = "var(--hanwha-orange)";
            textColor = "var(--hanwha-orange-hover)";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className="text-left p-4 rounded-xl transition-all"
              style={{
                backgroundColor: bgColor,
                border: `2px solid ${borderColor}`,
                color: textColor,
                cursor: isSubmitted ? 'default' : 'pointer',
                display: 'block',
                width: '100%',
                textAlign: 'left',
                boxShadow: isSubmitted ? 'none' : 'var(--shadow-sm)'
              }}
            >
              <div className="font-bold text-lg">{stripViText(opt, showVi)}</div>
              {showVi && optionsVi[idx] && (
                <div className="mt-1 text-slate-600 font-medium">{optionsVi[idx]}</div>
              )}
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button 
          onClick={handleSubmit} 
          disabled={selectedOpt === null}
          className={`btn ${selectedOpt !== null ? 'btn-primary' : 'bg-slate-200 text-slate-500 cursor-not-allowed w-full'}`}
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
        >
          Nộp bài
        </button>
      ) : (
        <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--slate-50)', border: '1px solid var(--slate-200)' }}>
          <div className="flex items-center gap-2 mb-4">
            {selectedOpt !== null && isCorrect(options[selectedOpt]) ? (
              <><CheckCircle2 className="text-green-500" size={28} /><span className="font-black text-green-600 text-xl">Tuyệt vời! Đáp án chính xác.</span></>
            ) : (
              <><XCircle className="text-red-500" size={28} /><span className="font-black text-red-600 text-xl">Chưa đúng rồi!</span></>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="font-bold mb-2 text-slate-800">Giải thích đáp án:</div>
            <div className="font-bold text-slate-700">{stripViText(exam_question.answer, showVi)}</div>
            {showVi && exam_question.answer_vi && (
              <div className="text-orange mt-2 font-bold bg-orange-50 p-3 rounded-lg border border-orange-100">
                {exam_question.answer_vi}
              </div>
            )}
          </div>

          <button onClick={handleRetry} className="btn btn-outline mt-6 w-full">Làm lại bài này</button>
        </div>
      )}
    </div>
  );
}
