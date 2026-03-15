import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "NGP 가입 자격은 어떻게 되나요?",
    answer: "소아청소년과 의사 자격을 취득한 젊은 의사라면 누구나 가입 문의가 가능합니다. 전공의(레지던트) 분들도 준회원으로 참여하실 수 있습니다."
  },
  {
    question: "정기 모임은 얼마나 자주 있나요?",
    answer: "분기별 1회의 정기 세미나와 월 1회의 소규모 지역별 네트워킹 모임이 진행됩니다. 자세한 일정은 캘린더 섹션에서 확인하실 수 있습니다."
  },
  {
    question: "회원 전용 공간에서는 어떤 활동을 하나요?",
    answer: "최신 논문 리뷰, 진료 케이스 스터디, 개원 및 경영 정보 공유, 그리고 회원들 간의 익명 커뮤니티 활동이 이루어집니다."
  },
  {
    question: "후원이나 협업 제안은 어디로 하나요?",
    answer: "Contact Form의 문의 유형에서 '후원 및 협업'을 선택하여 내용을 남겨주시면 담당자가 확인 후 연락드리겠습니다."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-ngp-blue mb-4 font-display">자주 묻는 질문</h2>
          <p className="text-slate-500">NGP에 대해 궁금하신 점을 확인하세요.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-ngp-teal" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
