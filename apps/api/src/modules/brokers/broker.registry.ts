import type { BrokerDefinition } from "@shared/core";

export const BROKER_REGISTRY: BrokerDefinition[] = [
  {
    code: "deltaexchange",
    label: "Delta Exchange",
    requiresDailyLogin: false,
    supportsAutoLogin: true,
    setupFields: ["accountLabel", "userId", "apiKey", "apiSecret", "apiBaseUrl"],
    dailyLoginFields: []
  },
  {
    code: "angelone",
    label: "Angel One",
    requiresDailyLogin: true,
    supportsAutoLogin: true,
    setupFields: ["accountLabel", "userId", "apiKey", "apiSecret", "password", "totpSeed"],
    dailyLoginFields: ["totp"]
  },
  {
    code: "shoonya",
    label: "Shoonya",
    requiresDailyLogin: true,
    supportsAutoLogin: true,
    setupFields: ["accountLabel", "userId", "apiKey", "apiSecret", "password", "vendorCode", "imei", "totpSeed"],
    dailyLoginFields: ["totp"]
  },
  {
    code: "flattrade",
    label: "Flattrade",
    requiresDailyLogin: true,
    supportsAutoLogin: false,
    setupFields: ["accountLabel", "userId", "apiKey", "apiSecret"],
    dailyLoginFields: ["requestCode"]
  }
];
