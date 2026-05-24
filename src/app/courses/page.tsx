import Link from 'next/link';
import { getCourseData } from '@/lib/data';
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const courseData = getCourseData();

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="font-black mb-2" style={{ fontSize: '2.5rem' }}>{courseData.title_vi}</h1>
        <p className="text-slate mb-2" style={{ fontSize: '1.25rem' }}>{courseData.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {courseData.lessons.map((lesson) => (
          <Link href={`/courses/${lesson.id}`} key={lesson.id} className="card flex flex-col justify-between" style={{ cursor: 'pointer' }}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-orange" />
                <span className="font-bold text-slate">Bài {lesson.id}</span>
              </div>
              <h2 className="font-bold mb-2" style={{ fontSize: '1.25rem' }}>{lesson.title_vi}</h2>
              <p className="text-slate" style={{ fontSize: '1rem' }}>{lesson.title}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <span className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Vào Học</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
