import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CompanyKeyPage from './pages/CompanyKeyPage';
import DashboardPage from './pages/DashboardPage';
import EarningsPage from './pages/EarningsPage';
import ActiveJobPage from './pages/ActiveJobPage';
import CallPage from './pages/CallPage';
import MessagePage from './pages/MessagePage';
import JobDocumentationPage from './pages/JobDocumentationPage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <div className="iphone-frame">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/company-key" element={<CompanyKeyPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/earnings" element={<EarningsPage />} />
        <Route path="/active-job" element={<ActiveJobPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/job-documentation" element={<JobDocumentationPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
