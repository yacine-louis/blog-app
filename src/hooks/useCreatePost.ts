import type { Post, PostFormValues } from "../types/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

async function createPost(post: PostFormValues): Promise<Post> {
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
