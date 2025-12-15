import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppLayout } from './components/layouts/AppLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import RoutinesPage from './pages/RoutinesPage'
import RoutineCreatePage from './pages/RoutineCreatePage'
import RoutineEditPage from './pages/RoutineEditPage'
import SettingsPage from './pages/SettingsPage'
import CalendarPage from './pages/CalendarPage'
import ChatPage from './pages/ChatPage'
import RoutineDetailPage from './pages/RoutineDetailPage'
import OnboardingProfilePage from './pages/OnboardingProfilePage'
import OnboardingAssessmentPage from './pages/OnboardingAccessmentPage'
import ReportPage from './pages/ReportPage'
import { ProtectedAppRoute } from './routes/ProtectedAppRoute'
import ReminderSettingsPage from './pages/ReminderSettingsPage'
import OAuthSuccessPage from './pages/OAuthSuccessPage'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          {/* 인증 전 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/oauth/success" element={<OAuthSuccessPage />} />
          <Route path="/onboarding/profile" element={<OnboardingProfilePage />} />
          <Route path="/onboarding/assessment" element={<OnboardingAssessmentPage />} />


          {/* AppLayout이 적용되는 내부 페이지들 */}
          <Route element={<ProtectedAppRoute />}>
            <Route path="/app" element={<AppLayout />}>
              <Route path="home" element={<HomePage />} />
              
              <Route path="routines" element={<RoutinesPage />} />
              <Route path="routines/new" element={<RoutineCreatePage />} />
              <Route path="routines/:routineId" element={<RoutineDetailPage />} />
              <Route path="routines/:id/edit" element={<RoutineEditPage />} />

              <Route path="calendar" element={<CalendarPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="report" element={<ReportPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="settings/reminder" element={<ReminderSettingsPage />} />
            </Route>
          </Route>

          {/* 기본 루트 → 로그인 또는 홈으로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 그 외 404 대응 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
