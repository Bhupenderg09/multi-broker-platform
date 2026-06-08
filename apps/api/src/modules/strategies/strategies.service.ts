import type { StrategyDraftInput, StrategyRecord } from "@shared/core";
import { BrokerFactory } from "../brokers/broker.factory";
import { StrategiesRepo } from "./strategies.repo";

export class StrategiesService {
  constructor(private readonly repo = new StrategiesRepo()) {}

  async create(input: StrategyDraftInput): Promise<StrategyRecord> {
    const adapter = BrokerFactory.getAdapter(input.brokerCode);
    const compiled = await adapter.buildStrategyDraft(input);

    return this.repo.create({
      brokerCode: input.brokerCode,
      brokerAccountId: input.brokerAccountId,
      name: input.name,
      status: "active",
      signalArchitecture: input.signalArchitecture,
      signalMap: compiled.signalMap,
      legs: input.legs,
      compiled: compiled as unknown as Record<string, unknown>
    });
  }

  async list(): Promise<StrategyRecord[]> {
    return this.repo.list();
  }

  async findBySignalStrategyId(signalStrategyId: string): Promise<StrategyRecord | null> {
    return this.repo.findBySignalStrategyId(signalStrategyId);
  }
}
