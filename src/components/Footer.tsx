"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Layers, BrainCircuit, Mail, Phone, MapPin, Heart, User } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0f172a', /* slate-900 */
      color: '#cbd5e1', /* slate-300 */
      padding: '4rem 0 2rem 0',
      marginTop: 'auto',
      borderTop: '4px solid var(--hanwha-orange)'
    }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Logo & About */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-black text-3xl" style={{ color: 'var(--hanwha-orange)', letterSpacing: '-0.02em' }}>
                HANWHA <span style={{ color: 'white' }}>ACADEMY</span>
              </span>
            </Link>
            <p style={{ lineHeight: 1.6, marginBottom: '1.5rem', color: '#94a3b8' }}>
              Nền tảng học tập thông minh và hiện đại dành cho chuyên viên tư vấn tài chính. Giúp bạn chinh phục kỳ thi chứng chỉ dễ dàng hơn bao giờ hết.
            </p>
            <div className="flex items-center gap-4">
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hanwha-orange)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>FB</span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hanwha-orange)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>YT</span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hanwha-orange)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>IN</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Khám Phá</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <Link href="/courses" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hanwha-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <BookOpen size={16} /> Danh sách bài giảng
                </Link>
              </li>
              <li>
                <Link href="/vocabulary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hanwha-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <Layers size={16} /> Sổ tay từ vựng
                </Link>
              </li>
              <li>
                <Link href="/quiz" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hanwha-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <BrainCircuit size={16} /> Thi trắc nghiệm
                </Link>
              </li>
              <li>
                <Link href="/viral-marketing" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hanwha-orange)'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <Sparkles size={16} /> Viral Marketing AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Liên Hệ</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <User size={20} color="var(--hanwha-orange)" style={{ flexShrink: 0 }} />
                <span className="font-bold">김민석</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            &copy; 2026 Kim Min Seok . All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Made with <Heart size={14} color="#ef4444" fill="#ef4444" /> by 김민석
          </p>
        </div>
      </div>
    </footer>
  );
}
