import Link from 'next/link';
import { getCourseData } from '@/lib/data';
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const courseData = getCourseData();

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

      <div className="container py-12" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mb-12">
          <h1 className="font-black mb-2" style={{ fontSize: '2.5rem' }}>{courseData.title_vi}</h1>
          <p className="text-slate mb-2" style={{ fontSize: '1.25rem' }}>{courseData.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {courseData.lessons.map((lesson) => (
            <Link href={`/courses/${lesson.id}`} key={lesson.id} className="card lesson-card-hover flex flex-col justify-between" style={{ cursor: 'pointer' }}>
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
    </div>
  );
}
