import repairFirmwareUpdate from "@ledgerhq/live-common/hw/firmwareUpdate-repair";
import { DeviceCommonOpts, deviceOpt } from "../../scan";

export type FirmwareRepairJobOpts = DeviceCommonOpts & { forceMCU: string };

export default {
  description: "Repair a firmware update",
  args: [
    deviceOpt,
    {
      name: "forceMCU",
      type: String,
      desc: "force a mcu version to install",
    },
  ],
  job: ({ device, forceMCU }: Partial<FirmwareRepairJobOpts>) =>
    repairFirmwareUpdate(device || "", forceMCU),
};
