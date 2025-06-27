import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { lazy, Suspense } from 'react';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingAnimation from './animation/LoadingAnimation';
import Errorfallback from './components/Errorfallback';

// why to do this? to prevent send too match code
const Home = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Subjects = lazy(() => import('./pages/Subjects'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UploadFile = lazy(() => import('./pages/UploadFile'));
const StudentResult = lazy(() => import('./pages/StudentResultPage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerificationPassword = lazy(() => import('./pages/VerificationPassword'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const StudentInformation = lazy(() => import('./pages/StudentInformation'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const AddSubjectPage = lazy(() => import('./pages/AddSubjectPage'));
const RequireAuth = lazy(() => import('./components/RequireAuth'));
const StudentRoles = lazy(() => import('./components/StudentRoles'));
const PDFManagement = lazy(() => import('./components/PDFManagement'));

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={Errorfallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route element={<RequireAuth />}>
              {/* Protected Routes */}
              <Route index element={<Home />} />
              <Route path="/student-info" element={<StudentInformation />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="/add-subject" element={<AddSubjectPage />} />
              <Route path="//pdf-options" element={<PDFManagement />} />
              <Route path="/upload" element={<UploadFile />} />
              <Route path="/student-result" element={<StudentResult />} />
              <Route path="/roles" element={<StudentRoles />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>

            <Route element={<RedirectIfAuthenticated />}>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-code" element={<VerificationPassword />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
