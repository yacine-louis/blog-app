import { useState } from "react";
import type { Post, PostFormValues } from "../types/shared";

export function useCreatePost() {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (post: PostFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const createdPost = await createPost(post);
      setData(createdPost);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error, isError: !!error };
}

async function createPost(post: PostFormValues) {
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: post.title, body: post.body }),
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  const data = await response.json();
  return data.data;
}
