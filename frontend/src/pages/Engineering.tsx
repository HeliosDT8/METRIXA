import { Wrench, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { projects } from '../data/mockData';

export default function Engineering() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55] flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#18A990]" />
            Engineering Tracking
          </h1>
          <p className="text-sm text-gray-500 mt-1">Monitor design deliverables, drawing approvals, and Manufacturing Clearances (MFC)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-2">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Critical Drawing Submissions</h3>
            <button className="text-sm text-[#114A87] font-medium">View Schedule</button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document / Drawing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rev</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">P&ID for Main Steam System</div>
                  <div className="text-xs text-gray-500">DRG-MECH-001</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{projects[0].name}</td>
                <td className="px-6 py-4 text-sm font-medium">R2</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-sm text-yellow-600 font-medium">
                    <Clock className="w-4 h-4" /> Under Customer Review
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">Turbine Foundation Layout</div>
                  <div className="text-xs text-gray-500">DRG-CIVIL-045</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{projects[2].name}</td>
                <td className="px-6 py-4 text-sm font-medium">R0</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-sm text-red-600 font-medium">
                    <AlertTriangle className="w-4 h-4" /> Delayed - Internal Prep
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">Electrical Single Line Diagram</div>
                  <div className="text-xs text-gray-500">DRG-ELEC-012</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{projects[0].name}</td>
                <td className="px-6 py-4 text-sm font-medium">R1</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Approved for Construction
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800">Manufacturing Clearances (MFC)</h3>
          </div>
          <div className="p-6 space-y-6 flex-1">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#102E55] mb-2">12</div>
              <p className="text-sm text-gray-500 font-medium">MFCs Pending Issue</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-700 uppercase">Recent Clearances</h4>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm font-bold text-gray-900">MFC-Boiler-Drums</div>
                  <div className="text-xs text-gray-500">Issued yesterday by R. Sharma</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="text-sm font-bold text-gray-900">MFC-Valves-Batch1</div>
                  <div className="text-xs text-gray-500">Pending final QA sign-off</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
