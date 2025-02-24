import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewPost from './components/NewPost';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/newpost" element={<NewPost />}/>
      </Routes>
    </Router>
  )

};

export default App;
