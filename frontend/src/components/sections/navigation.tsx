import prisma from "@/lib/prisma";
import NavigationClient from "./NavigationClient";

export default async function Navigation() {
  try {
    const eventLinks = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        title: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return <NavigationClient eventLinks={eventLinks} />;
  } catch (error) {
    return <NavigationClient eventLinks={[]} />;
  }
}
