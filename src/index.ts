import { serve } from "@hono/node-server";
import { Hono } from "hono";

const allRoutes = new Hono();

allRoutes.get("", (context) => {
  return context.json({
    message: "hello world",
  });
});

serve(allRoutes, ({ port }) => {
  console.log(`running at http://localhost:${port}`);
});
