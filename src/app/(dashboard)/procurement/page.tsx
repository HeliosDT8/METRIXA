"use client";

import { ShoppingCart, Package, CheckSquare, Clock, AlertCircle } from 'lucide-react';
import { projects } from '../../../data/mockData';

export default function Procurement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55] flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-[#18A990]" />
            Procurement Tracking
          </h1>
          <p className="text-sm text-gray-500 mt-1">Purchase Indents, Enquiries, Offers, and PO status</p>
        </div>
        <button className="bg-[#18A990] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#15967f] shadow-sm">
          Raise New PI
        </button>
      </div>

      {/* Kanban Board style layout for Procurement Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Column 1 */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-100 rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Purchase Indents (PI)</h3>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">3</span>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-[#114A87] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-[#114A87]">PI-2026-00{i}</span>
                  <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">Pending Review</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Boiler Feed Pump Package</h4>
                <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                  <Package className="w-3 h-3" /> {projects[0].name}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" /> Due: Aug {15 + i}, 2026
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-100 rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Enquiries Floated</h3>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">1</span>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#114A87]">ENQ-2026-042</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Active</span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">Control Valves Set</h4>
              <div className="text-xs text-gray-500 mb-2">{projects[1].name}</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="text-[10px] text-gray-500 text-right">3/5 Offers Received</div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-100 rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Technical Eval (TBA)</h3>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">2</span>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
             {[1, 2].map(i => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer border-l-4 border-l-orange-400">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-[#114A87]">TBA-2026-01{i}</span>
                  <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">Evaluating</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">FD Fans & Motors</h4>
                <div className="text-xs text-gray-500 mb-2">Eng Owner: Rahul Sharma</div>
                <div className="flex items-center gap-1 text-xs font-medium text-orange-600">
                  <AlertCircle className="w-3 h-3" /> Clarifications Pending
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-100 rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Purchase Orders (PO)</h3>
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">1</span>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer border-l-4 border-l-[#18A990]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-[#114A87]">PO-2026-992</span>
                  <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Issued</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-2">Heat Exchangers</h4>
                <div className="text-xs text-gray-500 mb-2">Vendor: L&T Heavy Eng</div>
                <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <CheckSquare className="w-3 h-3" /> PO Accepted by Vendor
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
