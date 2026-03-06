import React, { useState } from 'react';
import {
    Users,
    Store,
    UserPlus,
    TimerOff,
    Wallet,
    Filter,
    Plus,
    Mail,
    Phone,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    Search,
    Settings,
    ShieldCheck,
    CreditCard,
    Activity,
    Headset,
    Bell,
    LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    const users = [
        {
            id: 1,
            name: "Doğa Aktariye",
            owner: "Ahmet Yılmaz",
            regDate: "12 Eki 2023",
            email: "ahmet@dogaaktariye.com",
            phone: "+90 555 123 4567",
            trialStatus: "Completed",
            lastSession: "Bugün, 09:41",
            avgDailyTime: "45dk/gün",
            status: "Active",
            avatar: "DY"
        },
        {
            id: 2,
            name: "Şifa Baharat",
            owner: "Ayşe Demir",
            regDate: "01 Kas 2023",
            email: "info@sifabaharat.com",
            phone: "+90 532 987 6543",
            trialStatus: "5 Gün Kaldı",
            trialProgress: 66,
            lastSession: "Dün, 14:20",
            avgDailyTime: "15dk/gün",
            status: "Trial",
            avatar: "ŞB"
        },
        {
            id: 3,
            name: "Lokman Hekim",
            owner: "Mehmet Öztürk",
            regDate: "15 Ağu 2023",
            email: "iletisim@lokmanhekim.com",
            phone: "+90 544 321 0987",
            trialStatus: "Expired",
            lastSession: "12 Eki, 10:05",
            avgDailyTime: "0dk/gün",
            status: "Suspended",
            avatar: "LH"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex w-full h-full overflow-hidden">
            {/* Sidebar - Fix: Overflow-y-auto to allow scrolling if many menu items */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col h-full shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-cyan-700/20">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Aktar Yönetim</h1>
                        <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">Süper Admin</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
                    <a className="flex items-center gap-3 px-4 py-3 bg-cyan-700/10 text-cyan-700 rounded-xl font-medium" href="#">
                        <Users size={20} /> Kullanıcı Yönetimi
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                        <CreditCard size={20} /> Abonelikler
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                        <Activity size={20} /> Sistem Sağlığı
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                        <Headset size={20} /> Destek Talepleri
                        <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
                    </a>
                </nav>

                <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                    >
                        <LogOut size={20} /> Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
                <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-6 flex-1">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white hidden sm:block whitespace-nowrap">Süper Admin Paneli</h2>
                        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                        <div className="relative group max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-700 transition-colors" size={20} />
                            <input
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-cyan-700 focus:ring-4 focus:ring-cyan-700/20 rounded-xl text-sm transition-all outline-none"
                                placeholder="Kullanıcı veya dükkan adı ara..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-8">
                        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">Sistem Yöneticisi</p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tight">Kurucu</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-cyan-700 transition-all">
                                SY
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard icon={<Store size={28} />} label="Aktif Kullanıcılar" value="1,284" trend="12%" color="primary" />
                        <StatCard icon={<UserPlus size={28} />} label="Yeni Kayıtlar (Bu Ay)" value="45" trend="5%" color="blue" />
                        <StatCard icon={<TimerOff size={28} />} label="Deneme Süresi Dolanlar" value="18" subtitle="Mağaza" color="orange" />
                        <StatCard icon={<Wallet size={28} />} label="Platform Geliri" value="₺142K" trend="8%" color="cyan" />
                    </div>

                    {/* User Table Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Kullanıcı / Dükkan Yönetimi</h3>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <Filter size={18} /> Filtrele
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-700 text-white rounded-xl text-sm font-semibold hover:bg-cyan-800 transition-colors shadow-sm shadow-cyan-700/20">
                                    <Plus size={18} /> Yeni Kullanıcı
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                        <th className="p-4 pl-6">Kullanıcı/Dükkan Adı</th>
                                        <th className="p-4">Kayıt Tarihi</th>
                                        <th className="p-4 text-center">İletişim</th>
                                        <th className="p-4">Deneme Süresi</th>
                                        <th className="p-4">Oturum Bilgisi</th>
                                        <th className="p-4">Durum</th>
                                        <th className="p-4 pr-6 text-right">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {users.map(user => (
                                        <tr key={user.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group ${user.status === 'Suspended' ? 'opacity-75' : ''}`}>
                                            <td className="p-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-700 font-bold">
                                                        {user.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.owner}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{user.regDate}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2 text-slate-400">
                                                    <button className="hover:text-cyan-700 transition-colors p-1" title={user.email}><Mail size={18} /></button>
                                                    <button className="hover:text-cyan-700 transition-colors p-1" title={user.phone}><Phone size={18} /></button>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <TrialDisplay status={user.status} text={user.trialStatus} progress={user.trialProgress} />
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm text-slate-800 dark:text-slate-200">{user.lastSession}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Ort. {user.avgDailyTime}</p>
                                            </td>
                                            <td className="p-4 uppercase tracking-tighter">
                                                <StatusBadge status={user.status} />
                                            </td>
                                            <td className="p-4 pr-6 text-right">
                                                <button className="px-3 py-1.5 text-xs font-bold text-cyan-700 bg-cyan-700/10 hover:bg-cyan-700 hover:text-white rounded-lg transition-colors border border-cyan-700/20">
                                                    Detayları Gör
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                            <span>Toplam 1,284 dükkan içinden 1-3 arası gösteriliyor</span>
                            <div className="flex gap-1">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"><ChevronLeft size={16} /></button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-700 text-white font-medium">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">2</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300">3</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Helper Components
function StatCard({ icon, label, value, trend, subtitle, color }) {
    const colorMap = {
        primary: "bg-primary/10 text-primary hover:bg-primary/20",
        blue: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        orange: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
        cyan: "bg-cyan-700/10 text-cyan-700 hover:bg-cyan-700/20"
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5 relative overflow-hidden transition-all hover:shadow-md cursor-default group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${colorMap[color]}`}>
                {icon}
            </div>
            <div className="relative z-10">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
                    {trend && (
                        <span className={`text-xs font-bold flex items-center ${color === 'orange' ? 'text-slate-400' : 'text-primary'}`}>
                            <ChevronLeft size={10} className="rotate-90" /> {trend}
                        </span>
                    )}
                    {subtitle && <span className="text-xs font-bold text-slate-400">{subtitle}</span>}
                </div>
            </div>
        </div>
    );
}

function TrialDisplay({ status, text, progress }) {
    if (status === 'Active') {
        return (
            <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden w-24">
                    <div className="bg-slate-300 dark:bg-slate-600 w-full h-full rounded-full"></div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Tamamlandı</span>
            </div>
        );
    }

    if (status === 'Trial') {
        return (
            <div className="flex flex-col gap-1 w-32">
                <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-bold text-orange-500">{text}</span>
                </div>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden mb-1">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <button className="text-[10px] font-bold text-slate-500 hover:text-cyan-700 uppercase flex items-center gap-1 transition-colors">
                    <RotateCcw size={10} /> Süreyi Uzat
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden w-24">
                <div className="bg-red-500 w-full h-full rounded-full"></div>
            </div>
            <span className="text-[11px] font-bold text-red-500 whitespace-nowrap">Süresi Doldu</span>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Active: "bg-primary/10 text-primary border-primary/20",
        Trial: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
        Suspended: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
    };

    const colors = {
        Active: "bg-primary",
        Trial: "bg-orange-500",
        Suspended: "bg-slate-500"
    };

    const labels = {
        Active: "Aktif",
        Trial: "Deneme",
        Suspended: "Askıda"
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border ${styles[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`}></span> {labels[status]}
        </span>
    );
}
