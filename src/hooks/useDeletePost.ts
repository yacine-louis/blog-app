import { useState } from "react";
import type { Post } from "../types/shared";

export function useDeletePost(postId: number) {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const deletedPost = await deletePost(postId);
      setData(deletedPost);
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

async function deletePost(postId: number) {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  const data = await response.json();

  return data.data;
}
