"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Layers, BrainCircuit, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if auth_token cookie exists
    if (document.cookie.includes('auth_token=')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <nav style={{
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="w-full max-w-[1400px] mx-auto px-4 flex items-center justify-between" style={{ height: '64px' }}>
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <span className="font-black text-2xl" style={{ color: 'var(--hanwha-orange)', letterSpacing: '-0.02em' }}>
              HANWHA <span style={{ color: 'var(--slate-800)' }}>ACADEMY</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/courses" className={`nav-item ${pathname.startsWith('/courses') ? 'active' : ''}`}>
              <BookOpen size={18} /> Bài Giảng
            </Link>
            <Link href="/viral-marketing" className={`nav-item ${pathname.startsWith('/viral-marketing') ? 'active' : ''}`}>
              <Sparkles size={18} /> Viral Marketing
            </Link>
            <Link href="/vocabulary" className={`nav-item ${pathname.startsWith('/vocabulary') ? 'active' : ''}`}>
              <Layers size={18} /> Sổ Từ Vựng
            </Link>
            <Link href="/quiz" className={`nav-item ${pathname.startsWith('/quiz') ? 'active' : ''}`}>
              <BrainCircuit size={18} /> Trắc Nghiệm
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 whitespace-nowrap">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700">Xin chào, <span className="text-orange">Admin</span></span>
              <button onClick={handleLogout} className="btn flex items-center gap-2" style={{ padding: '0.4rem 1rem', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '999px', fontSize: '0.9rem' }}>
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '999px' }}>Đăng nhập</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
