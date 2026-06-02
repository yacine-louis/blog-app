import type { Post } from "../types/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdatePost,
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["posts", post.id] });
    },
  });
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
