import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-ngp-blue p-12 text-white md:w-1/3">
            <h2 className="text-3xl font-bold mb-6 font-display">함께하기</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              NGP는 소아청소년과의 미래를 함께 고민할 젊은 의사들의 참여를 기다립니다.
            </p>
            <div className="space-y-4 text-sm text-blue-200">
              <p>• 가입 문의</p>
              <p>• 인터뷰 요청</p>
              <p>• 후원 및 협업</p>
            </div>
          </div>
          
          <div className="p-12 flex-1">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">이름</label>
                      <input 
                        required
                        type="text" 
                        placeholder="홍길동"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">소속 (병원명)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="NGP 병원"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">연락처</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">문의 유형</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all bg-white">
                      <option value="join">가입 문의</option>
                      <option value="interview">인터뷰 요청</option>
                      <option value="support">후원 및 협업</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">메시지 (선택)</label>
                    <textarea 
                      rows={4}
                      placeholder="문의 내용을 입력해주세요."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-ngp-teal focus:ring-2 focus:ring-ngp-teal/20 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full py-4 bg-ngp-teal text-white rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "전송 중..." : (
                      <>
                        <Send className="w-5 h-5" />
                        문의 제출하기
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">제출 완료!</h3>
                  <p className="text-slate-600 leading-relaxed">
                    NGP와 함께해주셔서 감사합니다. <br />
                    곧 연락드리겠습니다.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-ngp-teal font-semibold hover:underline"
                  >
                    새로운 문의 작성하기
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
