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

export class AngelOneAdapter implements BrokerAdapter {
  getBrokerCode() { return "angelone" as const; }
  async register(input: RegisterBrokerInput): Promise<BrokerAccount> {
    return { id: input.accountId || "", brokerCode: "angelone", accountLabel: input.accountLabel, userId: input.userId, accountId: input.accountId, apiKeyMasked: input.apiKey ? `${input.apiKey.slice(0, 4)}...` : "", apiSecretSet: Boolean(input.apiSecret), tokenStatus: "REQUIRED", isConnected: false };
  }
  async login(input: DailyLoginInput): Promise<LoginResult> {
    return { accountId: input.accountId, brokerCode: "angelone", tokenStatus: "READY", accessTokenMasked: "jwt-****", message: "angel login complete" };
  }
  async autoLogin(accountId: string): Promise<LoginResult> {
    return { accountId, brokerCode: "angelone", tokenStatus: "READY", accessTokenMasked: "jwt-****", message: "angel auto-login attempted" };
  }
  async fetchInstruments(_query: InstrumentQuery): Promise<Instrument[]> { return []; }
  async fetchFunds(accountId: string): Promise<FundsSnapshot> { return { brokerCode: "angelone", accountId, currency: "INR", available: 0, utilized: 0 }; }
  async buildStrategyDraft(input: StrategyDraftInput): Promise<CompiledStrategyDraft> { return { strategyId: `${input.name}-${Date.now()}`, brokerCode: "angelone", name: input.name, signalMap: {}, executablePlan: [] }; }
  async executeOrderPlan(input: ExecuteOrderPlanInput): Promise<ExecutionResult> { return { brokerCode: "angelone", strategyId: input.strategyId, signalType: input.signalType, success: true, brokerOrderIds: [], raw: [] }; }
}
