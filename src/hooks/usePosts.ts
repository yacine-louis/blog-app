import { type Post } from "../types/shared";
import { useQuery, queryOptions } from "@tanstack/react-query";

export default function usePosts() {
  return useQuery(postsOptions());
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();
  return data.data;
}

export function postsOptions() {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}
