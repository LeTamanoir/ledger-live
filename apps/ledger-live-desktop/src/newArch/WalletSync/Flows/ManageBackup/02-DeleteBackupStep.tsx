import React from "react";
import { useTranslation } from "react-i18next";
import { DeleteBackupStepProps } from "./types";
import { Flex, Text } from "@ledgerhq/react-ui";
import ButtonV3 from "~/renderer/components/ButtonV3";
import { useWalletSyncAnalytics, AnalyticsPage } from "../../hooks/useWalletSyncAnalytics";
import TrackPage from "~/renderer/analytics/TrackPage";
import { useDestroyTrustchain } from "../../hooks/useDestroyTrustchain";

export default function DeleteBackupStep({ cancel }: DeleteBackupStepProps) {
  const { t } = useTranslation();

  const { deleteMutation } = useDestroyTrustchain();

  const { onClickTrack } = useWalletSyncAnalytics();

  const handleDeleteBackup = async () => {
    onClickTrack({ button: "delete", page: AnalyticsPage.ConfirmDeleteBackup });
    await deleteMutation.mutateAsync();
  };

  const handleCancel = () => {
    onClickTrack({ button: "cancel", page: AnalyticsPage.ConfirmDeleteBackup });
    cancel();
  };

  return (
    <Flex flexDirection="column" rowGap="24px">
      <TrackPage category={AnalyticsPage.ConfirmDeleteBackup} />
      <Text fontSize={23} variant="large" color="neutral.c100">
        {t("walletSync.manageBackup.deleteBackup.title")}
      </Text>

      <Text fontSize={14} variant="body" color="neutral.c70">
        {t("walletSync.manageBackup.deleteBackup.description")}
      </Text>

      <Flex flexDirection="row" alignItems="flex-start">
        <ButtonV3 onClick={handleCancel} variant="shade">
          {t("walletSync.manageBackup.deleteBackup.cancel")}
        </ButtonV3>
        <ButtonV3 onClick={handleDeleteBackup} variant="main" ml={4}>
          {t("walletSync.manageBackup.deleteBackup.delete")}
        </ButtonV3>
      </Flex>
    </Flex>
  );
}
