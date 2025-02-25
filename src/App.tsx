import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewPostPage from './features/newPost/components/NewPostPage';
import SeriesDetail from './features/series/components/SeriesDetail';
import PostDetail from './features/posts/components/PostDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* 새 글 작성 */}
        <Route path="/new" element={<NewPostPage isEditing={false} />} />
        {/* 기존 글 수정 */}
        <Route path="/edit/:postId" element={<NewPostPage isEditing={true} />} />
        <Route path="/series/:seriesId" element={<SeriesDetail />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  )

};

export default App;
