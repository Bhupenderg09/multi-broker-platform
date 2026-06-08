export type BrokerCode = "deltaexchange" | "angelone" | "shoonya" | "flattrade";

export interface BrokerDefinition {
  code: BrokerCode;
  label: string;
  requiresDailyLogin: boolean;
  supportsAutoLogin: boolean;
  setupFields: string[];
  dailyLoginFields: string[];
}

export interface BrokerAccount {
  id: string;
  brokerCode: BrokerCode;
  accountLabel: string;
  userId?: string;
  accountId?: string;
  apiKeyMasked?: string;
  apiSecretSet: boolean;
  tokenStatus: "NOT_REQUIRED" | "REQUIRED" | "READY" | "FAILED";
  isConnected: boolean;
}

export interface RegisterBrokerInput {
  brokerCode: BrokerCode;
  accountLabel: string;
  userId?: string;
  accountId?: string;
  apiKey?: string;
  apiSecret?: string;
  password?: string;
  totpSeed?: string;
  vendorCode?: string;
  imei?: string;
  apiBaseUrl?: string;
}

export interface DailyLoginInput {
  brokerCode: BrokerCode;
  accountId: string;
  password?: string;
  totp?: string;
  requestCode?: string;
}

export interface LoginResult {
  accountId: string;
  brokerCode: BrokerCode;
  tokenStatus: "NOT_REQUIRED" | "READY" | "FAILED";
  accessTokenMasked?: string;
  message: string;
}

export interface InstrumentQuery {
  brokerCode: BrokerCode;
  accountId: string;
  searchText?: string;
  underlying?: string;
  segment?: "FUTURE" | "OPTION";
  expiry?: string;
  optionType?: "CE" | "PE";
  strike?: number;
}

export interface Instrument {
  brokerCode: BrokerCode;
  instrumentId: string;
  symbol: string;
  underlying: string;
  segment: "FUTURE" | "OPTION";
  optionType?: "CE" | "PE";
  strike?: number;
  expiry?: string;
  lotSize?: number;
  raw?: Record<string, unknown>;
}

export interface FundsSnapshot {
  brokerCode: BrokerCode;
  accountId: string;
  currency: string;
  available: number;
  utilized: number;
}

export interface StrategyLegInput {
  segment: "FUTURE" | "OPTION";
  underlying: string;
  side: "BUY" | "SELL";
  quantity: number;
  expiry?: string;
  optionType?: "CE" | "PE";
  strike?: number;
  leverage?: number | null;
  orderType: "market" | "limit";
  reduceOnly?: boolean;
  instrumentId?: string;
  symbol?: string;
}

export interface BrokerExecutableStep {
  action: "entry" | "exit";
  symbol: string;
  instrumentId?: string;
  side: "buy" | "sell";
  quantity: number;
  orderType: "market" | "limit";
  reduceOnly?: boolean;
  leverage?: number | null;
  brokerPayload: Record<string, unknown>;
}

export interface CompiledStrategyDraft {
  strategyId: string;
  brokerCode: BrokerCode;
  name: string;
  signalMap: Partial<Record<"BUY" | "SELL" | "EXIT_LONG" | "EXIT_SHORT", string>>;
  executablePlan: BrokerExecutableStep[];
}

export interface StrategyDraftInput {
  brokerCode: BrokerCode;
  brokerAccountId: string;
  name: string;
  signalArchitecture: "reversal_only" | "explicit_exit";
  legs: StrategyLegInput[];
}

export interface ExecuteOrderPlanInput {
  brokerCode: BrokerCode;
  brokerAccountId: string;
  strategyId: string;
  signalType: "BUY" | "SELL" | "EXIT_LONG" | "EXIT_SHORT";
  steps: BrokerExecutableStep[];
}

export interface ExecutionResult {
  brokerCode: BrokerCode;
  strategyId: string;
  signalType: "BUY" | "SELL" | "EXIT_LONG" | "EXIT_SHORT";
  success: boolean;
  brokerOrderIds: string[];
  raw: Record<string, unknown>[];
}

export interface BrokerAdapter {
  getBrokerCode(): BrokerCode;
  register(input: RegisterBrokerInput): Promise<BrokerAccount>;
  login(input: DailyLoginInput): Promise<LoginResult>;
  autoLogin(accountId: string): Promise<LoginResult>;
  fetchInstruments(query: InstrumentQuery): Promise<Instrument[]>;
  fetchFunds(accountId: string): Promise<FundsSnapshot>;
  buildStrategyDraft(input: StrategyDraftInput): Promise<CompiledStrategyDraft>;
  executeOrderPlan(input: ExecuteOrderPlanInput): Promise<ExecutionResult>;
}
