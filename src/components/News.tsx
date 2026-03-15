import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: '1',
    category: '공지사항',
    title: '2026년 NGP 정회원 모집 안내',
    date: '2026.03.10',
    isNew: true
  },
  {
    id: '2',
    category: '학회소식',
    title: '제15회 소아청소년과 미래전략 포럼 초록 접수',
    date: '2026.03.05',
    isNew: false
  },
  {
    id: '3',
    category: '보도자료',
    title: 'NGP, 디지털 헬스케어 스타트업과 업무협약 체결',
    date: '2026.02.28',
    isNew: false
  }
];

export default function News() {
  return (
    <section id="news" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ngp-blue mb-4 font-display">NGP 뉴스</h2>
            <p className="text-slate-500 font-medium">소아청소년과의 새로운 소식을 전해드립니다.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-ngp-teal font-bold hover:translate-x-1 transition-transform font-display">
            전체보기 <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid gap-6">
          {newsItems.map((item) => (
            <div 
              key={item.id}
              className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-ngp-teal/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg group-hover:bg-ngp-teal/10 group-hover:text-ngp-teal transition-colors">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-ngp-blue transition-colors">
                  {item.title}
                </h3>
                {item.isNew && (
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {item.date}
              </div>
            </div>
          ))}
        </div>
        
        <button className="md:hidden w-full mt-8 py-4 border border-slate-200 rounded-xl text-slate-600 font-bold">
          전체 뉴스 보기
        </button>
      </div>
    </section>
  );
}
