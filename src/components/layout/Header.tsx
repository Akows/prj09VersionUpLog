import React from 'react';
import { FiSearch, FiEdit, FiSettings, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
  onNewPostClick: () => void;
  onSettingsClick: () => void;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ onSearchClick, onNewPostClick, onSettingsClick, onThemeToggle }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-bg border-b shadow-md dark:bg-bg dark:text-text">
      {/* 로고 및 블로그명 */}
      <div className="flex items-center space-x-3">
        <img 
          src="/path/to/logo.png" 
          alt="Blog Logo" 
          className="w-10 h-10 object-cover"
        />
        <span className="font-bold text-2xl">VersionUpLog</span>
      </div>
      {/* 버튼 그룹: 데스크탑은 텍스트 버튼, 모바일은 아이콘 버튼 */}
      <div className="flex items-center space-x-4">

        {/* 데스크탑: 텍스트 버튼 */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={onSearchClick}
            className="text-gray-600 hover:text-blue-500 transition"
          >
            검색
          </button>
          <Link to="/newpost">
            <button 
              onClick={onNewPostClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              새 글 작성
            </button>
          </Link>
          <button 
            onClick={onSettingsClick}
            className="text-gray-600 hover:text-blue-500 transition"
          >
            개인 설정
          </button>
          <button
            onClick={onThemeToggle}
            className="border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            테마 전환
          </button>
        </div>

        {/* 모바일: 아이콘 버튼 */}
        <div className="flex md:hidden items-center space-x-3">
          <button 
            onClick={onSearchClick}
            className="text-gray-600 hover:text-blue-500 transition"
          >
            <FiSearch size={20} />
          </button>
          <Link to="/newpost">
            <button 
              onClick={onNewPostClick}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              <FiEdit size={20} />
            </button>
          </Link>
          <button 
            onClick={onSettingsClick}
            className="text-gray-600 hover:text-blue-500 transition"
          >
            <FiSettings size={20} />
          </button>
          <button
            onClick={onThemeToggle}
            className="border p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FiSun size={20} />
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
