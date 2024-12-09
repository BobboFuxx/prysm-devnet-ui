import { StargateClient } from "@cosmjs/stargate";

export const fetchBalances = async (rpcUrl, address) => {
  try {
    const client = await StargateClient.connect(rpcUrl);
    const balances = await client.getAllBalances(address);
    return balances;
  } catch (err) {
    throw new Error(`Failed to fetch balances: ${err.message}`);
  }
};
