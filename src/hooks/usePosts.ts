import { type Post } from "../types/shared";
import { useQuery } from "@tanstack/react-query";

export default function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("http://localhost:3000/posts");
  const data = await response.json();
  return data.data;
}
