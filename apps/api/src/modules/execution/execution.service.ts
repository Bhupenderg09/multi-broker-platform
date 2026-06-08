import type { ExecuteOrderPlanInput } from "@shared/core";
import { BrokerFactory } from "../brokers/broker.factory";

export class ExecutionService {
  async execute(input: ExecuteOrderPlanInput) {
    const adapter = BrokerFactory.getAdapter(input.brokerCode);
    return adapter.executeOrderPlan(input);
  }
}
