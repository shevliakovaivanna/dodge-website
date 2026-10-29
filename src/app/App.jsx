
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import HomePage from '../features/home/pages/HomePage.jsx';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import RegisterPage from '../features/auth/pages/RegisterPage.jsx';
import CarTestPage from '../features/car-test/pages/CarTestPage.jsx';
import DodgeGamePage from '../features/mini-game/pages/DodgeGamePage.jsx';
import GaragePage from '../features/garage/pages/GaragePage.jsx';
import CalendarPage from '../features/savings/pages/CalendarPage.jsx';
import AdminPage from '../features/admin/pages/AdminPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game" element={<DodgeGamePage />} />
        <Route path="/test" element={<CarTestPage />} />
        <Route path="/garage" element={<GaragePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
