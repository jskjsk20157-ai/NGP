import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20
      }}
      className="fixed bottom-8 right-8 z-40"
    >
      <a 
        href="https://pf.kakao.com/_xxxx" // Placeholder KakaoTalk Channel
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#FEE500] text-[#3C1E1E] rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-90"
        title="카카오톡 채널 상담"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </motion.div>
  );
}
