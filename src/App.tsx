import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewPostPage from './features/newPost/components/NewPostPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/newpost" element={<NewPostPage />}/>
      </Routes>
    </Router>
  )

};

export default App;
