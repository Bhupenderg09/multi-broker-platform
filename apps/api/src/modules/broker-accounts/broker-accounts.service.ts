import type { BrokerAccount, DailyLoginInput, LoginResult, RegisterBrokerInput } from "@shared/core";
import { BrokerFactory } from "../brokers/broker.factory";
import { BrokerAccountsRepo } from "./broker-accounts.repo";

export class BrokerAccountsService {
  constructor(private readonly repo = new BrokerAccountsRepo()) {}

  async register(input: RegisterBrokerInput): Promise<BrokerAccount> {
    const created = await this.repo.create(input);
    const adapter = BrokerFactory.getAdapter(input.brokerCode);
    const account = await adapter.register({ ...input, accountId: created.id });
    await this.repo.update(created.id, {
      tokenStatus: account.tokenStatus,
      isConnected: account.isConnected
    });
    return { ...account, id: created.id };
  }

  async login(input: DailyLoginInput): Promise<LoginResult> {
    const adapter = BrokerFactory.getAdapter(input.brokerCode);
    return adapter.login(input);
  }

  async list(): Promise<BrokerAccount[]> {
    const rows = await this.repo.list();
    return rows.map((row) => ({
      id: row.id,
      brokerCode: row.brokerCode,
      accountLabel: row.accountLabel,
      userId: row.userId,
      accountId: row.accountId,
      apiKeyMasked: row.apiKey ? `${row.apiKey.slice(0, 4)}...` : "",
      apiSecretSet: Boolean(row.apiSecret),
      tokenStatus: row.tokenStatus,
      isConnected: row.isConnected
    }));
  }
}
