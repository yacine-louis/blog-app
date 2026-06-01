import { NavLink, Outlet } from "react-router";
import usePosts from "../hooks/usePosts";

export default function Blog() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      <h1 className="text-4xl m-12">Blog</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <NavLink key={post.id} to={"/blog/" + post.id}>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-900">
                {post.title}
              </h2>

              <p className="mt-2 text-gray-600 line-clamp-3">{post.body}</p>
            </div>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
}
