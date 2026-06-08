import { randomUUID } from "node:crypto";
import type { StrategyRecord } from "@shared/core";

export class StrategiesRepo {
  private static readonly store = new Map<string, StrategyRecord>();

  async create(input: Omit<StrategyRecord, "id">): Promise<StrategyRecord> {
    const row: StrategyRecord = { ...input, id: randomUUID() };
    StrategiesRepo.store.set(row.id, row);
    return row;
  }

  async list(): Promise<StrategyRecord[]> {
    return Array.from(StrategiesRepo.store.values());
  }

  async findBySignalStrategyId(signalStrategyId: string): Promise<StrategyRecord | null> {
    const rows = await this.list();
    return rows.find((row) => Object.values(row.signalMap).includes(signalStrategyId)) || null;
  }
}
