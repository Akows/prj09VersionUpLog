// src/layouts/MainLayout.tsx
import React, { useState } from 'react';
import Header from './Header';
import PageNav from './PageNav';
import ProfileIntro from './ProfileIntro';
import TagList from '../../features/tags/components/TagList';
import AllPosts from '../../features/posts/components/AllPosts';

const MainLayout: React.FC = () => {
  const [activePage, setActivePage] = useState<'all' | 'series' | 'about'>('all');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const tags = ['React', 'TypeScript', 'JavaScript', 'Node.js']; // 예시 태그

  // PageNav에서 넘어온 page 상태에 따라 컴포넌트 전환
  const renderContent = () => {
    switch (activePage) {
      case 'all':
        return <AllPosts selectedTag={selectedTag} />;
      case 'series':
        return '시리즈!';
      case 'about':
        return '자기소개!';
      default:
        return null;
    }
  };

  // Header 버튼 클릭 핸들러 예시
  const handleSearchClick = () => {
    console.log('검색 페이지로 이동');
    // 실제 라우팅 혹은 모달/오버레이 등
  };

  const handleNewPostClick = () => {
    console.log('새 글 작성 페이지로 이동');
  };

  const handleSettingsClick = () => {
    console.log('개인 설정 페이지로 이동');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        onSearchClick={handleSearchClick} 
        onNewPostClick={handleNewPostClick} 
        onSettingsClick={handleSettingsClick} 
      />
      <ProfileIntro 
        profileImageUrl="/path/to/profile.jpg" 
        introText="안녕하세요, 프론트엔드 개발을 좋아하는 개발자입니다." 
      />

      <PageNav 
        activePage={activePage} 
        onChangePage={(page) => setActivePage(page as 'all' | 'series' | 'about')}
      />

      <div className="flex flex-grow">
        {/* 태그 목록 */}
        <TagList 
          tags={tags} 
          selectedTag={selectedTag} 
          onSelectTag={(tag) => setSelectedTag(tag)}
        />
        {/* 페이지 컨텐츠 영역 */}
        <div className="flex-grow">
          {renderContent()}
        </div>
      </div>

      {/* (선택) Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
