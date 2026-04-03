import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ChannelPage } from "./pages/channel/ChannelPage";
import { ChannelDetailPage } from "./pages/channel/ChannelDetailPage";
import { PlaceholderPage } from "./pages/shared/PlaceholderPage";
import { WorkoutReadyPage } from "./pages/workout/WorkoutReadyPage";
import { WorkoutActivePage } from "./pages/workout/WorkoutActivePage";
import { WorkoutResultPage } from "./pages/workout/WorkoutResultPage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<PlaceholderPage title="대시보드 (Home)" />} />
          <Route path="/social" element={<ChannelPage />} />
          <Route path="/social/:id" element={<ChannelDetailPage />} />
          <Route path="/go" element={<WorkoutReadyPage />} />
          <Route path="/go/active" element={<WorkoutActivePage />} />
          <Route path="/go/result" element={<WorkoutResultPage />} />
          <Route path="/shop" element={<PlaceholderPage title="커머스 스토어" />} />
          <Route path="/profile" element={<PlaceholderPage title="내 프로필" />} />
          {/* 매칭되지 않는 경로는 홈으로 폴백 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
