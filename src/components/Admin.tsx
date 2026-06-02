import { NavLink } from "react-router";
import usePosts from "../hooks/usePosts";
import DeletePost from "./DeletePost";
import { useCreatePost } from "../hooks/useCreatePost";
import PostForm from "./PostForm";

export default function Admin() {
  const postsQuery = usePosts();
  const { mutate: createPost } = useCreatePost();

  if (postsQuery.isLoading) {
    return <>Loading...</>;
  }

  if (!postsQuery.data || postsQuery.error) {
    return <>Error</>;
  }

  return (
    <>
      <div className="ml-3">
        {postsQuery.data.map((post) => (
          <div key={post.id} className="flex">
            <NavLink to={"blog/" + post.id}>
              <li>
                <h2 className="text-lg font-semibold text-blue-500">
                  {post.title}
                </h2>
              </li>
            </NavLink>
            <DeletePost postId={post.id} />
          </div>
        ))}
      </div>
      <hr />
      <h2>Create new Post</h2>
      <PostForm submitText="Create Post" clearOnSubmit onSubmit={createPost} />
    </>
  );
}
