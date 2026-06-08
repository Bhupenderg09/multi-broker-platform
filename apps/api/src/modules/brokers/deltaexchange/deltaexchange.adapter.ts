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

export class DeltaExchangeAdapter implements BrokerAdapter {
  getBrokerCode() {
    return "deltaexchange" as const;
  }

  async register(input: RegisterBrokerInput): Promise<BrokerAccount> {
    return {
      id: input.accountId || "",
      brokerCode: "deltaexchange",
      accountLabel: input.accountLabel,
      userId: input.userId,
      accountId: input.accountId,
      apiKeyMasked: input.apiKey ? `${input.apiKey.slice(0, 4)}...` : "",
      apiSecretSet: Boolean(input.apiSecret),
      tokenStatus: "NOT_REQUIRED",
      isConnected: Boolean(input.apiKey && input.apiSecret)
    };
  }

  async login(input: DailyLoginInput): Promise<LoginResult> {
    return {
      accountId: input.accountId,
      brokerCode: "deltaexchange",
      tokenStatus: "NOT_REQUIRED",
      message: "Delta uses saved API credentials"
    };
  }

  async autoLogin(accountId: string): Promise<LoginResult> {
    return {
      accountId,
      brokerCode: "deltaexchange",
      tokenStatus: "NOT_REQUIRED",
      message: "Delta auto-login not required"
    };
  }

  async fetchInstruments(query: InstrumentQuery): Promise<Instrument[]> {
    const seed: Instrument[] = [
      { brokerCode: "deltaexchange", instrumentId: "27", symbol: "BTCUSD", underlying: "BTCUSD", segment: "FUTURE", expiry: "PERPETUAL" },
      { brokerCode: "deltaexchange", instrumentId: "28", symbol: "ETHUSD", underlying: "ETHUSD", segment: "FUTURE", expiry: "PERPETUAL" },
      { brokerCode: "deltaexchange", instrumentId: "29", symbol: "SOLUSD", underlying: "SOLUSD", segment: "FUTURE", expiry: "PERPETUAL" },
      { brokerCode: "deltaexchange", instrumentId: "30", symbol: "XRPUSD", underlying: "XRPUSD", segment: "FUTURE", expiry: "PERPETUAL" }
    ];

    return seed.filter((row) => {
      const textOk = !query.searchText || row.symbol.includes(query.searchText.toUpperCase());
      const segmentOk = !query.segment || row.segment === query.segment;
      return textOk && segmentOk;
    });
  }

  async fetchFunds(accountId: string): Promise<FundsSnapshot> {
    return {
      brokerCode: "deltaexchange",
      accountId,
      currency: "USD",
      available: 0,
      utilized: 0
    };
  }

  async buildStrategyDraft(input: StrategyDraftInput): Promise<CompiledStrategyDraft> {
    const base = input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const executablePlan = input.legs.map((leg) => ({
      action: leg.reduceOnly ? "exit" : "entry",
      symbol: leg.symbol || leg.underlying,
      instrumentId: leg.instrumentId,
      side: leg.side === "BUY" ? "buy" : "sell",
      quantity: leg.quantity,
      orderType: leg.orderType,
      reduceOnly: Boolean(leg.reduceOnly),
      leverage: leg.leverage ?? null,
      brokerPayload: {
        product_id: leg.instrumentId,
        product_symbol: leg.symbol || leg.underlying,
        side: leg.side === "BUY" ? "buy" : "sell",
        size: leg.quantity,
        order_type: leg.orderType === "market" ? "market_order" : "limit_order",
        reduce_only: Boolean(leg.reduceOnly),
        leverage: leg.leverage ?? undefined
      }
    }));

    return {
      strategyId: `${base}-${Date.now()}`,
      brokerCode: "deltaexchange",
      name: input.name,
      signalMap: {
        BUY: `${base}-buy`,
        SELL: `${base}-sell`,
        EXIT_LONG: `${base}-exit-long`,
        EXIT_SHORT: `${base}-exit-short`
      },
      executablePlan
    };
  }

  async executeOrderPlan(input: ExecuteOrderPlanInput): Promise<ExecutionResult> {
    return {
      brokerCode: "deltaexchange",
      strategyId: input.strategyId,
      signalType: input.signalType,
      success: true,
      brokerOrderIds: input.steps.map((_, i) => `delta-${Date.now()}-${i}`),
      raw: input.steps.map((step) => step.brokerPayload)
    };
  }
}
