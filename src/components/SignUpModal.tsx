import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Building, Loader2 } from 'lucide-react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function SignUpModal({ isOpen, onClose, onLoginClick }: SignUpModalProps) {
  const [name, setName] = useState('');
  const [hospital, setHospital] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      const isAdminEmail = email.toLowerCase() === 'jskjsk20157@gmail.com';
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name,
        hospital,
        role: isAdminEmail ? 'admin' : 'user',
        createdAt: serverTimestamp(),
      });

      onClose();
    } catch (err: any) {
      console.error('Registration error:', err);
      let message = '회원가입 중 오류가 발생했습니다.';
      if (err.code === 'auth/email-already-in-use') {
        message = '이미 사용 중인 이메일입니다. 로그인해 주세요.';
      } else if (err.code === 'auth/weak-password') {
        message = '비밀번호가 너무 취약합니다. 6자 이상 입력해 주세요.';
      } else if (err.code === 'auth/invalid-email') {
        message = '유효하지 않은 이메일 형식입니다.';
      } else if (err.code === 'auth/operation-not-allowed') {
        message = '이메일/비밀번호 가입이 활성화되지 않았습니다. 관리자에게 문의하세요.';
      } else if (err.message?.includes('permission-denied')) {
        message = '데이터 저장 권한이 없습니다. 관리자에게 문의하세요.';
      } else {
        message = `회원가입 중 오류가 발생했습니다: ${err.code || err.message}`;
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-ngp-blue font-display">회원가입</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <p className="text-slate-500 mb-4 text-sm">
                NGP 네트워크의 일원이 되어 소아청소년과의 미래를 함께 만들어가세요.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                  {error}
                </div>
              )}
              
              <form className="space-y-3" onSubmit={handleSignUp}>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">성함</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">소속 병원/기관</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      placeholder="NGP 어린이병원"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">이메일 주소</label>
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
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">비밀번호</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="8자 이상 입력"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-ngp-blue text-white rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-ngp-blue/20 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        가입 처리 중...
                      </>
                    ) : '가입 신청하기'}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center space-y-4">
                <p className="text-slate-500 text-sm">
                  이미 계정이 있으신가요? <br />
                  <button 
                    onClick={() => {
                      onClose();
                      onLoginClick();
                    }} 
                    className="text-ngp-teal font-bold hover:underline mt-1"
                  >
                    로그인하기
                  </button>
                </p>
                <p className="text-slate-500 text-xs">
                  가입 시 NGP의 <a href="#" className="text-ngp-teal underline">이용약관</a> 및 <a href="#" className="text-ngp-teal underline">개인정보처리방침</a>에 동의하게 됩니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
