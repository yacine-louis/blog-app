import { useParams } from "react-router";
import usePost from "../hooks/usePost";
import NotFound from "./NotFound";
import BlogPostView from "./BlogPostView";
import PostForm from "./PostForm";
import { useUpdatePost } from "../hooks/useUpdatePost";

export default function AdminPost() {
  const { postId } = useParams();
  const id = Number(postId);
  const isInvalidId = Number.isNaN(id);

  const { data, isLoading, error } = usePost(id);
  const { mutate: updatePost } = useUpdatePost();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  if (isInvalidId) {
    return <NotFound message="Invalid Post id" />;
  }

  if (!data) {
    return <>Error: No data</>;
  }
  const postdetails = {
    title: data.title,
    body: data.body,
  };

  const handleUpdatePost = (values: typeof postdetails) => {
    updatePost({ id, ...values });
  };

  return (
    <div>
      <PostForm
        initialValues={postdetails}
        submitText="Edit Post"
        onSubmit={handleUpdatePost}
        clearOnSubmit={false}
      />
      <BlogPostView postId={id} />
    </div>
  );
}
