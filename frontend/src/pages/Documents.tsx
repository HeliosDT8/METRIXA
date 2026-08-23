import { FileText, Download, File, Folder, MoreVertical } from 'lucide-react';
import { projects } from '../data/mockData';

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#18A990]" />
            Document Repository
          </h1>
          <p className="text-sm text-gray-500 mt-1">Centralized storage for specifications, manuals, and project records</p>
        </div>
        <button className="bg-[#102E55] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0E284A] shadow-sm">
          Upload Document
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Folders */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4 shrink-0">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Project Folders</h3>
          <ul className="space-y-1">
            {projects.map(p => (
              <li key={p.id}>
                <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-[#114A87]">
                  <Folder className="w-4 h-4 text-[#18A990]" />
                  <span className="truncate">{p.id}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* File List */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'Technical_Spec_Boiler.pdf', size: '2.4 MB', date: 'Aug 20, 2026' },
                { name: 'Vendor_List_Approved.xlsx', size: '156 KB', date: 'Aug 18, 2026' },
                { name: 'Project_Kickoff_MOM.docx', size: '42 KB', date: 'Jul 15, 2026' },
              ].map((doc, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <File className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="text-gray-400 hover:text-[#114A87]"><Download className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
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
