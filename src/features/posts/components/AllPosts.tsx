// src/pages/AllPosts.tsx
import React from 'react';
import PostList from '../components/PostList';

interface AllPostsProps {
  selectedTag?: string;
}

const AllPosts: React.FC<AllPostsProps> = ({ selectedTag }) => {
  return (
    <div className="h-full">
      <PostList selectedTag={selectedTag} />
    </div>
  );
};

export default AllPosts;
