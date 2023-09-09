import type { Metadata } from "next";
import { NETWORK_NAME } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
import { getRealms } from "@/lib/subgraph/getRealms";
import { getWalletRealmsHeld } from "@/lib/subgraph/getWalletRealmsHeld";

import { StakingContainer } from "./StakingContainer";

export const metadata: Metadata = {
  title: "Realm Staking",
};
const galleonAddress = stakingAddresses[NETWORK_NAME].v1Galleon;
const carrackAddress = stakingAddresses[NETWORK_NAME].v2Carrack;

export default async function Page() {
  const totalStakedRealmsData = await getWalletRealmsHeld({
    addresses: [galleonAddress, carrackAddress],
  });
  const totalStakedRealms = totalStakedRealmsData?.wallets.reduce(
    (total, wallet) => {
      return total + parseInt(wallet.realmsHeld, 10);
    },
    0,
  );
  return (
    <div className="mx-auto mt-24 sm:max-w-3xl">
      <div className="grid grid-cols-2 gap-6 text-center">
        <StakingContainer />
        <div className="flex flex-col">
          <h3>Data</h3>
          <div className="rounded border pb-8 pt-6">
            {/*<p>Current Epoch:</p>*/}
            <p>Total Realms Staked: {totalStakedRealms}</p>
          </div>
        </div>
      </div>
      {/*<p>Lords to be claimed on Starknet:</p>*/}
    </div>
  );
}
