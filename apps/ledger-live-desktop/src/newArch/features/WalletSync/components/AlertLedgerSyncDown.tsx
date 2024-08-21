import React from "react";
import { Trans } from "react-i18next";
import { Text, Alert } from "@ledgerhq/react-ui";

export function AlertLedgerSyncDown() {
  return (
    <Alert
      type={"warning"}
      containerProps={{ p: 12, borderRadius: 8 }}
      renderContent={() => (
        <Text
          variant="paragraphLineHeight"
          fontWeight="semiBold"
          color="neutral.c100"
          fontSize={13}
        >
          <Trans i18nKey="walletSync.error.ledgerSyncDown" />
        </Text>
      )}
    />
  );
}
