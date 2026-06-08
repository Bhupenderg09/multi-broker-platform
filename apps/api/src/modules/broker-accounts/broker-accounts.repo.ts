import { randomUUID } from "node:crypto";
import type { RegisterBrokerInput } from "@shared/core";

type StoredBrokerAccount = RegisterBrokerInput & {
  id: string;
  tokenStatus: "NOT_REQUIRED" | "REQUIRED" | "READY" | "FAILED";
  isConnected: boolean;
};

export class BrokerAccountsRepo {
  private static readonly store = new Map<string, StoredBrokerAccount>();

  async create(input: RegisterBrokerInput): Promise<StoredBrokerAccount> {
    const id = randomUUID();
    const row: StoredBrokerAccount = {
      ...input,
      id,
      tokenStatus: input.brokerCode === "deltaexchange" ? "NOT_REQUIRED" : "REQUIRED",
      isConnected: input.brokerCode === "deltaexchange"
    };
    BrokerAccountsRepo.store.set(id, row);
    return row;
  }

  async update(id: string, patch: Partial<StoredBrokerAccount>): Promise<StoredBrokerAccount> {
    const current = BrokerAccountsRepo.store.get(id);
    if (!current) throw new Error("broker account not found");
    const next = { ...current, ...patch };
    BrokerAccountsRepo.store.set(id, next);
    return next;
  }

  async list(): Promise<StoredBrokerAccount[]> {
    return Array.from(BrokerAccountsRepo.store.values());
  }
}
