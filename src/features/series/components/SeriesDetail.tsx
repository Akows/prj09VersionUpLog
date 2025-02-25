import React, { useState } from 'react';
import Header from '../../../components/layout/Header';
import { FiMove, FiTrash2 } from 'react-icons/fi';

interface SeriesPost {
  day: number;
  title: string;
  excerpt: string;
  thumbnail?: string;
  createdAt: string;
}

interface SeriesDetailData {
  id: number;
  title: string;
  posts: SeriesPost[];
}

const SeriesDetail: React.FC = () => {
  // 예시 하드코딩 데이터
  const seriesData: SeriesDetailData = {
    id: 1,
    title: '데브코스 웹 풀스택 개발 5기',
    posts: [
      {
        day: 1,
        title: 'Day 01 - 프로젝트, 폴더 환경, Readme, Markdown, 배포 관리 시스템',
        excerpt: '프로젝트 구조와 폴더 환경을 정리하고, Markdown으로 문서화하여 배포...',
        thumbnail: 'https://via.placeholder.com/300x200?text=Day+01',
        createdAt: '2025년 1월 5일',
      },
      {
        day: 2,
        title: 'Day 02 - Git, GitHub, CLI 명령어',
        excerpt: 'Git과 GitHub를 통해 협업 환경을 구축하고, 기본 CLI 명령어를 학습...',
        thumbnail: 'https://via.placeholder.com/300x200?text=Day+02',
        createdAt: '2025년 1월 6일',
      },
      {
        day: 3,
        title: 'Day 03 - Github 기업, Repo 생성 및 실습',
        excerpt: '기업 계정을 활용해 Git Repo 생성 과정을 실습하고, 협업 플로우를...',
        thumbnail: '',
        createdAt: '2025년 1월 7일',
      },
    ],
  };

  // 드래그 앤 드랍 모드 토글
  const [isReorderMode, setIsReorderMode] = useState(false);
  const handleToggleReorderMode = () => {
    setIsReorderMode((prev) => !prev);
  };

  // 시리즈 삭제
  const handleDeleteSeries = () => {
    console.log('시리즈 삭제');
    // 실제 삭제 로직
  };

  // 테마 토글
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
        onSearchClick={() => console.log('검색 버튼 클릭')}
        onNewPostClick={() => console.log('새 글 작성 버튼 클릭')}
        onSettingsClick={() => console.log('개인 설정 버튼 클릭')}
        onThemeToggle={handleThemeToggle}
      />

      <div className="max-w-3xl mx-auto px-4 py-8 mt-8">
        {/* 작은 타이틀 (시리즈) */}
        <h1 className="text-xl text-green-600 font-bold mb-2">시리즈</h1>

        {/* 시리즈 제목 + 버튼 (수평 정렬) */}
        <div className="flex flex-col justify-between mb-6">
          <h2 className="text-3xl font-bold">{seriesData.title}</h2>

          {/* 버튼 영역 (반응형) */}
          <div className="flex items-center justify-end mt-5 space-x-3">
            {/* 데스크톱: 텍스트 버튼 */}
            <button
              onClick={handleToggleReorderMode}
              className="hidden md:block px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
            >
              {isReorderMode ? '수정 완료' : '순서 수정'}
            </button>
            {/* 모바일: 아이콘 버튼 */}
            <button
              onClick={handleToggleReorderMode}
              className="md:hidden p-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
            >
              <FiMove />
            </button>

            {/* 데스크톱: 텍스트 버튼 */}
            <button
              onClick={handleDeleteSeries}
              className="hidden md:block px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              시리즈 삭제
            </button>
            {/* 모바일: 아이콘 버튼 */}
            <button
              onClick={handleDeleteSeries}
              className="md:hidden p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        {/* 드래그 앤 드랍 모드 */}
        {isReorderMode ? (
          <div className="mb-6">
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              포스팅 순서를 드래그하여 변경하세요.
            </p>
            <div className="space-y-2">
              {seriesData.posts.map((post) => (
                <div
                  key={post.day}
                  className="flex items-center p-2 border border-gray-200 dark:border-gray-700 rounded cursor-move hover:shadow-md transition"
                >
                  <FiMove className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-800 dark:text-gray-100">
                    Day {post.day} - {post.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // 일반 포스팅 목록
          <ul className="space-y-6">
            {seriesData.posts.map((post) => (
              <li
                key={post.day}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-32 h-20 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/300x200?text=No+Image"
                        alt="No Image"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Day {post.day}
                    </p>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {post.excerpt}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      작성일: {post.createdAt}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SeriesDetail;
