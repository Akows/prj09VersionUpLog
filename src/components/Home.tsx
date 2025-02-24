import React, { useState } from 'react';
import Header from './layout/Header';
import PageNav from './layout/PageNav';
import TagList from '../features/tags/components/TagList';
import AllPosts from '../features/posts/components/AllPosts';
import Search from '../features/search/components/search';

const Home: React.FC = () => {
  const [activePage, setActivePage] = useState<'all' | 'series' | 'about'>('all');
  const [activePage2, setActivePage2] = useState<'post' | 'search'>('post');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const tags = ['React', 'TypeScript', 'JavaScript', 'Node.js']; // 예시 태그
  const tagCounts = { React: 10, TypeScript: 5, JavaScript: 8, "Node.js": 3 }; // 예시 글 갯수

  const renderContent = () => {
    switch (activePage) {
      case 'all':
        return <AllPosts selectedTag={selectedTag} />;
      case 'series':
        return <div className="p-4">시리즈 페이지 디자인</div>;
      case 'about':
        return <div className="p-4">자기소개 페이지 디자인</div>;
      default:
        return null;
    }
  };

  const renderContent2 = () => {
    switch (activePage2) {
      case 'post':
        return (
          <div className="container mx-auto px-4">
            <PageNav 
              activePage={activePage} 
              onChangePage={(page) => setActivePage(page as 'all' | 'series' | 'about')}
            />
            <div className="flex flex-col md:flex-row mt-6 gap-6">
              <div className="md:w-1/4">
                <TagList 
                  tags={tags} 
                  selectedTag={selectedTag} 
                  tagCounts={tagCounts}
                  onSelectTag={(tag) => setSelectedTag(tag)}
                />
              </div>
              <div className="md:w-3/4">
                {renderContent()}
              </div>
            </div>
          </div>
        );
      case 'search':
        return <Search setActivePage2={setActivePage2}/>;
      default:
        return null;
    }
  };

  const handleSearchClick = () => {
    setActivePage2('search');
    console.log('검색 페이지로 이동');
  };

  const handleNewPostClick = () => {
    console.log('새 글 작성 페이지로 이동');
  };

  const handleSettingsClick = () => {
    console.log('개인 설정 페이지로 이동');
  };

  const handleThemeToggle = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text dark:bg-bg dark:text-text">
      <Header 
        onSearchClick={handleSearchClick} 
        onNewPostClick={handleNewPostClick} 
        onSettingsClick={handleSettingsClick}
        onThemeToggle={handleThemeToggle} 
      />

      {renderContent2()}


    </div>
  );
};

export default Home;
