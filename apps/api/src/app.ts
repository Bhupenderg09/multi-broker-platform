import Fastify from "fastify";
import { registerHealthRoutes } from "./modules/health/health.controller";
import { registerBrokerSelectionRoutes } from "./modules/broker-selection/broker-selection.controller";
import { registerBrokerAccountRoutes } from "./modules/broker-accounts/broker-accounts.controller";
import { registerInstrumentRoutes } from "./modules/instruments/instruments.controller";
import { registerStrategyRoutes } from "./modules/strategies/strategies.controller";
import { registerTradingViewRoutes } from "./modules/tradingview/tradingview.controller";

export function buildApp() {
  const app = Fastify({ logger: true });
  registerHealthRoutes(app);
  registerBrokerSelectionRoutes(app);
  registerBrokerAccountRoutes(app);
  registerInstrumentRoutes(app);
  registerStrategyRoutes(app);
  registerTradingViewRoutes(app);
  return app;
}
