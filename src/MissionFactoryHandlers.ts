import { MissionFactory } from "generated";
import { createPublicClient, http, getContract } from "viem";
import { anvil } from "viem/chains";

import { DistributionStrategy } from "./ethos-enums";
import { missionAbi } from "./types/contracts";

MissionFactory.MissionCreated.handler(async ({ event, context }) => {
  const missionAddress = event.params.missionAddress;

  if (!missionAddress) {
    return;
  }

  const client = createPublicClient({
    chain: anvil,
    transport: http(),
  });

  const missionContract = getContract({
    address: missionAddress as `0x${string}`,
    abi: missionAbi,
    client,
  });

  const [config, contributorEligibility, verifierEligibility, token] =
    await Promise.all([
      missionContract.read.config(),
      missionContract.read.contributorEligibility(),
      missionContract.read.verifierEligibility(),
      missionContract.read.token(),
    ]);

  const mission = {
    id: missionAddress,
    address: missionAddress,
    sponsor: config[0],
    startDate: config[1],
    endDate: config[2],
    distributionStrategy: DistributionStrategy[config[3]],
    addtlDataCid: config[4],
    contributorEligibility,
    verifierEligibility,
    allowedToken: token,
  };

  context.Mission.set(mission);
});
