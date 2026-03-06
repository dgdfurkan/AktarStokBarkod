import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Lock, Mail, Check, Leaf as Eco } from 'lucide-react';

// Asset Importları
import logoImg from '../assets/logo.png';
import loginVideoSource from '../assets/videos/login-bg.mp4';

export default function Login() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [remember, setRemember] = useState(false);
    const [isBlurring, setIsBlurring] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const video = videoRef.current;
            const timeLeft = video.duration - video.currentTime;

            if (timeLeft < 1 && !isBlurring) {
                setIsBlurring(true);
            }

            if (video.currentTime < 0.5 && isBlurring) {
                setIsBlurring(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            // Başarılı girişte App.jsx içindeki onAuthStateChanged tetiklenecek 
            // ve kullanıcıyı isAdmin durumuna göre yönlendirecek.
        } catch (err) {
            console.error("Login error:", err);
            setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light font-display text-slate-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex h-[800px] max-h-[90vh]">
                {/* Sol Taraf - Görsel Alan (Video Loop) */}
                <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onTimeUpdate={handleTimeUpdate}
                        className="absolute inset-0 w-full h-full object-cover scale-105"
                    >
                        <source src={loginVideoSource} type="video/mp4" />
                    </video>

                    {/* Akıllı Blur Overlay */}
                    <div
                        className={`absolute inset-0 backdrop-blur-3xl bg-black/10 transition-opacity duration-1000 pointer-events-none z-10 ${isBlurring ? 'opacity-100' : 'opacity-0'
                            }`}
                    />

                    <div className="absolute inset-0 bg-black/20 z-0"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white z-20">
                        <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Doğanın Şifası, Modern Yönetim</h2>
                        <p className="text-lg drop-shadow-md opacity-90">
                            Aktar dükkanınızı tek bir noktadan kolayca ve verimli bir şekilde yönetin.
                        </p>
                    </div>
                </div>

                {/* Sağ Taraf - Form Alanı */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-md w-full mx-auto">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/10 overflow-hidden bg-white/50 backdrop-blur-sm border border-white/20 p-1.5">
                                <img src={logoImg} alt="Aktar Pro Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Aktar Pro</h1>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Yönetim Paneline Giriş Yap</h2>
                            <p className="text-slate-500">Hoş geldiniz! Devam etmek için bilgilerinizi giriniz.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl animate-shake">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                                    E-posta Adresi
                                </label>
                                <div className="relative group">
                                    <Mail
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                                        size={20}
                                    />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="eposta@adresiniz.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl text-sm transition-all outline-none"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                                    Şifre
                                </label>
                                <div className="relative group">
                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                                        size={20}
                                    />
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl text-sm transition-all outline-none"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center">
                                    <div className="relative flex items-center">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:bg-primary checked:border-primary transition-all"
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                            disabled={loading}
                                        />
                                        <span className="absolute text-white hidden peer-checked:block ml-1">
                                            <Check size={14} strokeWidth={4} />
                                        </span>
                                    </div>
                                    <label className="ml-2 text-sm font-medium text-slate-600 cursor-pointer" htmlFor="remember">
                                        Beni Hatırla
                                    </label>
                                </div>
                                <a className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors" href="#">
                                    Şifremi Unuttum
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-4 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-primary/50 outline-none active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Giriş Yapılıyor...
                                    </div>
                                ) : (
                                    "Giriş Yap"
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-600 mb-4">
                                Hesabınız yok mu?{' '}
                                <a className="font-bold text-primary hover:underline" href="#">
                                    Bir hesap oluşturun
                                </a>
                            </p>

                            {/* Otomatik Versiyon Bilgisi */}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-50">
                                Aktar Pro v{__APP_VERSION__}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
