import type { BrokerAdapter, BrokerCode } from "@shared/core";
import { DeltaExchangeAdapter } from "./deltaexchange/deltaexchange.adapter";
import { AngelOneAdapter } from "./angelone/angelone.adapter";
import { ShoonyaAdapter } from "./shoonya/shoonya.adapter";
import { FlattradeAdapter } from "./flattrade/flattrade.adapter";

export class BrokerFactory {
  private static readonly adapters: Record<BrokerCode, BrokerAdapter> = {
    deltaexchange: new DeltaExchangeAdapter(),
    angelone: new AngelOneAdapter(),
    shoonya: new ShoonyaAdapter(),
    flattrade: new FlattradeAdapter()
  };

  static getAdapter(code: BrokerCode): BrokerAdapter {
    return this.adapters[code];
  }
}
