import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { lazy } from 'react';

// why to do this? to prevent send too match code
const Home = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Subject = lazy(() => import('./pages/SubjectPage'));
const Subjects = lazy(() => import('./pages/Subjects'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UploadFile = lazy(() => import('./pages/UploadFile'));
const StudentResult = lazy(() => import('./pages/StudentResultPage'));
const FileOptionsPage = lazy(() => import('./pages/FileOptionsPage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const VerificationPassword = lazy(() => import('./pages/VerificationPassword'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const StudentInformation = lazy(() => import('./pages/StudentInformation'));
const SpecificYearPage = lazy(() => import('./pages/SpecificYearPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const AddSubjectPage = lazy(() => import('./pages/AddSubjectPage'));
const SubjectsOptions = lazy(() => import('./pages/SubjectsOptions'));
const RequireAuth = lazy(() => import('./components/RequireAuth'));
const StudentRoles = lazy(() => import('./components/StudentRoles'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<RequireAuth />}>
          {/* Protected Routes */}
          <Route index element={<Home />} />
          <Route path="/student-info" element={<StudentInformation />} />
          <Route
            path="/year-subjects/:selected"
            element={<SpecificYearPage />}
          />
          <Route path="subjects/:name" element={<Subject />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="/add-subject" element={<AddSubjectPage />} />
          <Route path="/subject-options" element={<SubjectsOptions />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/student-result" element={<StudentResult />} />
          <Route path="/file-options" element={<FileOptionsPage />} />
          <Route path="/roles" element={<StudentRoles />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerificationPassword />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
