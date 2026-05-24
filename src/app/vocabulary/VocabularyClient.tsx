"use client";

import { useState } from 'react';
import { VocabItem } from '@/lib/data';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function VocabularyClient({ initialVocab }: { initialVocab: VocabItem[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [lessonFilter, setLessonFilter] = useState('all');
  
  // Flashcard state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredVocab = initialVocab.filter(v => {
    const matchesSearch = v.ko.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.vi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLesson = lessonFilter === 'all' || v.lessonId === lessonFilter;
    return matchesSearch && matchesLesson;
  });

  const uniqueLessons = Array.from(new Set(initialVocab.map(v => v.lessonId))).sort();

  const handleNext = () => {
    if (currentIndex < filteredVocab.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  const currentCard = filteredVocab[currentIndex];

  // If filter changes, reset current index
  const handleFilterChange = (val: string) => {
    setLessonFilter(val);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="container py-8" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      <div className="mb-6">
        <h1 className="font-black text-3xl text-slate-900">Sổ Tay Từ Vựng</h1>
      </div>

      {filteredVocab.length > 0 ? (
        <>
          {/* Main Flashcard Area */}
          <div className="quizlet-card-container" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`quizlet-card ${isFlipped ? 'flipped' : ''}`}>
              {/* Front: Korean */}
              <div className="quizlet-card-face">
                <div className="font-black text-slate-800" style={{ fontSize: '2.5rem' }}>{currentCard.ko}</div>
              </div>
              {/* Back: Vietnamese */}
              <div className="quizlet-card-face quizlet-card-back">
                <div className="font-black" style={{ fontSize: '2.5rem', color: 'var(--hanwha-orange)' }}>{currentCard.vi}</div>
              </div>
            </div>
          </div>

          {/* Flashcard Controls */}
          <div style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            backgroundColor: 'white', padding: '1.5rem 2.5rem', borderRadius: '100px', 
            boxShadow: '0 15px 35px -5px rgba(0,0,0,0.08)', marginBottom: '4rem',
            border: '1px solid rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0} 
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '4rem', height: '4rem', borderRadius: '50%',
                  border: 'none', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  backgroundColor: currentIndex === 0 ? '#f1f5f9' : 'white',
                  color: currentIndex === 0 ? '#cbd5e1' : '#1e293b',
                  boxShadow: currentIndex === 0 ? 'none' : '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { if(currentIndex !== 0) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = 'var(--hanwha-orange)'; } }}
                onMouseLeave={(e) => { if(currentIndex !== 0) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = '#1e293b'; } }}
              >
                <ChevronLeft size={32} />
              </button>
              
              <span style={{ fontWeight: 900, fontSize: '1.5rem', color: '#334155', minWidth: '6rem', textAlign: 'center', letterSpacing: '0.05em' }}>
                {currentIndex + 1} / {filteredVocab.length}
              </span>
              
              <button 
                onClick={handleNext} 
                disabled={currentIndex === filteredVocab.length - 1} 
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '4rem', height: '4rem', borderRadius: '50%',
                  border: 'none', cursor: currentIndex === filteredVocab.length - 1 ? 'not-allowed' : 'pointer',
                  backgroundColor: currentIndex === filteredVocab.length - 1 ? '#f1f5f9' : 'white',
                  color: currentIndex === filteredVocab.length - 1 ? '#cbd5e1' : '#1e293b',
                  boxShadow: currentIndex === filteredVocab.length - 1 ? 'none' : '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { if(currentIndex !== filteredVocab.length - 1) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = 'var(--hanwha-orange)'; } }}
                onMouseLeave={(e) => { if(currentIndex !== filteredVocab.length - 1) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = '#1e293b'; } }}
              >
                <ChevronRight size={32} />
              </button>
            </div>
            
            <div style={{ 
              fontWeight: 900, fontSize: '1.25rem', color: 'var(--hanwha-orange)', 
              backgroundColor: '#fff3eb', padding: '0.75rem 2rem', borderRadius: '999px'
            }}>
              Bài {currentCard.lessonId}
            </div>
          </div>

          {/* Term List Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.75rem', color: '#1e293b' }}>
              Thuật ngữ trong học phần này ({filteredVocab.length})
            </h2>
            
            <div>
              <select
                value={lessonFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                style={{
                  padding: '1rem 3rem 1rem 1.5rem', borderRadius: '999px', border: 'none',
                  backgroundColor: 'white', fontWeight: 800, fontSize: '1.125rem',
                  color: '#334155', cursor: 'pointer', outline: 'none',
                  boxShadow: '0 8px 20px -5px rgba(0,0,0,0.08)',
                  WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.2em'
                }}
              >
                <option value="all">Tất cả bài học</option>
                {uniqueLessons.map(id => (
                  <option key={id} value={id}>Bài {id}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            {filteredVocab.map((v, idx) => (
              <div key={idx} className="term-row">
                <div className="term-ko">{v.ko}</div>
                <div className="term-vi">{v.vi}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-slate-500 text-xl font-bold bg-white rounded-2xl border border-slate-200">
          Không tìm thấy từ vựng nào phù hợp!
        </div>
      )}
    </div>
  );
}
