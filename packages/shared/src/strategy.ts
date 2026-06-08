import type { BrokerCode, StrategyLegInput } from "./broker";

export interface StrategyRecord {
  id: string;
  brokerCode: BrokerCode;
  brokerAccountId: string;
  name: string;
  status: "draft" | "active" | "paused";
  signalArchitecture: "reversal_only" | "explicit_exit";
  signalMap: Partial<Record<"BUY" | "SELL" | "EXIT_LONG" | "EXIT_SHORT", string>>;
  legs: StrategyLegInput[];
  compiled: Record<string, unknown>;
}
