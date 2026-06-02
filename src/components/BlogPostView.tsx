import usePost from "../hooks/usePost";

export default function BlogPostView({ postId }: { postId: number }) {
  const { data, isLoading, error } = usePost(postId);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
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
