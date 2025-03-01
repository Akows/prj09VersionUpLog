import React from 'react';

interface PageNavProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

const PageNav: React.FC<PageNavProps> = React.memo(({ activePage, onChangePage }) => {
  const navButtonClasses = (page: string) =>
    `px-3 py-2 text-lg font-medium transition border-b-4 ${
      activePage === page ? "border-blue-500" : "border-transparent"
    } hover:text-blue-500`;

  return (
    <>
      <section className="flex items-center justify-center mt-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
        <img 
          src="/path/to/profile.jpg"  
          alt="Profile" 
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="ml-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">이유승</h2>
          <p className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">안녕하세요, 프론트엔드 개발을 좋아하는 개발자입니다.</p>
        </div>
      </section>
      <nav className="flex justify-center py-4 border-b border-gray-300">
        <button className={navButtonClasses('all')} onClick={() => onChangePage('all')}>
          전체 글
        </button>
        <button className={navButtonClasses('series')} onClick={() => onChangePage('series')}>
          시리즈
        </button>
        <button className={navButtonClasses('about')} onClick={() => onChangePage('about')}>
          소개
        </button>
      </nav>
    </>
  );
});

export default PageNav;
