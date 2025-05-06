import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authenticationsRoute } from "./routes/authentications";
import { cors } from "hono/cors";
import { webClientUrl } from "./utils/environment";
import { postsRoutes } from "./routes/posts";
import { feedRoute } from "./routes/feed";

const allRoutes = new Hono();

allRoutes.use(
  cors({
    origin: webClientUrl,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 600,
  }),
);

allRoutes.route("/authentications", authenticationsRoute);
allRoutes.route("/posts",postsRoutes);
allRoutes.route("/feeds",feedRoute);
serve(allRoutes, ({ port }) => {
  console.log(`\tRunning at http://localhost:${port}`);
});