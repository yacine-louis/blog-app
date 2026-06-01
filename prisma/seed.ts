import { prisma } from "../lib/prisma";

async function main() {
  await prisma.post.deleteMany();

  const posts = await prisma.post.createMany({
    data: [
      {
        id: 1,
        title: "Long Post #1",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        userId: 1,
      },
      {
        id: 2,
        title: "Long Post #2",
        body: "Prisma makes database access easier by providing type-safe queries and a modern developer experience. This post contains well over one hundred characters.",
        userId: 1,
      },
      {
        id: 3,
        title: "Short Post",
        body: "Short post.",
        userId: 1,
      },
    ],
  });

  console.log(`Created ${posts.count} posts`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
