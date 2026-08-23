import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ExcelIntegration from './pages/ExcelIntegration';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import L2Schedule from './pages/L2Schedule';
import Delays from './pages/Delays';
import Activities from './pages/Activities';
import Procurement from './pages/Procurement';
import Engineering from './pages/Engineering';
import Documents from './pages/Documents';
import KPIs from './pages/KPIs';

function App() {
  // Simple auth state for prototype
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="l2-schedule" element={<L2Schedule />} />
          <Route path="activities" element={<Activities />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="documents" element={<Documents />} />
          <Route path="kpis" element={<KPIs />} />
          <Route path="delays" element={<Delays />} />
          <Route path="excel-integration" element={<ExcelIntegration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
