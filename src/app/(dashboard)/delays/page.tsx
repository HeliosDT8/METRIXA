"use client";

import { useState } from 'react';
import { activities, projects } from '../../../data/mockData';
import { AlertTriangle, ArrowRight, TrendingUp, Search, Filter } from 'lucide-react';

export default function Delays() {
  const [searchTerm, setSearchTerm] = useState('');

  const delayedActivities = activities
    .filter(a => a.delayDays > 0)
    .filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.toLowerCase().includes(searchTerm.toLowerCase()));

  const criticalDelays = delayedActivities.filter(a => a.delayDays > 10).length;
  const averageDelay = delayedActivities.length > 0 
    ? Math.round(delayedActivities.reduce((acc, curr) => acc + curr.delayDays, 0) / delayedActivities.length) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55]">Delay Analysis</h1>
          <p className="text-sm text-gray-500 mt-1">Identify bottlenecks and cascading schedule impacts</p>
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          Export Delay Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 border-l-4 border-l-red-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Critical Delays (&gt;10 Days)</h3>
              <div className="text-3xl font-bold text-red-600 mt-2">{criticalDelays}</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Average Delay</h3>
              <div className="text-3xl font-bold text-gray-900 mt-2">{averageDelay} Days</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#114A87]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Delayed Activities</h3>
              <div className="text-3xl font-bold text-gray-900 mt-2">{delayedActivities.length}</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-[#114A87]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#114A87] sm:text-sm sm:leading-6"
            placeholder="Search delayed activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter Root Cause
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity & Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Root Cause</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay Impact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downstream Activities</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {delayedActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{activity.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {activity.id} • {projects.find(p => p.id === activity.projectId)?.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium border border-gray-200">
                    Vendor Submission Pending
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    +{activity.delayDays} Days
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-yellow-600 font-medium flex items-center gap-1.5">
                    <ArrowRight className="w-4 h-4" />
                    2 Activities At Risk
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#114A87] font-medium text-sm hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
