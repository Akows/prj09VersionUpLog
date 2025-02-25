import React, { useState } from 'react';
import Header from './layout/Header';
import PageNav from './layout/PageNav';
import TagList from '../features/tags/components/TagList';
import AllPosts from '../features/posts/components/AllPosts';
import Search from '../features/search/components/Search';
import SeriesList from '../features/series/components/SeriesList';

// 예시 시리즈 데이터
const seriesData = [
  {
    id: 1,
    thumbnail: 'https://via.placeholder.com/300x200?text=Series+1',
    title: 'Next.js 학습',
    postCount: 5,
    lastPostAt: '2025년 1월 12일',
  },
  {
    id: 2,
    title: 'FE 챌린지',
    postCount: 8,
    lastPostAt: '2025년 2월 3일',
  },
];

const Home: React.FC = () => {
  // 하나의 상태로 페이지 전환 관리
  const [activePage, setActivePage] = useState<'all' | 'series' | 'about' | 'search'>('all');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  // 태그 정보 (예시)
  const tags = ['React', 'TypeScript', 'JavaScript', 'Node.js'];
  const tagCounts = { React: 10, TypeScript: 5, JavaScript: 8, 'Node.js': 3 };

  // 현재 페이지에 따라 메인 컨텐츠를 렌더링
  const renderContent = () => {
    switch (activePage) {
      case 'all':
        return <AllPosts selectedTag={selectedTag} />;
      case 'series':
        return <SeriesList seriesData={seriesData} />;
      case 'about':
        return <div className="p-4">자기소개 페이지 디자인</div>;
      default:
        return null;
    }
  };

  // 검색 페이지인지 여부를 확인해, 검색이면 Search 컴포넌트만 표시
  const renderMain = () => {
    if (activePage === 'search') {
      return (
        <Search
          // 검색 페이지에서 뒤로가기나 다른 페이지로 이동하려면
          // setActivePage를 통해 페이지 전환
          setActivePage2={(page) => {
            // 예: 뒤로가기 시 all 페이지로
            if (page === 'post') {
              setActivePage('all');
            }
          }}
        />
      );
    }

    // 검색이 아닐 때: PageNav + TagList + Content
    return (
      <div className="container mx-auto px-4">
        <PageNav 
          activePage={activePage}
          onChangePage={(page) => setActivePage(page as 'all' | 'series' | 'about')}
        />
        <div className="flex flex-col md:flex-row mt-6 gap-6">
          {/* 시리즈 페이지에서는 TagList가 렌더링되지 않도록 조건부 처리 */}
          {activePage !== 'series' && (
            <div className="md:w-1/4">
              <TagList 
                tags={tags}
                selectedTag={selectedTag}
                tagCounts={tagCounts}
                onSelectTag={(tag) => setSelectedTag(tag)}
              />
            </div>
          )}
          <div className={activePage !== 'series' ? 'md:w-3/4' : 'w-full'}>
            {renderContent()}
          </div>
        </div>
      </div>
    );
  };

  // 헤더 버튼 핸들러
  const handleSearchClick = () => {
    setActivePage('search');
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
      {renderMain()}
    </div>
  );
};

export default Home;
