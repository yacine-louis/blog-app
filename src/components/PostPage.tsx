import { useParams } from "react-router";
import usePost from "../hooks/usePost";
import NotFound from "./NotFound";

export default function PostPage() {
  const { postId } = useParams();
  console.log(postId);
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
    <div
      key={data.id}
      className="rounded-xl border border-gray-200 bg-white p-4 "
    >
      <h2 className="text-5xl font-semibold text-gray-900">{data.title}</h2>

      <p className="mt-2 text-gray-600 line-clamp-3">{data.body}</p>
    </div>
  );
}
