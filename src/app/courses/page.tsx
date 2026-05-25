import Link from 'next/link';
import { getCourseData } from '@/lib/data';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const itemsPerPage = 10;
  
  const courseData = getCourseData();
  const totalLessons = courseData.lessons.length;
  const totalPages = Math.ceil(totalLessons / itemsPerPage);
  
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLessons = courseData.lessons.slice(startIndex, endIndex);

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
          {currentLessons.map((lesson) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            {validPage > 1 ? (
              <Link href={`/courses?page=${validPage - 1}`} className="btn btn-outline flex items-center gap-1" style={{ padding: '0.5rem 1rem' }}>
                <ChevronLeft size={16} /> Trang trước
              </Link>
            ) : (
              <span className="btn flex items-center gap-1 opacity-50 cursor-not-allowed" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', color: '#888', backgroundColor: 'transparent' }}>
                <ChevronLeft size={16} /> Trang trước
              </span>
            )}
            
            <span className="font-bold">
              Trang {validPage} / {totalPages}
            </span>
            
            {validPage < totalPages ? (
              <Link href={`/courses?page=${validPage + 1}`} className="btn btn-outline flex items-center gap-1" style={{ padding: '0.5rem 1rem' }}>
                Trang tiếp <ChevronRight size={16} />
              </Link>
            ) : (
              <span className="btn flex items-center gap-1 opacity-50 cursor-not-allowed" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', color: '#888', backgroundColor: 'transparent' }}>
                Trang tiếp <ChevronRight size={16} />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
