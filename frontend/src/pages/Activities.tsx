import { useState } from 'react';
import { activities, projects } from '../data/mockData';
import { Search, Filter, ActivitySquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Activities() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = activities.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55] flex items-center gap-2">
            <ActivitySquare className="w-6 h-6 text-[#18A990]" />
            All Activities
          </h1>
          <p className="text-sm text-gray-500 mt-1">Cross-project task management and tracking</p>
        </div>
        <button className="bg-[#18A990] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#15967f] transition-colors shadow-sm">
          New Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Activities', value: activities.length, icon: ActivitySquare, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Completed', value: activities.filter(a => a.status === 'Completed').length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'In Progress', value: activities.filter(a => a.status === 'In Progress').length, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Overdue', value: activities.filter(a => a.status === 'Overdue').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-[#114A87] sm:text-sm"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(activity => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{activity.name}</div>
                  <div className="text-xs text-[#114A87] font-medium">{activity.id}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {projects.find(p => p.id === activity.projectId)?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{activity.type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{activity.assignedTo}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      activity.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
