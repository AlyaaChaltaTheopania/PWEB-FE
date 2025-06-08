import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Barang from './pages/Barang';
import Loan from './pages/Loan';
import DetailPeminjaman from './pages/DetailPeminjaman';
import AdminDashboard from './admindashboard/AdminDashboard';
import InventoryManagement from './admindashboard/InventoryManagement';
import LoanManagement from './admindashboard/LoanManagement';
import Reports from './admindashboard/Reports';
import Settings from './admindashboard/Settings';
import UserManagement from './admindashboard/UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/barang" element={<Barang />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/detailpeminjaman" element={<DetailPeminjaman />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/inventorymanagement" element={<InventoryManagement />} />
        <Route path="/loanmanagement" element={<LoanManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/usermanagement" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;