import React, { useState } from 'react';

interface SearchProps {
  setActivePage: (page: string) => void;
}

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  commentCount: number;
}

const Search: React.FC<SearchProps> = ({ setActivePage }) => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  // 검색 버튼 클릭 시 동작 (예시)
  const handleSearch = () => {
    // 실제 프로젝트에서는 API 호출 등을 통해 검색 결과를 받아옵니다.
    const sampleResults: Post[] = [
      {
        id: 1,
        title: '검색 결과 1',
        content: '검색 결과 내용 1',
        tags: ['React', 'JavaScript'],
        thumbnail: 'https://via.placeholder.com/150',
        createdAt: '2025-02-23 10:00',
        commentCount: 2,
      },
      {
        id: 2,
        title: '검색 결과 2',
        content: '검색 결과 내용 2',
        tags: ['TypeScript'],
        thumbnail: 'https://via.placeholder.com/150',
        createdAt: '2025-02-24 14:30',
        commentCount: 5,
      },
    ];
    setSearchResults(sampleResults);
  };

  return (
    <div className="bg-[var(--color-bg)] dark:bg-[var(--color-bg)] min-h-screen p-4">
      <div className="max-w-3xl mx-auto mt-10">
        {/* 상단 영역: 뒤로가기 버튼 + 안내 문구 */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setActivePage('post')}
            className="text-blue-500 hover:underline"
          >
            ← 뒤로가기
          </button>
          <p className="text-gray-700 dark:text-gray-300">
            이유승님이 작성한 포스트를 검색할 수 있습니다.
          </p>
        </div>

        {/* 검색 입력창 + 검색 버튼 */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-grow p-2 border var(--color-border) dark:border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="검색어를 입력하세요..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 var(--color-primary) text-white rounded hover:bg-blue-600"
          >
            검색
          </button>
        </div>

        {/* 검색 결과 목록 */}
        <div className="mt-6">
          {searchResults.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6">
              {searchResults.map((post) => (
                <li
                  key={post.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={post.thumbnail}
                      alt="Thumbnail"
                      className="w-24 h-24 rounded mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-xl mb-1">{post.title}</h3>
                      <p className="text-base text-gray-700 dark:text-gray-300">{post.content}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs dark:bg-blue-900 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span>{post.createdAt}</span>
                    <span className="ml-4">댓글 {post.commentCount}개</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
