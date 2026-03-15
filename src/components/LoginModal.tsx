import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

export default function LoginModal({ isOpen, onClose, onSignUpClick }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: any) {
      console.error('Login error:', err);
      let message = '이메일 또는 비밀번호가 일치하지 않습니다.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = '이메일 또는 비밀번호가 일치하지 않습니다.';
      } else if (err.code === 'auth/too-many-requests') {
        message = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해 주세요.';
      } else {
        message = `로그인 중 오류가 발생했습니다: ${err.code || err.message}`;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-ngp-blue font-display">회원 로그인</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <p className="text-slate-500 mb-6 text-sm">
                회원 전용 공간 진입을 위한 이메일 기반 간편 로그인입니다.
              </p>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
                  {error}
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">이메일 주소</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@hospital.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">비밀번호</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-ngp-teal focus:ring-ngp-teal" />
                    <span className="text-slate-600">로그인 유지</span>
                  </label>
                  <a href="#" className="text-ngp-teal font-medium hover:underline">비밀번호 찾기</a>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-ngp-blue text-white rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      로그인 중...
                    </>
                  ) : '로그인'}
                </button>
              </form>
              
              <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-500 text-sm">
                  아직 회원이 아니신가요? <br />
                  <button 
                    onClick={() => {
                      onClose();
                      onSignUpClick();
                    }} 
                    className="text-ngp-teal font-bold hover:underline mt-1"
                  >
                    지금 바로 회원가입하기
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
