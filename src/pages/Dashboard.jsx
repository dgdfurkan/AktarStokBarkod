import {
    LayoutDashboard,
    Banknote,
    Users,
    AlertTriangle,
    Package,
    History,
    TrendingUp,
    Brain
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <LayoutDashboard size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-all">Aktar Pro'ya Hoş Geldiniz</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
                Dükkanınızın dijital yönetim merkezindesiniz. Başlamak için yan menüden bir modül seçebilir veya
                hızlı arama ile ürünlerinize ulaşabilirsiniz.
            </p>
            <div className="flex gap-4 mt-8">
                <button className="btn-primary px-8">Hızlı Satış Başlat</button>
                <button className="px-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    Stokları İncele
                </button>
            </div>
        </div>
    );
}
