import type { FastifyInstance } from "fastify";
import { BrokerAccountsService } from "./broker-accounts.service";

export function registerBrokerAccountRoutes(app: FastifyInstance): void {
  const service = new BrokerAccountsService();

  app.get("/api/broker-accounts", async () => ({
    ok: true,
    accounts: await service.list()
  }));

  app.post("/api/broker-accounts/register", async (request) => ({
    ok: true,
    account: await service.register(request.body as any)
  }));

  app.post("/api/broker-accounts/login", async (request) => ({
    ok: true,
    login: await service.login(request.body as any)
  }));
}
