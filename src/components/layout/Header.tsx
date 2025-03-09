import React from 'react';
import { FiSearch, FiEdit, FiSettings, FiSun, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

interface HeaderProps {
  onSearchClick: () => void;
  onNewPostClick: () => void;
  onThemeToggle: () => void;
  onLoginClick: () => void;
  onSettingsClick: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  onSearchClick,
  onNewPostClick,
  onThemeToggle,
  onLoginClick,
  onSettingsClick,
}) => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-md text-[var(--color-text)]">
      {/* 로고 및 타이틀 */}
      <div className="flex items-center space-x-3">
        <img src="/path/to/logo.png" alt="Blog Logo" className="w-10 h-10 object-cover" />
        <span className="font-bold text-2xl">VersionUpLog</span>
      </div>

      {/* PC 모드 버튼 */}
      <div className="hidden md:flex items-center space-x-4">
        <button onClick={onSearchClick} className="text-gray-600 hover:text-blue-500 transition">
          검색
        </button>

        {/* 로그인한 경우에만 '새 글 작성' 버튼 노출 */}
        {user && (
          <Link to="/newpost">
            <button onClick={onNewPostClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              새 글 작성
            </button>
          </Link>
        )}

        {/* 로그인/로그아웃 버튼 */}
        {!user ? (
          <button onClick={onLoginClick} className="text-gray-600 hover:text-blue-500 transition">
            로그인
          </button>
        ) : (
          <button onClick={onSettingsClick} className="text-gray-600 hover:text-blue-500 transition">
            개인 설정
          </button>
        )}

        <button onClick={onThemeToggle} className="border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          테마 전환
        </button>
      </div>

      {/* 모바일 모드 버튼 */}
      <div className="flex md:hidden items-center space-x-3">
        <button onClick={onSearchClick} className="text-gray-600 hover:text-blue-500 transition">
          <FiSearch size={20} />
        </button>

        {/* 로그인한 경우에만 '새 글 작성' 버튼 노출 */}
        {user && (
          <Link to="/newpost">
            <button onClick={onNewPostClick} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
              <FiEdit size={20} />
            </button>
          </Link>
        )}

        {/* 로그인/로그아웃 버튼 */}
        {!user ? (
          <button onClick={onLoginClick} className="text-gray-600 hover:text-blue-500 transition">
            <FiLogIn size={20} />
          </button>
        ) : (
          <button onClick={onSettingsClick} className="text-gray-600 hover:text-blue-500 transition">
            <FiSettings size={20} />
          </button>
        )}

        <button onClick={onThemeToggle} className="border p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <FiSun size={20} />
        </button>
      </div>
    </header>
  );
};

const Header = React.memo(HeaderComponent);
Header.displayName = "Header";

export default Header;
