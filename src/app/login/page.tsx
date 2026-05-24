"use client";

import { useState } from 'react';
import { ShieldAlert, LogIn, Lock } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        window.location.href = '/courses'; // Force hard reload to update Navbar state
      } else {
        const data = await res.json();
        setError(data.error || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-20 flex justify-center items-center">
      <div className="card" style={{ maxWidth: '400px', width: '100%', borderTop: '6px solid var(--hanwha-orange)', padding: '2.5rem' }}>
        <div className="flex justify-center mb-6 text-orange">
          <ShieldAlert size={48} />
        </div>
        <h1 className="text-2xl font-black text-center mb-2 text-slate-800">Đăng Nhập Quản Trị</h1>
        <p className="text-center text-slate-500 mb-8 font-medium">Truy cập vào hệ thống bài giảng và trắc nghiệm nội bộ.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl font-bold flex items-center gap-2">
            <Lock size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-2">Tên đăng nhập</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-orange focus:outline-none transition-colors font-bold text-slate-800"
              placeholder="Nhập tên tài khoản..."
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-slate-700 mb-2">Mật khẩu</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-orange focus:outline-none transition-colors font-bold text-slate-800"
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            style={{ padding: '1.25rem', fontSize: '1.1rem' }}
          >
            {loading ? 'Đang xác thực...' : <><LogIn size={20} /> Đăng nhập</>}
          </button>
        </form>
      </div>
    </div>
  );
}
