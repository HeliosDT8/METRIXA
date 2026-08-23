import { useState } from 'react';
import { activities, projects } from '../data/mockData';
import { Search, Download, SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function L2Schedule() {
  const [projectId, setProjectId] = useState('ALL');
  const [status, setStatus] = useState('ALL');

  // Filter activities
  let filteredActivities = activities;
  if (projectId !== 'ALL') {
    filteredActivities = filteredActivities.filter(a => a.projectId === projectId);
  }
  if (status !== 'ALL') {
    filteredActivities = filteredActivities.filter(a => a.status === status);
  }

  // Very simple Gantt rendering logic for prototype
  const startDate = new Date('2026-07-01');
  const endDate = new Date('2026-09-30');
  const totalDays = differenceInDays(endDate, startDate);

  const getPositionStyle = (start: string, finish: string) => {
    if (!start || !finish) return { left: '0%', width: '0%' };
    const dStart = new Date(start);
    const dFinish = new Date(finish);
    const leftOffset = Math.max(0, differenceInDays(dStart, startDate));
    const widthDays = differenceInDays(dFinish, dStart);
    
    return {
      left: `${(leftOffset / totalDays) * 100}%`,
      width: `${Math.max(1, (widthDays / totalDays) * 100)}%`
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55]">L2 Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">Master engineering and procurement schedule</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Export Schedule
          </button>
          <button className="bg-[#18A990] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#15967f] transition-colors shadow-sm flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Gantt View
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#114A87] sm:text-sm sm:leading-6"
            placeholder="Search activities..."
          />
        </div>
        
        <select 
          className="block w-48 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#114A87] sm:text-sm sm:leading-6"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="ALL">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.id} - {p.name}</option>)}
        </select>
        
        <select 
          className="block w-48 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#114A87] sm:text-sm sm:leading-6"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Activity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell w-1/2">
                  <div className="flex justify-between items-center w-full">
                    <span>Timeline (Q3 2026)</span>
                    <div className="flex gap-12 text-[10px] text-gray-400">
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => {
                const isOverdue = activity.status === 'Overdue';
                const isCompleted = activity.status === 'Completed';
                
                return (
                  <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                        <span className="font-semibold text-[#114A87]">{activity.id}</span>
                        <span>•</span>
                        <span>{projects.find(p => p.id === activity.projectId)?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${isCompleted ? 'bg-green-100 text-green-800' : 
                          isOverdue ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#102E55]">{activity.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell align-middle relative">
                      <div className="w-full h-8 bg-gray-100/50 rounded relative overflow-hidden border border-gray-200 border-dashed">
                        {/* Planned Bar */}
                        <div 
                          className="absolute h-3 top-1 bg-gray-300 rounded-sm opacity-60"
                          style={getPositionStyle(activity.plannedStart, activity.plannedFinish)}
                          title={`Planned: ${activity.plannedStart} to ${activity.plannedFinish}`}
                        />
                        
                        {/* Actual Bar */}
                        {(activity.actualStart || isCompleted || activity.progress > 0) && (
                          <div 
                            className={`absolute h-3 bottom-1 rounded-sm shadow-sm ${
                              isCompleted ? 'bg-[#18A990]' : 
                              isOverdue ? 'bg-red-500' : 
                              'bg-[#114A87]'
                            }`}
                            style={getPositionStyle(
                              activity.actualStart || activity.plannedStart, 
                              activity.actualFinish || format(new Date('2026-08-16'), 'yyyy-MM-dd')
                            )}
                            title={`Actual: ${activity.actualStart || '-'} to ${activity.actualFinish || 'In Progress'}`}
                          />
                        )}
                      </div>
                      {activity.delayDays > 0 && (
                        <div className="absolute right-6 top-5 text-xs font-bold text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          +{activity.delayDays}d
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
