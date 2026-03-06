import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

// Gelişmiş Korunmuş Rota Bileşeni
const PrivateRoute = ({ children, requiredRole = 'user' }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          // Firestore'dan rol bilgisini al
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().isAdmin ? 'admin' : 'user');
          } else {
            console.warn("User doc not found, defaulting to user role");
            setRole('user');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole('user');
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#11d4a4] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Rol kontrolü: Admin değilse ama admin sayfası istiyorsa ana sayfaya at
  if (requiredRole === 'admin' && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Eğer admin ise ve normal kullanıcı sayfasına girmeye çalışıyorsa admin panele yönlendir (Kullanıcı Talebi)
  if (role === 'admin' && requiredRole === 'user') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Admin Rotası */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminPanel />
          </PrivateRoute>
        }
      />

      {/* Standart Kullanıcı Rotaları */}
      <Route
        path="/"
        element={
          <PrivateRoute requiredRole="user">
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="stok" element={<div className="p-8">Stok Yönetimi (v1.3.0 ile gelecek)</div>} />
        <Route path="satis" element={<div className="p-8">Hızlı Satış (Yakında)</div>} />
        <Route path="musteriler" element={<div className="p-8">Müşteriler (Yakında)</div>} />
      </Route>

      {/* 404 / Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
