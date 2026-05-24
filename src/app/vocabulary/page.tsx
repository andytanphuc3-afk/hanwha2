import { getAllVocabulary } from '@/lib/data';
import VocabularyClient from './VocabularyClient';

export default function VocabularyPage() {
  const vocab = getAllVocabulary();
  return <VocabularyClient initialVocab={vocab} />;
}
