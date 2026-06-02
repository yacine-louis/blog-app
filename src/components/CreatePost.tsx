import { useCreatePost } from "../hooks/useCreatePost";
import PostForm from "./PostForm";

export default function CreatePost() {
  const { mutate } = useCreatePost();

  return <PostForm submitText="Create Post" onSubmit={mutate} />;
}
