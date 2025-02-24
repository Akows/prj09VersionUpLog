// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  onSearchClick: () => void;   // 검색 페이지 이동
  onNewPostClick: () => void;  // 새 글 작성
  onSettingsClick: () => void; // 개인 설정
}

const Header: React.FC<HeaderProps> = React.memo(({ onSearchClick, onNewPostClick, onSettingsClick }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      {/* 로고 및 블로그명 */}
      <div className="flex items-center space-x-2">
        <img 
          src="/path/to/logo.png" 
          alt="Blog Logo" 
          className="w-8 h-8 object-cover"
        />
        <span className="font-bold text-xl">My Blog</span>
      </div>

      {/* 우측 버튼들 */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onSearchClick}
          className="text-gray-600 hover:text-black"
        >
          검색
        </button>
        <button 
          onClick={onNewPostClick}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          새 글 작성
        </button>
        <button 
          onClick={onSettingsClick}
          className="text-gray-600 hover:text-black"
        >
          개인 설정
        </button>
        {/* (제외) 알림 버튼 */}
        {/* <button className="text-gray-600 hover:text-black">알림</button> */}
      </div>
    </header>
  );
});

export default Header;
