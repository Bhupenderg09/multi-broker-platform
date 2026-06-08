import type { FastifyInstance } from "fastify";
import { BrokerFactory } from "../brokers/broker.factory";

export function registerInstrumentRoutes(app: FastifyInstance): void {
  app.get("/api/instruments", async (request) => {
    const query = request.query as any;
    const adapter = BrokerFactory.getAdapter(query.brokerCode);
    return {
      ok: true,
      instruments: await adapter.fetchInstruments(query)
    };
  });

  app.get("/api/funds", async (request) => {
    const query = request.query as any;
    const adapter = BrokerFactory.getAdapter(query.brokerCode);
    return {
      ok: true,
      funds: await adapter.fetchFunds(query.accountId)
    };
  });
}
