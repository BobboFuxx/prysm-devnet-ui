import { SigningStargateClient } from "@cosmjs/stargate";
import { fetchChainDetails } from "./chainRegistry";

export const performIbcTransfer = async (
  senderAddress,
  recipientAddress,
  amount,
  destinationChain,
  signer
) => {
  try {
    const chains = await fetchChainDetails();
    const chainInfo = chains.find(
      (chain) => chain.chain_name === destinationChain
    );

    if (!chainInfo) {
      throw new Error("Destination chain not found.");
    }

    const client = await SigningStargateClient.connectWithSigner(
      chainInfo.apis.rpc[0].address, // Use the first RPC endpoint
      signer
    );

    const msg = {
      typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
      value: {
        sourcePort: "transfer",
        sourceChannel: "channel-0", // Replace with dynamic channel info
        token: { denom: "uprysm", amount: String(amount) },
        sender: senderAddress,
        receiver: recipientAddress,
        timeoutTimestamp: (Date.now() + 60000) * 1e6, // 1-minute timeout
      },
    };

    const fee = {
      amount: [{ denom: "uprysm", amount: "500" }],
      gas: "200000",
    };

    const result = await client.signAndBroadcast(senderAddress, [msg], fee);
    if (result.code !== 0) {
      throw new Error(`IBC Transfer failed: ${result.rawLog}`);
    }
    return result.transactionHash;
  } catch (err) {
    throw new Error(`IBC Transfer Error: ${err.message}`);
  }
};
