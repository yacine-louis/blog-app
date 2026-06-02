import { useParams } from "react-router";
import NotFound from "./NotFound";
import BlogPostView from "./BlogPostView";

export default function BlogPost() {
  const { postId } = useParams();
  const id = Number(postId);
  const isInvalidId = Number.isNaN(id);
  if (isInvalidId) {
    return <NotFound message="Invalid Post id" />;
  }

  return <BlogPostView postId={id} />;
}
