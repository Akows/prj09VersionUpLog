import React, { useState, useEffect } from 'react';

interface NewPostPageProps {
  // isEditing이 true면 기존 글을 수정하는 모드
  // postId가 있을 경우, 해당 ID의 글을 불러와 초기 값에 세팅할 수 있음
  isEditing?: boolean;
  postId?: number;
}

const NewPostPage: React.FC<NewPostPageProps> = ({ isEditing, postId }) => {
  // 레이아웃: 'horizontal'(수평) / 'vertical'(수직)
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');

  // 입력 상태
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  // (예시) 글 데이터 불러오기
  useEffect(() => {
    if (isEditing && postId) {
      // 실제 프로젝트에서는 API 호출로 기존 글 데이터를 가져옴
      // 예: fetch(`/api/posts/${postId}`)
      //     .then(res => res.json())
      //     .then(data => {
      //       setTitle(data.title);
      //       setTags(data.tags.join(', '));
      //       setContent(data.content);
      //     });
      console.log(`기존 글 (ID: ${postId}) 데이터를 불러와서 폼에 세팅`);
      // 하드코딩 예시
      setTitle('기존 글 제목 예시');
      setTags('React, TypeScript');
      setContent('기존 글 내용입니다...');
    }
  }, [isEditing, postId]);

  // 레이아웃 토글
  const handleToggleLayout = () => {
    setLayout((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
  };

  // 뒤로가기 버튼
  const handleGoBack = () => {
    console.log('뒤로가기');
    // 실제 라우팅/상태 변경 등
  };

  // 출간하기 / 수정 완료 버튼
  const handleSubmit = () => {
    if (isEditing) {
      console.log('수정 완료');
      console.log('제목:', title);
      console.log('태그:', tags);
      console.log('본문:', content);
      // 실제로는 PUT /api/posts/:postId 등의 API 호출
    } else {
      console.log('출간하기');
      console.log('제목:', title);
      console.log('태그:', tags);
      console.log('본문:', content);
      // 실제로는 POST /api/posts 등의 API 호출
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button 
          onClick={handleGoBack} 
          className="text-blue-600 hover:underline"
        >
          뒤로가기
        </button>
        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {isEditing ? '수정 완료' : '출간하기'}
        </button>
      </header>

      {/* 레이아웃 토글 버튼 */}
      <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-end">
        <button 
          onClick={handleToggleLayout}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {layout === 'horizontal' ? '수직 보기' : '수평 보기'}
        </button>
      </div>

      {/* 메인 영역: 에디터 + 미리보기 */}
      <div className={
          layout === 'horizontal'
            ? 'flex flex-1 flex-row'
            : 'flex flex-1 flex-col'
        }
      >
        {/* 에디터 영역 */}
        <div
          className={
            layout === 'horizontal'
              ? 'w-1/2 h-full border-r border-[var(--color-border)] p-6'
              : 'flex-1 border-b border-[var(--color-border)] p-6'
          }
        >
          <div className="mb-4">
            <label className="block mb-2 font-bold text-xl">
              제목
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">
              태그
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
              placeholder="태그를 입력하세요 (쉼표로 구분)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* 간단한 툴바 (예시) */}
          <div className="flex items-center space-x-2 mb-4 text-gray-600 dark:text-gray-300">
            <span className="hover:text-green-500 cursor-pointer">B</span>
            <span className="hover:text-green-500 cursor-pointer">I</span>
            <span className="hover:text-green-500 cursor-pointer">H1</span>
            <span className="hover:text-green-500 cursor-pointer">Code</span>
          </div>

          {/* 본문 입력 (실제 마크다운 에디터 대신 textarea로 예시) */}
          <textarea
            className="w-full h-[50vh] border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none"
            placeholder="여기에 마크다운을 작성하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 미리보기 영역 */}
        <div
          className={
            layout === 'horizontal'
              ? 'w-1/2 h-full p-6'
              : 'flex-1 p-6'
          }
        >
          <h2 className="mb-4 font-bold text-xl">미리보기</h2>
          <div className="w-full h-[50vh] overflow-auto rounded p-2">
            {/* 간단히 content를 표시. 실제 마크다운 파서 연동 시 대체 */}
            {content ? content : '작성 내용이 여기 미리보기로 표시됩니다.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
