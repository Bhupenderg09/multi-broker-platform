import type { FastifyInstance } from "fastify";
import { BROKER_REGISTRY } from "../brokers/broker.registry";

export function registerBrokerSelectionRoutes(app: FastifyInstance): void {
  app.get("/api/brokers", async () => ({
    ok: true,
    brokers: BROKER_REGISTRY
  }));
}
