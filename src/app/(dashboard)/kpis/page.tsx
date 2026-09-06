"use client";

import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line 
} from 'recharts';

export default function KPIs() {
  const productivityData = [
    { month: 'Apr', engineering: 65, procurement: 45 },
    { month: 'May', engineering: 70, procurement: 55 },
    { month: 'Jun', engineering: 85, procurement: 75 },
    { month: 'Jul', engineering: 78, procurement: 80 },
    { month: 'Aug', engineering: 92, procurement: 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#18A990]" />
            Performance KPIs
          </h1>
          <p className="text-sm text-gray-500 mt-1">Departmental and organizational performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-2">Schedule Variance (SV)</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-[#102E55]">1.08</div>
            <div className="flex items-center text-sm font-medium text-green-600 mb-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +0.05
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-2">Value &gt; 1.0 indicates ahead of schedule</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-2">Average Cycle Time (PI to PO)</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-[#102E55]">42 Days</div>
            <div className="flex items-center text-sm font-medium text-green-600 mb-1">
              <TrendingDown className="w-4 h-4 mr-1" /> -5 Days
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-2">Target: 35 Days</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-2">Drawing Approval Rate (1st Pass)</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-[#102E55]">68%</div>
            <div className="flex items-center text-sm font-medium text-red-600 mb-1">
              <TrendingDown className="w-4 h-4 mr-1" /> -2%
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-2">Target: 80%</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-[#102E55] mb-6">Departmental Productivity Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="engineering" name="Engineering (Activities Completed)" stroke="#114A87" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="procurement" name="Procurement (Activities Completed)" stroke="#18A990" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
