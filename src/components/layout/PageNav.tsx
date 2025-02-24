// src/components/PageNav.tsx
import React from 'react';

interface PageNavProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

const PageNav: React.FC<PageNavProps> = React.memo(({ activePage, onChangePage }) => {
  return (
    <nav className="flex space-x-4 p-4 border-b">
      <button 
        className={`pb-2 ${activePage === 'all' ? 'border-b-2 border-blue-500' : ''}`} 
        onClick={() => onChangePage('all')}
      >
        전체 글
      </button>
      <button 
        className={`pb-2 ${activePage === 'series' ? 'border-b-2 border-blue-500' : ''}`} 
        onClick={() => onChangePage('series')}
      >
        시리즈
      </button>
      <button 
        className={`pb-2 ${activePage === 'about' ? 'border-b-2 border-blue-500' : ''}`} 
        onClick={() => onChangePage('about')}
      >
        소개
      </button>
    </nav>
  );
});

export default PageNav;
