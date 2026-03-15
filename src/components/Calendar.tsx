import { Calendar as CalendarIcon, MapPin } from 'lucide-react';

const events = [
  {
    id: '1',
    date: '2026.04.15',
    title: 'NGP 춘계 정기 세미나',
    location: '서울 코엑스 컨퍼런스룸',
    type: 'seminar'
  },
  {
    id: '2',
    date: '2026.05.20',
    title: '소아청소년과 미래 전략 포럼',
    location: '온라인 (Zoom)',
    type: 'conference'
  },
  {
    id: '3',
    date: '2026.06.10',
    title: '수도권 젊은 의사 네트워킹 데이',
    location: '강남 모임공간',
    type: 'meeting'
  },
  {
    id: '4',
    date: '2026.07.05',
    title: '디지털 헬스케어와 소아과 워크숍',
    location: '판교 테크노밸리',
    type: 'seminar'
  }
];

export default function Calendar() {
  return (
    <section id="calendar" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ngp-blue mb-4">주요 일정</h2>
            <p className="text-slate-500">NGP의 학회 일정과 정기 모임을 확인하세요.</p>
          </div>
          <button className="text-ngp-teal font-semibold hover:underline">전체 일정 보기</button>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className="group flex flex-col md:flex-row items-start md:items-center p-6 rounded-2xl border border-slate-100 hover:border-ngp-teal/30 hover:bg-ngp-teal/5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0 md:w-48">
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-white transition-colors">
                  <CalendarIcon className="w-5 h-5 text-slate-500 group-hover:text-ngp-teal" />
                </div>
                <span className="font-bold text-slate-700">{event.date}</span>
              </div>
              
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-ngp-blue transition-colors">
                  {event.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-8">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.type === 'seminar' ? 'bg-blue-100 text-blue-600' :
                  event.type === 'conference' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {event.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
