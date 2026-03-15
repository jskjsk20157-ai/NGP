import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface HeaderProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

export default function Header({ onLoginClick, onSignUpClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled || location.pathname !== '/' ? 'bg-white shadow-md py-0' : 'bg-transparent py-1'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img 
              src="/logo2.png" 
              alt="NGP Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if logo2.png is not found
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = "w-14 h-14 bg-ngp-blue rounded-xl flex items-center justify-center shadow-lg";
                fallback.innerHTML = '<span class="text-white font-black text-3xl">N</span>';
                e.currentTarget.parentElement!.appendChild(fallback);
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link to="/about" className={`text-lg font-bold transition-colors ${location.pathname === '/about' ? 'text-ngp-teal' : 'text-slate-600 hover:text-ngp-teal'}`}>About</Link>
          <Link to="/news" className={`text-lg font-bold transition-colors ${location.pathname === '/news' ? 'text-ngp-teal' : 'text-slate-600 hover:text-ngp-teal'}`}>News</Link>
          <Link to="/calendar" className={`text-lg font-bold transition-colors ${location.pathname === '/calendar' ? 'text-ngp-teal' : 'text-slate-600 hover:text-ngp-teal'}`}>Calendar</Link>
          <Link to="/faq" className={`text-lg font-bold transition-colors ${location.pathname === '/faq' ? 'text-ngp-teal' : 'text-slate-600 hover:text-ngp-teal'}`}>FAQ</Link>
          <Link to="/contact" className={`text-lg font-bold transition-colors ${location.pathname === '/contact' ? 'text-ngp-teal' : 'text-slate-600 hover:text-ngp-teal'}`}>Contact</Link>
          
          <div className="flex items-center gap-4 ml-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-800">{profile?.name || user.email}님</span>
                  {isAdmin && (
                    <Link to="/admin" className="text-[10px] font-black text-ngp-teal uppercase tracking-widest hover:underline">
                      Admin Dashboard
                    </Link>
                  )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                  title="로그아웃"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={onLoginClick}
                  className="px-4 py-2 text-slate-700 font-bold hover:text-ngp-blue transition-colors text-base"
                >
                  Login
                </button>
                <button 
                  onClick={onSignUpClick}
                  className="px-6 py-2.5 bg-ngp-blue text-white rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-md shadow-ngp-blue/10 text-base"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6">
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">About</Link>
            <Link to="/news" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">News</Link>
            <Link to="/calendar" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">Calendar</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">FAQ</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-700">Contact</Link>
            
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              {user ? (
                <>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="font-bold text-slate-800">{profile?.name || user.email}님</span>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold text-ngp-teal uppercase">
                        Admin
                      </Link>
                    )}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-50 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLoginClick();
                    }}
                    className="w-full py-4 bg-slate-100 text-slate-700 rounded-xl font-bold"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      onSignUpClick();
                    }}
                    className="w-full py-4 bg-ngp-blue text-white rounded-xl font-bold"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
