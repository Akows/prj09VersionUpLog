import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPostPage from './features/newPost/components/NewPostPage';
import SeriesDetail from './features/series/components/SeriesDetail';
import PostDetail from './features/posts/components/PostDetail';
import { ModalProvider } from './contexts/ModalContext';
import MainLayout from './components/layout/MainLayout';
import Home from './Pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="series/:seriesId" element={<SeriesDetail />} />
          </Route>
          <Route path="/newpost" element={<NewPostPage isEditing={false} />} />
          <Route path="/edit/:postId" element={<NewPostPage isEditing={true} />} />
        </Routes>
      </ModalProvider>
    </Router>
  )
};

export default App;
