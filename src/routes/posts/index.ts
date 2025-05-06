import { zValidator } from "@hono/zod-validator";
import { createSecureRoute } from "../middlewares/session-middleware";
import { z } from "zod";
import { prismaClient } from "../../integration/prisma";
import { HTTPException } from "hono/http-exception";

export const postsRoutes = createSecureRoute();

postsRoutes.post(
  "",
  zValidator(
    "json",
    z.object({
      text: z.string().min(1, "only non-empty strings are allowed"),
    })
  ),
  async (context) => {
    const user = context.get("user");

    const { text } = context.req.valid("json");

    const post = await prismaClient.post.create({
      data: {
        text,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });
    return context.json(post, 201);
  }
);

postsRoutes.get("/:postId", async (context) => {
  const { postId } = context.req.param();

  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    throw new HTTPException(404);
  }

  return context.json(post);
});
