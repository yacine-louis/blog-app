import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";
import { Hono } from "hono";

const app = new Hono();

app.get("/posts", async (c) => {
  // get all posts
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
    },
  });

  const trimmed = posts.map((post) => {
    return { ...post, body: post.body.slice(0, 50) };
  });

  return c.json({ status: "success", data: trimmed });
});

app.get("/posts/:id", async (c) => {
  // get a single post
  const idParam = c.req.param("id");
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id)) {
    return c.json({ status: "error", message: "Invalid id" }, 400);
  }
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    return c.json({ status: "error", message: "Post not found" }, 404);
  }

  return c.json({ status: "success", data: post });
});

app.post("/posts", async (c) => {
  // create post
  const body = await c.req.parseBody();
  const postTitle = body["title"];
  const postBody = body["body"];

  if (typeof postTitle !== "string" || typeof postBody !== "string") {
    return c.json({ status: "error", message: "Invalid input" }, 400);
  }
  // create post
  const post = await prisma.post.create({
    data: {
      title: postTitle,
      body: postBody,
    },
  });

  return c.json({ status: "success", data: post }, 201);
});

app.patch("/posts/:id", async (c) => {
  // update post
  const idParam = c.req.param("id");
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id)) {
    return c.json({ status: "error" }, 400);
  }

  const body = await c.req.parseBody();
  const postTitle = body["title"];
  const postBody = body["body"];

  if (typeof postTitle !== "string" || typeof postBody !== "string") {
    return c.json({ status: "error", message: "Invalid input" }, 400);
  }
  try {
    const updatedPost = await prisma.post.update({
      data: {
        title: postTitle,
        body: postBody,
      },
      where: {
        id: id,
      },
    });

    return c.json({ status: "success", data: updatedPost }, 200);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return c.json({ status: "error", message: "Post not found" }, 404);
      }
    }
    throw e;
  }
});

app.delete("/posts/:id", async (c) => {
  // delete post
  const idParam = c.req.param("id");
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id)) {
    return c.json({ status: "error", message: "Invalid id" }, 400);
  }

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return c.json({ status: "success", data: deletedPost }, 200);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        // Record to delete not found
        return c.json({ status: "error", message: "Post not found" }, 404);
      }
    }
    throw e;
  }
});

export default app;
