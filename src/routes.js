import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LearningPlan from './pages/LearningPlan';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/learning-plan" element={<LearningPlan />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;