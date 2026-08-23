import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#114A87] sm:text-sm sm:leading-6 bg-gray-50"
            placeholder="Search projects, activities, PIs..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher Prototype */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Role:</span>
          <select className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#114A87] font-medium text-[#114A87]">
            <option>HOD / Eng Head</option>
            <option>Engineering Manager</option>
            <option>Design Engineer</option>
            <option>Purchase Engineer</option>
            <option>QA / Reviewer</option>
            <option>Project Engineer</option>
          </select>
        </div>

        <div className="flex items-center gap-4 border-l pl-6">
          <button className="text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-gray-700 leading-tight">Rahul Sharma</div>
              <div className="text-xs text-gray-500">BHEL Engineering</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
