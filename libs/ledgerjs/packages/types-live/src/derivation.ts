/**
 * DerivationMode is a string identifier of a specific derivation scheme in a list defined in live-common derivation.ts
 */
export type DerivationMode =
  | ""
  | "ethM"
  | "ethMM"
  | "bch_on_bitcoin_segwit"
  | "legacy_on_bch"
  | "etcM"
  | "aeternity"
  | "tezbox"
  | "tezosbip44h"
  | "galleonL"
  | "tezboxL"
  | "taproot"
  | "native_segwit"
  | "segwit"
  | "segwit_on_legacy"
  | "legacy_on_segwit"
  | "legacy_on_native_segwit"
  | "segwit_unsplit"
  | "sep5"
  | "unsplit"
  | "polkadotbip44"
  | "glifLegacy"
  | "glif"
  | "filecoinBIP44"
  | "casper_wallet"
  | "solanaMain"
  | "solanaSub"
  | "hederaBip44"
  | "cardano"
  | "nearbip44h"
  | "vechain"
  | "internet_computer"
  | "stacks_wallet"
  | "icon";
