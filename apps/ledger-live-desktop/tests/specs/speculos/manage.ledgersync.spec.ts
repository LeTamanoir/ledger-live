import { test } from "../../fixtures/common";
import { AppInfos } from "tests/enum/AppInfos";

const app: AppInfos = AppInfos.LS;

test.describe(`[${app.name}] Sync Accounts`, () => {
  test.use({
    userdata: "ledgerSync",
    speculosApp: app,
  });

  test(
    "Synchronize one instance then delete the backup",
    {
      annotation: {
        type: "TMS",
        description: "B2CQA-2292, B2CQA-2293, B2CQA-2296",
      },
    },
    async ({ app }) => {
      await app.layout.goToSettings();
      await app.settings.openManageLedgerSync();
      await app.ledgerSync.expectSyncAccountsButtonExist();

      await app.ledgerSync.syncAccounts();
      await app.speculos.confirmOperationOnDevice("Log in to");
      await app.speculos.confirmOperationOnDevice("Enable");
      await app.ledgerSync.expectSynchronizationSuccess();
      await app.ledgerSync.closeLedgerSync();

      await app.settings.openManageLedgerSync();
      await app.ledgerSync.expectNbSyncedInstances(1);
      await app.ledgerSync.destroyTrustchain();
      await app.ledgerSync.expectBackupDeletion();
      await app.drawer.close();
    },
  );
});
