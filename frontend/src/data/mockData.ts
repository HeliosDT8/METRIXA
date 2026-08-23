export const organizations = [
  { id: 'org-1', name: 'BHEL Engineering' },
  { id: 'org-2', name: 'ABC EPC Project Co' }
];

export const users = [
  { id: 'u-1', name: 'Rahul Sharma', role: 'HOD', department: 'Engineering' },
  { id: 'u-2', name: 'Anita Desai', role: 'Design Engineer', department: 'Mechanical' },
];

export const projects = [
  {
    id: 'PRJ-2026-01',
    name: 'Thermal Power Expansion Project',
    customer: 'NTPC',
    manager: 'Rajeev Kumar',
    progress: 42,
    health: 'warning',
    targetDate: '2026-12-31'
  },
  {
    id: 'PRJ-2026-02',
    name: 'Boiler Modernization Package',
    customer: 'Tata Power',
    manager: 'Sunita Rao',
    progress: 78,
    health: 'success',
    targetDate: '2026-09-15'
  },
  {
    id: 'PRJ-2026-03',
    name: 'Industrial Turbine EPC',
    customer: 'Reliance',
    manager: 'Vikram Singh',
    progress: 12,
    health: 'critical',
    targetDate: '2027-03-31'
  }
];

export const activities = [
  {
    id: 'ACT-001',
    projectId: 'PRJ-2026-01',
    name: 'Technical Evaluation - Boiler Feed Pump',
    type: 'Procurement',
    assignedTo: 'Anita Desai',
    progress: 100,
    status: 'Completed',
    plannedStart: '2026-07-01',
    plannedFinish: '2026-07-15',
    actualStart: '2026-07-02',
    actualFinish: '2026-07-14',
    delayDays: 0
  },
  {
    id: 'ACT-002',
    projectId: 'PRJ-2026-01',
    name: 'Purchase Order - Boiler Feed Pump',
    type: 'Procurement',
    assignedTo: 'Rahul Sharma',
    progress: 0,
    status: 'Overdue',
    plannedStart: '2026-07-16',
    plannedFinish: '2026-07-31',
    actualStart: null,
    actualFinish: null,
    delayDays: 16
  },
  {
    id: 'ACT-003',
    projectId: 'PRJ-2026-01',
    name: 'Detailed Engineering - Piping',
    type: 'Engineering',
    assignedTo: 'Anita Desai',
    progress: 45,
    status: 'In Progress',
    plannedStart: '2026-08-01',
    plannedFinish: '2026-08-30',
    actualStart: '2026-08-05',
    actualFinish: null,
    delayDays: 0
  }
];

// Re-export specific mock data items as needed
