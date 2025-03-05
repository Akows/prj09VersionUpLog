import React, { useState } from 'react';
import PageNav from '../components/layout/PageNav';
import TagList from '../features/tags/components/TagList';
import Posts from '../features/posts/AllPosts';
import Search from '../features/search/components/Search';
import SeriesList from '../features/series/components/SeriesList';
import { useOutletContext } from 'react-router-dom';
import { HomeOutletContext } from '../layout/MainLayout';

const Home: React.FC = () => {
  // HomeLayout에서 전달한 컨텍스트를 사용하여 activePage 상태를 가져옵니다.
  const { activePage, setActivePage } = useOutletContext<HomeOutletContext>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  // activePage에 따라 렌더링할 콘텐츠를 결정합니다.
  const renderContent = () => {
    switch (activePage) {
      case 'all':
        return <Posts selectedTag={selectedTag} />;
      case 'series': {
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
        return <SeriesList seriesData={seriesData} />;
      }
      case 'about':
        return <div className="p-4 bg-[var(--color-bg)] text-[var(--color-text)]">자기소개 페이지 디자인</div>;
      default:
        return null;
    }
  };

  // activePage가 'search'이면 Search 컴포넌트를 렌더링
  const renderMain = () => {
    if (activePage === 'search') {
      return (
        <Search
          setActivePage={(page) => {
            if (page === 'post') {
              setActivePage('all');
            }
          }}
        />
      );
    }
    return (
      <div className="container mx-auto px-4">
        <PageNav 
          activePage={activePage}
          onChangePage={(page) => setActivePage(page as 'all' | 'series' | 'about')}
        />
        <div className="flex flex-col md:flex-row mt-6 gap-6">
          {activePage !== 'series' && (
            <div className="md:w-1/4">
              <TagList 
                tags={['React', 'TypeScript', 'JavaScript', 'Node.js']}
                selectedTag={selectedTag}
                tagCounts={{ React: 10, TypeScript: 5, JavaScript: 8, 'Node.js': 3 }}
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

  return <>{renderMain()}</>;
};

export default Home;
