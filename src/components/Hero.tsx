import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import HeroImage from './HeroImage';

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-ngp-teal/10 text-ngp-teal text-sm font-bold mb-8 tracking-wide">
              Next Generation Pediatricians
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-ngp-blue font-display tracking-tight">
              소아청소년과의 <br />
              <span className="text-ngp-teal">새로운 물결, NGP</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl leading-relaxed">
              젊은 소아청소년과 의사들이 함께 만드는 혁신의 네트워크. <br className="hidden md:block" />
              연대를 통해 더 나은 의료 환경과 미래를 구축합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/contact"
                className="px-10 py-5 bg-ngp-blue text-white rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-xl shadow-ngp-blue/20 active:scale-95 text-lg text-center"
              >
                지금 가입하기
              </Link>
              <Link 
                to="/about"
                className="px-10 py-5 border-2 border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95 text-lg text-center"
              >
                비전 더 알아보기
              </Link>
            </div>
          </motion.div>
          
          {/* Decorative element on the right to balance the layout */}
          <div className="hidden lg:block flex-1 relative">
            <div className="w-full aspect-square bg-gradient-to-br from-ngp-blue/5 to-ngp-teal/5 rounded-3xl border border-slate-100 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-inner flex items-center justify-center">
                <img 
                  src="/logo2.png" 
                  alt="NGP Logo Large" 
                  className="w-1/2 h-1/2 object-contain opacity-20"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-ngp-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-ngp-blue/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
