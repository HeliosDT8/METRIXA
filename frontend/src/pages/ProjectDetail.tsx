import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/mockData';
import { 
  LayoutDashboard, CalendarClock, ActivitySquare, ShoppingCart, 
  Wrench, AlertTriangle, FileText, Users, BarChart3, History,
  ChevronRight
} from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id) || projects[0];
  
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'l2-schedule', name: 'L2 Schedule', icon: CalendarClock },
    { id: 'activities', name: 'Activities', icon: ActivitySquare },
    { id: 'procurement', name: 'Procurement', icon: ShoppingCart },
    { id: 'engineering', name: 'Engineering', icon: Wrench },
    { id: 'delays', name: 'Delays', icon: AlertTriangle },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'team', name: 'Team', icon: Users },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'history', name: 'History', icon: History },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="flex text-sm font-medium text-gray-500 mb-2">
          <Link to="/projects" className="hover:text-[#114A87]">Projects</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">{project.id}</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#102E55]">{project.name}</h1>
            <p className="text-sm text-gray-500 mt-1">Project Control Center • Customer: {project.customer}</p>
          </div>
          <div className="flex gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5
              ${project.health === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
                project.health === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 
                'bg-red-100 text-red-800 border border-red-200'}`}
            >
              <div className={`w-2 h-2 rounded-full 
                ${project.health === 'success' ? 'bg-green-500' : 
                  project.health === 'warning' ? 'bg-yellow-500' : 
                  'bg-red-500'}`} 
              />
              {project.health === 'success' ? 'On Track' : project.health === 'warning' ? 'At Risk' : 'Critical'}
            </span>
            <div className="bg-blue-50 text-[#114A87] px-3 py-1 rounded-lg text-sm font-bold border border-blue-100">
              {project.progress}% Complete
            </div>
          </div>
        </div>
      </div>

      {/* 10-Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex overflow-x-auto custom-scrollbar border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-5 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-[#114A87] text-[#114A87] bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
              `}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#114A87]' : 'text-gray-400'}`} />
              {tab.name}
            </button>
          ))}
        </div>
        
        {/* Tab Content Area */}
        <div className="p-6 min-h-[500px]">
          {activeTab === 'overview' && (
            <div className="text-center py-20">
              <h3 className="text-lg font-medium text-gray-900">Project Overview loaded.</h3>
              <p className="text-gray-500 mt-2">Charts and metrics for {project.name} will appear here.</p>
            </div>
          )}
          {activeTab !== 'overview' && (
            <div className="text-center py-20">
              <h3 className="text-lg font-medium text-gray-900 capitalize">{activeTab.replace('-', ' ')} view</h3>
              <p className="text-gray-500 mt-2">This module is part of the prototype foundation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
