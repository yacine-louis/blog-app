import { useDeletePost } from "../hooks/useDeletePost";

export default function DeletePost({ postId }: { postId: number }) {
  const { mutate: deletePost } = useDeletePost();

  return (
    <button onClick={() => deletePost(postId)} className="ml-4 cursor-pointer">
      Delete
    </button>
  );
}
