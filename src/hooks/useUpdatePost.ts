import { useState } from "react";
import type { Post, PostFormValues } from "../types/shared";

export function useUpdatePost(postId: number) {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (values: PostFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const post: Post = { ...values, id: postId };
      const updatedPost = await UpdatePost(post);
      setData(updatedPost);
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

async function UpdatePost(post: Post): Promise<Post> {
  const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: post.title, body: post.body }),
  });
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  const data = await response.json();

  return data.data;
}
