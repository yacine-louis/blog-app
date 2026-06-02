import type { Post } from "../types/shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function usePost(postId: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPost(postId),
    initialData: () => {
      const posts = queryClient.getQueryData<Post[]>(["posts"]);
      return posts?.find((post) => post.id === postId);
    },
    refetchOnWindowFocus: false,
  });
}

async function fetchPost(postId: number): Promise<Post> {
  const response = await fetch(`http://localhost:3000/posts/${postId}`);
  const data = await response.json();
  return data.data;
}
