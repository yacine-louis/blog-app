import { useDeletePost } from "../hooks/useDeletePost";

export default function DeletePost({ postId }: { postId: number }) {
  const { mutate } = useDeletePost(postId);

  return (
    <button onClick={mutate} className="ml-4 cursor-pointer">
      Delete
    </button>
  );
}
