import { motion } from 'motion/react';
import { Target, Lightbulb, Users } from 'lucide-react';

const visions = [
  {
    icon: <Users className="w-8 h-8 text-ngp-blue" />,
    title: "연대감",
    description: "젊은 소아청소년과 의사들 간의 강력한 네트워크를 형성하여 서로 지지하고 협력하는 커뮤니티를 지향합니다."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-ngp-teal" />,
    title: "혁신",
    description: "전통적인 의료 방식을 넘어 최신 기술과 트렌드를 접목한 혁신적인 소아 청소년 진료 모델을 연구합니다."
  },
  {
    icon: <Target className="w-8 h-8 text-ngp-blue" />,
    title: "전문성",
    description: "학술 교류와 지속적인 교육을 통해 소아청소년과 의사로서의 역량을 강화하고 전문 지식을 공유합니다."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-ngp-blue mb-4 font-display">NGP의 비전</h2>
          <div className="w-20 h-1.5 bg-ngp-teal mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {visions.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-ngp-blue/5 transition-all"
            >
              <div className="mb-8 p-4 bg-slate-50 inline-block rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 font-display">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
