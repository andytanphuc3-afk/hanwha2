

export interface ExamQuestion {
  question_ko: string;
  question_vi: string;
  context_ko?: string;
  context_vi?: string;
  options?: string[];
  options_vi?: string[];
  answer: string;
  answer_vi: string;
}

export interface Lesson {
  id: string;
  title: string;
  title_vi: string;
  content: any;
  exam_question: ExamQuestion;
}

export interface CourseData {
  title: string;
  title_vi: string;
  chapter: string;
  chapter_vi: string;
  lessons: Lesson[];
}

import courseDataRaw from '@/data/001-016.json';
import data017032 from '@/data/017-032.json';
import data033046 from '@/data/033-046.json';

export function getCourseData(): CourseData {
  const baseData = courseDataRaw as unknown as CourseData;
  const lessons = [...baseData.lessons];

  const processTopics = (jsonData: any) => {
    if (jsonData && jsonData.topics && Array.isArray(jsonData.topics)) {
      jsonData.topics.forEach((topic: any) => {
        const { id, title_ko, title_vi, category_ko, category_vi, exam_question, ...content } = topic;
        lessons.push({
          id,
          title: title_ko || topic.title || '',
          title_vi: title_vi || topic.title_vi || '',
          content,
          exam_question
        });
      });
    }
  };

  processTopics(data017032);
  processTopics(data033046);

  return {
    ...baseData,
    lessons
  };
}

export function getLessonById(id: string): Lesson | undefined {
  const data = getCourseData();
  return data.lessons.find((lesson) => lesson.id === id);
}

export interface VocabItem {
  ko: string;
  vi: string;
  lessonId: string;
}

export function getAllVocabulary(): VocabItem[] {
  const data = getCourseData();
  const vocab: VocabItem[] = [];

  const traverse = (node: any, lessonId: string) => {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach(item => traverse(item, lessonId));
      return;
    }

    if (typeof node === 'string') {
      const regex = /([가-힣a-zA-Z0-9\s,]+)\(([^)]*[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]+[^)]*)\)/gi;
      let match;
      while ((match = regex.exec(node)) !== null) {
        const koParts = match[1].split(/[:./-]/);
        const ko = koParts[koParts.length - 1].trim();
        const vi = match[2].trim();
        if (ko && vi && ko.length < 50 && vi.length < 80) {
          if (!vocab.find(v => v.ko === ko)) {
            vocab.push({ ko, vi, lessonId });
          }
        }
      }
      return;
    }

    if (typeof node === 'object') {
      // Dạng 1: _ko và _vi
      const keys = Object.keys(node);
      const koKeys = keys.filter(k => k.endsWith('_ko') || k === 'ko');
      koKeys.forEach(k => {
        const baseKey = k.replace('_ko', '').replace('ko', '');
        const viKey = baseKey ? `${baseKey}_vi` : 'vi';
        if (node[viKey] && typeof node[k] === 'string' && typeof node[viKey] === 'string') {
          if (node[k].length < 100 && node[viKey].length < 150) { // Cứ lấy dài hơn một chút để chứa các cụm từ
            if (!vocab.find(v => v.ko === node[k].trim())) {
              vocab.push({ ko: node[k].trim(), vi: node[viKey].trim(), lessonId });
            }
          }
        }
      });

      // Dạng 2: Key chứa "(...)"
      keys.forEach(k => {
        if (k.includes('(') && k.includes(')')) {
          const ko = k.split(' (')[0] || k.split('(')[0];
          const vi = k.substring(k.indexOf('(') + 1, k.indexOf(')'));
          // Lọc các từ ngắn (dưới 50 ký tự) để lấy từ vựng, tránh lấy nguyên câu dài
          if (ko && vi && ko.length < 50) {
            if (!vocab.find(v => v.ko === ko.trim())) {
              vocab.push({ ko: ko.trim(), vi: vi.trim(), lessonId });
            }
          }
        }
        traverse(node[k], lessonId);
      });
    }
  };

  data.lessons.forEach(lesson => {
    // Add title itself as vocabulary
    vocab.push({ ko: lesson.title, vi: lesson.title_vi, lessonId: lesson.id });
    traverse(lesson.content, lesson.id);
  });
  return vocab;
}
