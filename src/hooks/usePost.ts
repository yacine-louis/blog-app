import { useEffect, useState } from "react";
import { type Post } from "../types/shared";

export default function usePost(postId: number) {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPost = await fetchPost(postId);
        setData(fetchedPost);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [postId]);

  return { data, isLoading, error, isError: !!error };
}

async function fetchPost(postId: number): Promise<Post> {
  const response = await fetch(`http://localhost:3000/posts/${postId}`);
  const data = await response.json();
  return data.data;
}
