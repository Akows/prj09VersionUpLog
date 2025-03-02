import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { useModalContext } from '../../../contexts/ModalContext';

interface PostDetailData {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  tags: string[];
  seriesTitle?: string;
  content: string;
  headings: { id: string; text: string; level: number }[];
}

const PostDetail: React.FC = () => {
  const postData: PostDetailData = {
    id: 123,
    title: 'Day 56 - 이슈 제보, 문서 양식 기여, 모던 JS 기억해보기',
    author: '이유승',
    createdAt: '2025년 1월 10일',
    tags: ['React', 'TypeScript', 'Node.js'],
    seriesTitle: '데브코스 웹 풀스택 개발 5기',
    content: `
        # 이슈 제보 하기

        프로젝트에서 발생한 문제를 ...

        ## 이슈 활용하기

        이슈를 등록하고 ...

        ### 하위 섹션

        내용이 좀 더 구체적으로 ...
    `,
    headings: [
      { id: 'heading-1', text: '이슈 제보 하기', level: 1 },
      { id: 'heading-2', text: '이슈 활용하기', level: 2 },
      { id: 'heading-3', text: '하위 섹션', level: 3 },
    ],
  };

  const { openModal } = useModalContext();

  const handleDelete = () => {
    openModal('delete-post');
  };  

  const handleDownloadMarkdown = () => {
    const file = new Blob([postData.content], { type: 'text/markdown;charset=utf-8' });
    const fileURL = URL.createObjectURL(file);
    const tempLink = document.createElement('a');
    tempLink.href = fileURL;
    tempLink.download = `${postData.title}.md`;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(fileURL);
  };

  const handleEdit = () => {
    console.log('글 수정');
  };

  const handleScrollToHeading = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-8">
      <div className="flex gap-8">
        {/* 좌측 (다운로드 버튼) */}
        {/* <div className="w-16 flex-shrink-0">
          <button
            onClick={handleDownloadMarkdown}
            className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
          >
            <FiDownload size={24} />
            <span className="text-xs mt-1">다운로드</span>
          </button>
        </div> */}
        {/* 중앙 콘텐츠 영역 */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm var(--color-text) dark:text-gray-400">
              {postData.author} · {postData.createdAt}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleDownloadMarkdown}
                className="px-3.5 py-1 border border-gray-600 rounded text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
              >
                <FiDownload size={24} />
              </button>
              <button
                onClick={handleEdit}
                className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 var(--color-primary) text-white rounded hover:bg-red-600 transition"
              >
                삭제
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {postData.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          {postData.seriesTitle && (
            <div className="mb-4 border var(--color-border) dark:border-gray-700 p-3 rounded">
              <p className="text-sm var(--color-text) dark:text-gray-400 mb-1">
                시리즈에 속해있습니다
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {postData.seriesTitle}
              </p>
            </div>
          )}
          <div className="prose dark:prose-invert max-w-none">
            {postData.content.split('\n').map((line, idx) => {
              if (line.startsWith('### ')) {
                const headingId = postData.headings.find(h => h.text === line.slice(4))?.id;
                return (
                  <h3 id={headingId} key={idx} className="text-xl font-bold mt-6 mb-2">
                    {line.slice(4)}
                  </h3>
                );
              } else if (line.startsWith('## ')) {
                const headingId = postData.headings.find(h => h.text === line.slice(3))?.id;
                return (
                  <h2 id={headingId} key={idx} className="text-2xl font-bold mt-6 mb-2">
                    {line.slice(3)}
                  </h2>
                );
              } else if (line.startsWith('# ')) {
                const headingId = postData.headings.find(h => h.text === line.slice(2))?.id;
                return (
                  <h1 id={headingId} key={idx} className="text-3xl font-bold mt-6 mb-2">
                    {line.slice(2)}
                  </h1>
                );
              }
              return (
                <p key={idx} className="mb-2">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
        {/* 우측 (목차) */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <p className="font-bold mb-2">목차</p>
            <div className="space-y-2">
              {postData.headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => handleScrollToHeading(heading.id)}
                  className="block w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
                  style={{ marginLeft: (heading.level - 1) * 8 }}
                >
                  {heading.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
