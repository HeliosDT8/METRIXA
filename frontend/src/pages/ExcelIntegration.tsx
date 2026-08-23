import { useState } from 'react';
import { Download, Upload, AlertCircle, RefreshCw, Settings, FileSpreadsheet } from 'lucide-react';

export default function ExcelIntegration() {
  const [activeTab, setActiveTab] = useState<'import' | 'history' | 'mapping'>('import');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Mock sync history
  const syncHistory = [
    { id: 'SYNC-00124', file: 'Project_L2_Schedule_Aug.xlsx', date: '2026-08-16 10:24 AM', records: 124, status: 'Completed with warnings' },
    { id: 'SYNC-00123', file: 'Mechanical_Package_Updates.xlsx', date: '2026-08-15 14:30 PM', records: 45, status: 'Success' },
    { id: 'SYNC-00122', file: 'Vendor_Offers_Q3.xlsx', date: '2026-08-14 09:15 AM', records: 12, status: 'Failed' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102E55] flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-[#18A990]" />
            Excel Integration
          </h1>
          <p className="text-sm text-gray-500 mt-1">Import, export, and synchronize L2 Schedules & Activities with Excel</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-[#102E55] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Template
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'import', name: 'Import & Sync' },
            { id: 'history', name: 'Sync History' },
            { id: 'mapping', name: 'Column Mapping' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-[#18A990] text-[#18A990]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Import Tab Content */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-[#114A87]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Excel Spreadsheet</h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">Select a .xlsx file to synchronize with MATRIXA</p>
            
            <div className="max-w-md mx-auto">
              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-[#114A87] focus:outline-none">
                <span className="flex items-center space-x-2">
                  <span className="font-medium text-gray-600">
                    Drop files to Attach, or
                    <span className="text-[#114A87] underline ml-1">browse</span>
                  </span>
                </span>
                <input type="file" name="file_upload" className="hidden" accept=".xlsx, .xls" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
            </div>
            
            {file && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg max-w-md mx-auto flex items-center justify-between border border-gray-200">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                </div>
                <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
            
            <button 
              className={`mt-6 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors
                ${file ? 'bg-[#102E55] hover:bg-[#0E284A]' : 'bg-gray-300 cursor-not-allowed'}
              `}
              disabled={!file || isUploading}
              onClick={() => setIsUploading(true)}
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing File...
                </span>
              ) : 'Analyze & Preview Sync'}
            </button>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Microsoft 365 Auto-Sync (Coming Soon)</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>The Microsoft Graph API integration architecture is in place. Future versions will support automatic background sync with OneDrive/SharePoint Excel files without manual uploads.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab Content */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sync ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {syncHistory.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#114A87]">{row.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.file}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.records}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${row.status === 'Success' ? 'bg-green-100 text-green-800' : 
                        row.status === 'Failed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mapping Tab Content */}
      {activeTab === 'mapping' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#102E55]">Column Configuration</h3>
              <p className="text-sm text-gray-500">Map your Excel headers to MATRIXA internal fields.</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-[#114A87] font-medium hover:underline">
              <Settings className="w-4 h-4" />
              Reset to Default
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            <div className="text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-t-lg border-b">MATRIXA Field</div>
            <div className="text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-t-lg border-b">Excel Column Header</div>
            
            {['Activity ID', 'Project Code', 'Activity Name', 'Assigned Engineer', 'Planned Start', 'Progress %', 'Status'].map(field => (
              <div key={field} className="contents">
                <div className="flex items-center px-3 py-2 text-sm text-gray-900 font-medium">{field}</div>
                <div className="px-3 py-1">
                  <input type="text" defaultValue={field} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#114A87] focus:ring-[#114A87] sm:text-sm p-2 border" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button className="bg-[#102E55] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0E284A] transition-colors">
              Save Mappings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
