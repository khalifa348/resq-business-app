import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';
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
  const location = useLocation();
  return (
    <div className="device-stage">
      <div className="iphone-frame">
        <div className="dynamic-island" aria-hidden="true" />
        <PageTransition key={location.pathname}>
          <Routes location={location}>
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
        </PageTransition>
        <div className="home-indicator" aria-hidden="true" />
      </div>
    </div>
  );
}
