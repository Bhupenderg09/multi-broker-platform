import type {
  BrokerAccount,
  BrokerAdapter,
  CompiledStrategyDraft,
  DailyLoginInput,
  ExecuteOrderPlanInput,
  ExecutionResult,
  FundsSnapshot,
  Instrument,
  InstrumentQuery,
  LoginResult,
  RegisterBrokerInput,
  StrategyDraftInput
} from "@shared/core";

export class ShoonyaAdapter implements BrokerAdapter {
  getBrokerCode() { return "shoonya" as const; }
  async register(input: RegisterBrokerInput): Promise<BrokerAccount> {
    return { id: input.accountId || "", brokerCode: "shoonya", accountLabel: input.accountLabel, userId: input.userId, accountId: input.accountId, apiKeyMasked: input.apiKey ? `${input.apiKey.slice(0, 4)}...` : "", apiSecretSet: Boolean(input.apiSecret), tokenStatus: "REQUIRED", isConnected: false };
  }
  async login(input: DailyLoginInput): Promise<LoginResult> {
    return { accountId: input.accountId, brokerCode: "shoonya", tokenStatus: "READY", accessTokenMasked: "sho-****", message: "shoonya login complete" };
  }
  async autoLogin(accountId: string): Promise<LoginResult> {
    return { accountId, brokerCode: "shoonya", tokenStatus: "READY", accessTokenMasked: "sho-****", message: "shoonya auto-login attempted" };
  }
  async fetchInstruments(_query: InstrumentQuery): Promise<Instrument[]> { return []; }
  async fetchFunds(accountId: string): Promise<FundsSnapshot> { return { brokerCode: "shoonya", accountId, currency: "INR", available: 0, utilized: 0 }; }
  async buildStrategyDraft(input: StrategyDraftInput): Promise<CompiledStrategyDraft> { return { strategyId: `${input.name}-${Date.now()}`, brokerCode: "shoonya", name: input.name, signalMap: {}, executablePlan: [] }; }
  async executeOrderPlan(input: ExecuteOrderPlanInput): Promise<ExecutionResult> { return { brokerCode: "shoonya", strategyId: input.strategyId, signalType: input.signalType, success: true, brokerOrderIds: [], raw: [] }; }
}
