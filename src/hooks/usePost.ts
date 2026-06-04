import type { Post } from "../types/shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postsOptions } from "./usePosts";

export default function usePost(postId: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPost(postId),
    initialData: () => {
      const posts = queryClient.getQueryData(postsOptions().queryKey);
      return posts?.find((post) => post.id === postId);
    },
  });
}

async function fetchPost(postId: number): Promise<Post> {
  const response = await fetch(`http://localhost:3000/posts/${postId}`);
  const data = await response.json();
  return data.data;
}
