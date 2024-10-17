import { AccountBridge } from "@ledgerhq/types-live";
import { Transaction } from "../types";
import { estimateFees } from "../common-logic/transaction/estimateFees";
import { craftTransaction } from "../common-logic";
import { getNextSequence } from "../network/node";

export const prepareTransaction: AccountBridge<Transaction>["prepareTransaction"] = async (
  account,
  transaction,
) => {
  const seq = await getNextSequence(account.freshAddress);

  const { serializedTransaction } = await craftTransaction(
    { address: account.freshAddress, nextSequenceNumber: seq },
    { amount: transaction.amount, recipient: transaction.recipient },
  );

  const fee = await estimateFees(serializedTransaction);

  if (transaction.fee !== fee) {
    return { ...transaction, fee };
  }

  return transaction;
};
