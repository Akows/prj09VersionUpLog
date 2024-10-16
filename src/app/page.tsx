"use client"

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {

      const { data, error } = await supabase
      .from('posts')
      .select();

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        console.log('Data:', data);
        setPosts(data || []);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>블로그 글 목록</h1>
      {posts.length === 0 ? (
        <p>글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{new Date(post.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
