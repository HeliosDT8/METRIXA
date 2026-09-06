"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { projects } from '../../../data/mockData';
import { Search, Filter, Plus, ChevronRight } from 'lucide-react';

export default function Projects() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55]">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all engineering projects</p>
        </div>
        <button className="bg-[#18A990] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#15967f] transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#114A87] sm:text-sm sm:leading-6"
            placeholder="Search by project name, code, or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter Projects
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <div className={`h-2 w-full rounded-t-xl ${
              project.health === 'success' ? 'bg-[#18A990]' : 
              project.health === 'warning' ? 'bg-yellow-400' : 
              'bg-red-500'
            }`} />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs font-bold text-[#114A87] mb-1">{project.id}</div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#114A87] transition-colors">{project.name}</h3>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-medium text-gray-900">{project.customer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Project Manager</span>
                  <span className="font-medium text-gray-900">{project.manager}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Target Date</span>
                  <span className="font-medium text-gray-900">{project.targetDate}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Overall Progress</span>
                  <span className="font-bold text-[#102E55]">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      project.health === 'success' ? 'bg-[#18A990]' : 
                      project.health === 'warning' ? 'bg-yellow-400' : 
                      'bg-red-500'
                    }`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center rounded-b-xl group-hover:bg-blue-50 transition-colors">
              <span className="text-sm font-medium text-[#114A87]">Open Control Center</span>
              <ChevronRight className="w-4 h-4 text-[#114A87]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
