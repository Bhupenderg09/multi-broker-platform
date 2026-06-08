import type { FastifyInstance } from "fastify";
import { StrategiesService } from "./strategies.service";

export function registerStrategyRoutes(app: FastifyInstance): void {
  const service = new StrategiesService();

  app.get("/api/strategies", async () => ({
    ok: true,
    strategies: await service.list()
  }));

  app.post("/api/strategies", async (request) => ({
    ok: true,
    strategy: await service.create(request.body as any)
  }));
}
