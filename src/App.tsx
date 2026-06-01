import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Admin from "./components/Admin";
import PostPage from "./components/PostPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<PostPage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
