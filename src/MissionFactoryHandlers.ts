import { MissionFactory } from "generated";
import { createPublicClient, http, getContract, PublicClient } from "viem";
import { anvil } from "viem/chains";

import { DistributionStrategy } from "./ethos-enums";
import { missionAbi } from "./types/contracts";
import { fetchAdditionalData } from "./ipfs";

type Address = `0x${string}`;

const client = createPublicClient({
  chain: anvil,
  transport: http(),
});

MissionFactory.MissionCreated.handler(async ({ event, context }) => {
  if (!event.params.missionAddress) {
    console.log('No mission address provided. Aborting.');
    return;
  }

  const missionAddress = event.params.missionAddress as Address;
  const { config, contributorEligibility, verifierEligibility, token, additionalData } = 
    await getMissionData(missionAddress, client);

  const mission = {
    id: missionAddress,
    address: missionAddress,
    title: additionalData.title,
    description: additionalData.description,
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

async function getMissionData(missionAddress: Address, client: PublicClient) {
  const missionContract = getContract({
    address: missionAddress,
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

  const additionalData = await fetchAdditionalData(config[4]);

  return {
    config,
    contributorEligibility,
    verifierEligibility,
    token,
    additionalData,
  };
}