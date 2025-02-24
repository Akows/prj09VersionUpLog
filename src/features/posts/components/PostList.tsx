// src/components/PostList.tsx
import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

interface PostListProps {
  selectedTag?: string;
}

const PostList: React.FC<PostListProps> = React.memo(({ selectedTag }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 예시로 가정한 API 호출 로직
  const fetchPosts = async (tag: string | undefined, pageNum: number) => {
    // 실제 프로젝트에서는 fetch/axios 등을 사용
    // const response = await fetch(`/api/posts?tag=${tag}&page=${pageNum}`);
    // return await response.json();

    // 여기서는 샘플 데이터로 대체
    const samplePosts: Post[] = [
      { id: pageNum * 1, title: `Sample Post ${pageNum*1}`, content: 'Lorem ipsum...', tags: ['React', 'JavaScript'] },
      { id: pageNum * 2, title: `Sample Post ${pageNum*2}`, content: 'Dolor sit amet...', tags: ['TypeScript'] },
      // ...
    ];
    return samplePosts;
  };

  useEffect(() => {
    // 태그가 바뀌면 첫 페이지부터 다시 로드
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedTag]);

  useEffect(() => {
    if (!hasMore) return;

    (async () => {
      const newPosts = await fetchPosts(selectedTag, page);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    })();
  }, [page, selectedTag, hasMore]);

  // 스크롤 이벤트(Intersection Observer 등)로 page 증가
  const handleScroll = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="p-4 overflow-auto">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-2">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-700">{post.content}</p>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button onClick={handleScroll} className="px-4 py-2 bg-gray-200 rounded">
            더 보기
          </button>
        </div>
      )}
    </section>
  );
});

export default PostList;
