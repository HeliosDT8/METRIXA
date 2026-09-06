"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CalendarClock, 
  ActivitySquare, 
  ShoppingCart, 
  Wrench, 
  AlertTriangle, 
  FileText, 
  FileSpreadsheet, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'L2 Schedule', path: '/l2-schedule', icon: CalendarClock },
  { name: 'Activities', path: '/activities', icon: ActivitySquare },
  { name: 'Procurement', path: '/procurement', icon: ShoppingCart },
  { name: 'Engineering', path: '/engineering', icon: Wrench },
  { name: 'Delays', path: '/delays', icon: AlertTriangle },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'Excel Integration', path: '/excel-integration', icon: FileSpreadsheet },
  { name: 'KPIs', path: '/kpis', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-[#102E55] text-white flex flex-col h-full shrink-0 shadow-xl z-10">
      <div className="flex items-center h-16 px-6 bg-[#0E284A] border-b border-blue-900/50">
        <div className="flex items-center gap-2">
          {/* We will use an inline SVG for the logo later */}
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#18A990] to-[#0C8E9E] flex items-center justify-center font-bold text-lg shadow-md">
            M
          </div>
          <span className="font-bold text-xl tracking-wide flex items-center">
            <span className="text-[#4db8ff]">MATRIX</span>
            <span className="text-[#00c9a7]">A</span>
          </span>
        </div>
      </div>
      
      <div className="px-6 py-3 border-b border-blue-900/30">
        <div className="text-xs text-blue-300/70 font-semibold tracking-wider uppercase mb-1">
          Intelligent Workflow
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-blue-800/40 text-white shadow-sm border border-blue-700/30' 
                  : 'text-blue-100/70 hover:bg-blue-800/20 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-blue-900/50 bg-[#0E284A]/30">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-blue-100/70 hover:bg-blue-800/20 hover:text-white transition-colors">
          <Settings className="w-5 h-5 shrink-0" />
          Settings
        </button>
      </div>
    </aside>
  );
}
