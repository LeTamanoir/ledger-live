import { test } from "../../fixtures/common";
import { AppInfos } from "tests/enum/AppInfos";
import { addTmsLink } from "tests/utils/allureUtils";
import { getDescription } from "../../utils/customJsonReporter";
import { expect } from "@playwright/test";
import { waitForTimeOut } from "tests/utils/waitFor";

const app: AppInfos = AppInfos.LS;

// First test block
test.describe.serial(`[${app.name}] Sync 1st Instance`, () => {
  test.use({
    userdata: "ledgerSync", // First json
    speculosApp: app,
  });

  test(
    "Synchronize 1st instance using app.json with accounts",
    {
      annotation: {
        type: "TMS",
        description: "B2CQA-2292, B2CQA-2293, B2CQA-2296",
      },
    },
    async ({ app,page }) => {
      await addTmsLink(getDescription(test.info().annotations).split(", "));

      await app.layout.goToSettings();
      await app.settings.openManageLedgerSync();
      await app.ledgerSync.expectSyncAccountsButtonExist();
      await app.ledgerSync.syncAccounts();
      await app.speculos.clickNextUntilText("Make sure");
      await app.speculos.clickNextUntilText("Connect with");
      await app.speculos.pressBothButtonsOnDevice();
      await app.speculos.clickNextUntilText("Your crypto accounts");
      await app.speculos.clickNextUntilText("Turn on sync?");
      await app.speculos.pressBothButtonsOnDevice();
      await app.ledgerSync.expectSynchronizationSuccess();
      await app.ledgerSync.closeLedgerSync();
      await app.ledgerSync.syncData();
    },
  );
});

test.describe.serial(`[${app.name}] Sync 2nd Instance`, () => {
  test.use({
    userdata: "2instances_app", // Second json
    speculosApp: app,
  });

  test(
    "Synchronize 2nd instance using app.json with no accounts then ensure that the accounts are synced",
    {
      annotation: {
        type: "TMS",
        description: "B2CQA-2292, B2CQA-2293, B2CQA-2296",
      },
    },
    async ({ app,page }) => {
      await addTmsLink(getDescription(test.info().annotations).split(", "));

      await app.layout.goToSettings();
      await app.settings.openManageLedgerSync();
      await app.ledgerSync.expectSyncAccountsButtonExist();

      await app.ledgerSync.syncAccounts();
     // await app.speculos.clickNextUntilText("Make sure");
      await app.speculos.clickNextUntilText("Connect with");
      await app.speculos.clickNextUntilText("Make sure to use");
      await app.speculos.clickNextUntilText("Connect with");
      await app.speculos.pressBothButtonsOnDevice();
      await app.speculos.clickNextUntilText("Turn on sync for this");
      await app.speculos.clickNextUntilText("Your crypto accounts");
      await app.speculos.clickNextUntilText("Turn on sync?");
      await app.speculos.pressBothButtonsOnDevice();
      await app.ledgerSync.expectSynchronizationSuccess();
      await app.ledgerSync.closeLedgerSync();
      await page.waitForTimeout(10000);
      await app.layout.goToAccounts();
      const accountName = await app.accounts.getAccountsName();
      expect(accountName).toContain("Bitcoin 2 (legacy)");
      console.log(accountName);

      await app.settings.openManageLedgerSync();
      await app.ledgerSync.manageBackup();
      await app.ledgerSync.deleteBackup();
      await app.ledgerSync.confirmBackupDeletion();
      await app.ledgerSync.expectBackupDeletion();
      await app.drawer.close();
    },
  );
});

