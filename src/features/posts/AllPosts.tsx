import React from 'react';
import PostList from './components/PostList';

interface PostsProps {
  selectedTag?: string;
}

const Posts: React.FC<PostsProps> = ({ selectedTag }) => {
  return (
    <div className="p-4">
      <PostList selectedTag={selectedTag} />
    </div>
  );
};

export default Posts;
