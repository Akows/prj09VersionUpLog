import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPostPage from './features/newPost/components/NewPostPage';
import SeriesDetail from './features/series/components/SeriesDetail';
import PostDetail from './features/posts/components/PostDetail';
import { ModalProvider } from './contexts/ModalContext';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import ProtectedRoute from './components/routes/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          {/* 로그인 여부과 무관하게 접근 가능한 publicRoute */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="series/:seriesId" element={<SeriesDetail />} />
          </Route>

          {/* 로그인된 사용자만 접근 가능한 ProtectedRoute */}
          <Route
            path="/newpost"
            element={
              <ProtectedRoute>
                <NewPostPage isEditing={false} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:postId"
            element={
              <ProtectedRoute>
                <NewPostPage isEditing={true} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ModalProvider>
    </Router>
  )
};

export default App;
