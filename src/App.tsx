import { useState, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import News from './components/News';
import Calendar from './components/Calendar';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import FloatingButton from './components/FloatingButton';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider, useAuth } from './AuthContext';

// Protected Route Component
function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode, adminOnly?: boolean }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
}

// Layout wrapper to handle common components
function Layout({ children, onLoginClick, onSignUpClick }: { children: ReactNode, onLoginClick: () => void, onSignUpClick: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <FloatingButton />
    </div>
  );
}

// Home Page Component
function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Layout 
          onLoginClick={() => setIsLoginOpen(true)} 
          onSignUpClick={() => setIsSignUpOpen(true)}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onSignUpClick={() => setIsSignUpOpen(true)}
        />

        <SignUpModal 
          isOpen={isSignUpOpen} 
          onClose={() => setIsSignUpOpen(false)} 
          onLoginClick={() => setIsLoginOpen(true)}
        />
      </Router>
    </AuthProvider>
  );
}
