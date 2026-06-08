import type { TradingViewSignalPayload } from "@shared/core";
import { ExecutionService } from "../execution/execution.service";
import { StrategiesService } from "../strategies/strategies.service";

export class TradingViewService {
  constructor(
    private readonly strategies = new StrategiesService(),
    private readonly execution = new ExecutionService()
  ) {}

  async handleSignal(payload: TradingViewSignalPayload) {
    const strategy = await this.strategies.findBySignalStrategyId(payload.strategy_id);

    if (!strategy) {
      return {
        ok: false,
        status: "strategy_not_found",
        strategyId: payload.strategy_id
      };
    }

    const compiled = strategy.compiled as any;
    const steps = Array.isArray(compiled.executablePlan) ? compiled.executablePlan : [];

    const result = await this.execution.execute({
      brokerCode: strategy.brokerCode,
      brokerAccountId: strategy.brokerAccountId,
      strategyId: strategy.id,
      signalType: payload.signal,
      steps
    });

    return {
      ok: true,
      strategyId: strategy.id,
      brokerCode: strategy.brokerCode,
      execution: result
    };
  }
}
