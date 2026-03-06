import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    BarChart3,
    Cpu,
    Settings,
    Search,
    Bell,
    Leaf as Eco
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/satis', icon: ShoppingBag, label: 'Hızlı Satış' },
    { path: '/stok', icon: Package, label: 'Stok' },
    { path: '/musteriler', icon: Users, label: 'Müşteriler' },
    { path: '/raporlar', icon: BarChart3, label: 'Raporlar' },
    { path: '/ai', icon: Cpu, label: 'ESM Ensar AI', badge: 'Beta' },
];

import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LogOut } from 'lucide-react';

export default function Layout() {
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // App.jsx içindeki onAuthStateChanged otomatik olarak /login'e yönlendirecek
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center shadow-lg shadow-primary/5 p-1.5 border border-slate-100 dark:border-slate-800">
                        <img src="logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Aktar Pro</h1>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "nav-link",
                                    isActive && "nav-link-active"
                                )}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <Link to="/ayarlar" className="nav-link">
                        <Settings size={20} />
                        <span>Ayarlar</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="nav-link w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                        <LogOut size={20} />
                        <span>Çıkış Yap</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-xl text-sm transition-all outline-none text-slate-800 dark:text-slate-200"
                                placeholder="Ürün, stok veya müşteri ara..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-8">
                        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">Mehmet Aktar</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Dükkan Sahibi</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary transition-all overflow-hidden font-bold text-slate-600 dark:text-slate-300">
                                MA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content - Bağımsız Scroll Alanı */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
