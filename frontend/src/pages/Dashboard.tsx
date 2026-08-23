import { projects, activities } from '../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

export default function Dashboard() {
  const activeProjectsCount = projects.length;
  const inProgressCount = activities.filter(a => a.status === 'In Progress').length;
  const overdueCount = activities.filter(a => a.status === 'Overdue').length;
  
  // Calculate mock schedule adherence (Completed on time / Total completed)
  const completed = activities.filter(a => a.status === 'Completed');
  const onTime = completed.filter(a => a.delayDays <= 0).length;
  const adherence = completed.length > 0 ? Math.round((onTime / completed.length) * 100) : 100;

  // Mock data for Project Health Chart
  const healthData = [
    { name: 'On Track', value: projects.filter(p => p.health === 'success').length, color: '#18A990' },
    { name: 'At Risk', value: projects.filter(p => p.health === 'warning').length, color: '#f59e0b' },
    { name: 'Delayed', value: projects.filter(p => p.health === 'critical').length, color: '#ef4444' },
  ];

  // Mock data for Bottlenecks Chart
  const bottleneckData = [
    { name: 'PI Approval', delayed: 4 },
    { name: 'Tech Eval', delayed: 12 },
    { name: 'PO Issue', delayed: 8 },
    { name: 'Detailed Eng', delayed: 15 },
    { name: 'MFC', delayed: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55]">Executive Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Project & Workflow Intelligence Overview</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Export Report
          </button>
          <button className="bg-[#18A990] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#15967f] transition-colors shadow-sm">
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Projects', value: activeProjectsCount, color: 'border-blue-500' },
          { label: 'Activities In Progress', value: inProgressCount, color: 'border-[#18A990]' },
          { label: 'Critical Delays', value: overdueCount, color: 'border-red-500' },
          { label: 'Schedule Adherence', value: `${adherence}%`, color: 'border-[#18A990]' }
        ].map(metric => (
          <div key={metric.label} className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${metric.color}`}>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{metric.label}</h3>
            <div className="text-3xl font-bold text-[#102E55] mt-2">{metric.value}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#102E55] mb-4">Overall Project Health</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {healthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#102E55] mb-4">Workflow Bottlenecks (Delayed Activities)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bottleneckData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="delayed" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#102E55]">Recent Critical Activities</h3>
          <button className="text-sm text-[#114A87] font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                    <div className="text-xs text-gray-500">{activity.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{projects.find(p => p.id === activity.projectId)?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${activity.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        activity.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.delayDays > 0 ? (
                      <span className="text-red-600 font-bold">{activity.delayDays} days</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
