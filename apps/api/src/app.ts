import Fastify from "fastify";
import { registerHealthRoutes } from "./modules/health/health.controller";

export function buildApp() {
  const app = Fastify({ logger: true });
  registerHealthRoutes(app);
  return app;
}
