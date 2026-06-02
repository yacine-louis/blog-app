import { NavLink } from "react-router";
import usePosts from "../hooks/usePosts";
import CreatePost from "./CreatePost";

export default function Admin() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      <div className="ml-3">
        {data.map((post) => (
          <div key={post.id} className="flex">
            <NavLink to={"blog/" + post.id}>
              <li>
                <h2 className="text-lg font-semibold text-blue-500">
                  {post.title}
                </h2>
              </li>
            </NavLink>
            <button className="ml-4 cursor-pointer"> delete</button>
          </div>
        ))}
      </div>
      <hr />
      <CreatePost />
    </>
  );
}
