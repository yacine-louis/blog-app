import { useParams } from "react-router";
import usePost from "../hooks/usePost";
import NotFound from "./NotFound";
import EditPost from "./EditPost";
import BlogPost from "./BlogPost";

export default function AdminPost() {
  const { postId } = useParams();
  const id = Number(postId);
  const isInvalidId = Number.isNaN(id);

  const { data, isLoading, error } = usePost(id);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  if (isInvalidId) {
    return <NotFound />;
  }

  if (!data) {
    return <>Error: No data</>;
  }
  return (
    <>
      <EditPost postId={id} />
      <BlogPost />
    </>
  );
}
