import { useUpdatePost } from "../hooks/useUpdatePost";
import PostForm from "./PostForm";

export default function EditPost({ postId }: { postId: number }) {
  const { mutate } = useUpdatePost(postId);

  return <PostForm submitText="Edit Post" onSubmit={mutate} />;
}
