import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Admin from "./components/Admin";
import BlogPost from "./components/BlogPost";
import AdminPost from "./components/AdminPost";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error(`Something went wrong: ${error.message}`),
  }),
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postId" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/blog/:postId" element={<AdminPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
