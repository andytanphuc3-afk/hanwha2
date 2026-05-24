export function stripViText(text: string, showVi: boolean): string {
  if (showVi || typeof text !== 'string') return text;
  // Regex matches "(...)" or " (...)" containing Vietnamese characters
  const viRegex = /\s*\([^)]*[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]+[^)]*\)/gi;
  return text.replace(viRegex, '');
}

import { ExamQuestion } from './data';

export function getFullAnswerKo(q: ExamQuestion): string {
  if (q.answer && q.answer.trim().length <= 2 && q.options) {
    const prefix = q.answer.trim().charAt(0);
    const opt = q.options.find(o => o.trim().charAt(0) === prefix);
    if (opt) return opt;
  }
  return q.answer || '';
}

export function getFullAnswerVi(q: ExamQuestion): string {
  if (!q.answer_vi || q.answer_vi.trim().length <= 2) {
    if (q.options && q.options_vi && q.answer) {
      const prefix = q.answer.trim().charAt(0);
      const idx = q.options.findIndex(o => o.trim().charAt(0) === prefix);
      if (idx !== -1 && q.options_vi[idx]) return q.options_vi[idx];
    }
  }
  return q.answer_vi || '';
}
