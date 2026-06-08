export interface TradingViewSignalPayload {
  secret: string;
  strategy_id: string;
  signal: "BUY" | "SELL" | "EXIT_LONG" | "EXIT_SHORT";
  ticker?: string;
  price?: string;
  source?: string;
}
