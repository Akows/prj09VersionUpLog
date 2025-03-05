import React, { useState, useEffect } from 'react';
import { fetchTestData } from '../hooks/usePatchPostData';

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  commentCount: number;
}

interface PostListProps {
  selectedTag?: string;
}

const PostList: React.FC<PostListProps> = React.memo(({ selectedTag }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (tag: string | undefined, pageNum: number) => {
    const samplePosts: Post[] = [
      { 
        id: pageNum * 1, 
        title: `Sample Post ${pageNum * 1}`, 
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
        tags: ['React', 'JavaScript'], 
        thumbnail: 'https://via.placeholder.com/150', 
        createdAt: '2025-02-23 10:00', 
        commentCount: 5 
      },
      { 
        id: pageNum * 2, 
        title: `Sample Post ${pageNum * 2}`, 
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.', 
        tags: ['TypeScript'], 
        thumbnail: 'https://via.placeholder.com/150', 
        createdAt: '2025-02-22 14:30', 
        commentCount: 3 
      },
    ];
    return samplePosts;
  };

  useEffect(() => {
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

    fetchTestData();
  }, [page, selectedTag, hasMore]);

  const handleScroll = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="p-4">
      <ul className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <li key={post.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-center mb-4">
              <img src={post.thumbnail} alt="Thumbnail" className="w-24 h-24 rounded mr-4 object-cover" />
              <div>
                <h3 className="font-bold text-xl mb-1">{post.title}</h3>
                <p className="text-base text-gray-700">{post.content}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">{tag}</span>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              <span>{post.createdAt}</span>
              <span className="ml-4">댓글 {post.commentCount}개</span>
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button onClick={handleScroll} className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
            더 보기
          </button>
        </div>
      )}
    </section>
  );
});

export default PostList;
