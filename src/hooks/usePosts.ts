import { useEffect, useState } from "react";
import { type Post } from "../types/shared";

export default function usePosts() {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setData(fetchedPosts);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  return { data, isLoading, error, isError: !!error };
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();
  return data.data;
}
