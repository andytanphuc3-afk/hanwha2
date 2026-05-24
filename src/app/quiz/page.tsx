import { getCourseData } from '@/lib/data';
import QuizApp from '@/components/QuizApp';

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
    <div className="container py-8">
      <h1 className="font-black mb-2 text-center" style={{ fontSize: '2.5rem' }}>Hệ Thống Thi Trắc Nghiệm</h1>
      <p className="text-slate text-center mb-8">Ôn tập toàn bộ kiến thức từ các bài giảng</p>
      
      <QuizApp allQuestions={allQuestions} />
    </div>
  );
}
