import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import GlobalModal from '../common/GlobalModal';
import { useModalContext } from '../../contexts/ModalContext';

export interface HomeOutletContext {
  activePage: 'all' | 'series' | 'about' | 'search';
  setActivePage: React.Dispatch<React.SetStateAction<'all' | 'series' | 'about' | 'search'>>;
}

const HomeLayout: React.FC = () => {
  const { openModal } = useModalContext();
  const [activePage, setActivePage] = useState<'all' | 'series' | 'about' | 'search'>('all');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    openModal('login');
  };
  const handleSettingsClick = () => {
    openModal('settings');
  };
  // 검색 버튼 클릭 시 activePage를 'search'로 변경하고, HomeMain으로 이동
  const handleSearchClick = () => {
    setActivePage('search');
    navigate("/"); // 홈의 기본 자식 라우트로 강제 이동
    console.log('검색 페이지로 이동 (홈 레이아웃)');
  };
  const handleNewPostClick = () => {
    console.log('새 글 작성 페이지로 이동 (홈 레이아웃)');
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
        onLoginClick={handleLoginClick}
      />
      <Outlet context={{ activePage, setActivePage }} />
      <GlobalModal />
    </div>
  );
};

export default HomeLayout;
