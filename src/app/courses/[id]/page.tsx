import { getLessonById, getCourseData } from '@/lib/data';
import { notFound } from 'next/navigation';
import LessonClient from '@/components/LessonClient';

export async function generateStaticParams() {
  const data = getCourseData();
  return data.lessons.map((lesson) => ({
    id: lesson.id,
  }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = getCourseData();
  const lessonIndex = data.lessons.findIndex((l) => l.id === id);

  if (lessonIndex === -1) {
    notFound();
  }

  const lesson = data.lessons[lessonIndex];
  const prevId = lessonIndex > 0 ? data.lessons[lessonIndex - 1].id : null;
  const nextId = lessonIndex < data.lessons.length - 1 ? data.lessons[lessonIndex + 1].id : null;

  return <LessonClient lesson={lesson} prevId={prevId} nextId={nextId} />;
}
