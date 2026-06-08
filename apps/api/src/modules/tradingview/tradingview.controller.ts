import type { FastifyInstance } from "fastify";
import type { TradingViewSignalPayload } from "@shared/core";
import { TradingViewService } from "./tradingview.service";

export function registerTradingViewRoutes(app: FastifyInstance): void {
  const service = new TradingViewService();

  app.post("/webhooks/tradingview", async (request, reply) => {
    const body = request.body as TradingViewSignalPayload;

    if (!body?.secret || !body?.strategy_id || !body?.signal) {
      reply.code(400);
      return { ok: false, error: "invalid TradingView payload" };
    }

    return service.handleSignal(body);
  });
}
