import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Users, Newspaper, Calendar, Settings, LogOut, ChevronRight, Search, Plus, Trash2, Edit2 } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

export default function AdminDashboard() {
  const { logout, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'users', label: '회원 관리', icon: Users, path: '/admin/users' },
    { id: 'news', label: '뉴스/공지 관리', icon: Newspaper, path: '/admin/news' },
    { id: 'calendar', label: '일정 관리', icon: Calendar, path: '/admin/calendar' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-bottom border-slate-100">
          <h1 className="text-xl font-bold text-ngp-blue font-display">NGP Admin</h1>
          <p className="text-xs text-slate-400 mt-1">{profile?.name} 관리자님</p>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                ? 'bg-ngp-blue text-white shadow-lg shadow-ngp-blue/20' 
                : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/news" element={<NewsManagement />} />
          <Route path="/calendar" element={<CalendarManagement />} />
        </Routes>
      </main>
    </div>
  );
}

function AdminHome() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">대시보드 홈</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">전체 회원 수</p>
          <p className="text-4xl font-bold text-ngp-blue mt-2">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">등록된 뉴스</p>
          <p className="text-4xl font-bold text-ngp-teal mt-2">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium">이번 달 일정</p>
          <p className="text-4xl font-bold text-orange-500 mt-2">--</p>
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await updateDoc(doc(db, 'users', userId), { role: newRole });
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">회원 관리</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">이름</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">이메일</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">소속</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">권한</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-slate-600">{user.hospital}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleRole(user.id, user.role)}
                    className="text-ngp-blue hover:underline text-sm font-bold"
                  >
                    권한 변경
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewsManagement() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지사항');
  const [content, setContent] = useState('');
  const { profile } = useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchNews();
  }, []);

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = {
      title,
      category,
      content,
      excerpt: content.substring(0, 100) + '...',
      date: new Date().toISOString().split('T')[0],
      authorUid: profile?.uid,
      createdAt: new Date().toISOString()
    };
    const docRef = await getDocs(collection(db, 'news')); // Simple way to get collection ref
    // Actually I should use addDoc
    const { addDoc } = await import('firebase/firestore');
    const res = await addDoc(collection(db, 'news'), newDoc);
    setNews([{ id: res.id, ...newDoc }, ...news]);
    setIsAdding(false);
    setTitle('');
    setContent('');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, 'news', id));
      setNews(news.filter(n => n.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">뉴스/공지 관리</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-ngp-teal text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
        >
          <Plus className="w-5 h-5" />
          {isAdding ? '취소' : '뉴스 등록'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddNews} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">제목</label>
              <input 
                type="text" required value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-ngp-teal"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">카테고리</label>
              <select 
                value={category} onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-ngp-teal"
              >
                <option>공지사항</option>
                <option>학술정보</option>
                <option>네트워크 뉴스</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">내용</label>
            <textarea 
              required value={content} onChange={e => setContent(e.target.value)} rows={5}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-ngp-teal"
            />
          </div>
          <button type="submit" className="px-6 py-2 bg-ngp-blue text-white rounded-xl font-bold">등록하기</button>
        </form>
      )}

      <div className="grid gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-ngp-teal uppercase tracking-wider">{item.category}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-1">{item.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.date}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarManagement() {
  const [events, setEvents] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('학술대회');

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const { addDoc } = await import('firebase/firestore');
    const newEvent = { title, date, time, type, createdAt: new Date().toISOString() };
    const res = await addDoc(collection(db, 'events'), newEvent);
    setEvents([...events, { id: res.id, ...newEvent }].sort((a, b) => a.date.localeCompare(b.date)));
    setIsAdding(false);
    setTitle(''); setDate(''); setTime('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">일정 관리</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
        >
          <Plus className="w-5 h-5" />
          {isAdding ? '취소' : '일정 등록'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddEvent} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">일정명</label>
              <input 
                type="text" required value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-ngp-teal"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">유형</label>
              <select 
                value={type} onChange={e => setType(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-ngp-teal"
              >
                <option>학술대회</option>
                <option>정기총회</option>
                <option>네트워크 미팅</option>
                <option>기타</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">날짜</label>
              <input 
                type="date" required value={date} onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-ngp-teal"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">시간</label>
              <input 
                type="text" required value={time} onChange={e => setTime(e.target.value)} placeholder="14:00 - 16:00"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-ngp-teal"
              />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-ngp-blue text-white rounded-xl font-bold">등록하기</button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">날짜</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">유형</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">일정명</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">시간</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 text-slate-800 font-medium">{event.date}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-xs font-bold">{event.type}</span>
                </td>
                <td className="px-6 py-4 text-slate-800">{event.title}</td>
                <td className="px-6 py-4 text-slate-500">{event.time}</td>
                <td className="px-6 py-4">
                  <button onClick={async () => {
                    await deleteDoc(doc(db, 'events', event.id));
                    setEvents(events.filter(e => e.id !== event.id));
                  }} className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
